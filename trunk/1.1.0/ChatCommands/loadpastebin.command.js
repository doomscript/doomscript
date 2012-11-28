		
		DC_LoaTS_Helper.bulkRaids = {};
		RaidCommand.create( 
			{
				commandName: "loadpastebin",
				aliases: ["loadpaste", "loadbin", "lpb", "loadraidbin", "lrb"],
				parsingClass: PasteBinLinkParsingFilter,
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					this.commandStartTime = new Date()/1;
						
					ret.success = parser.isValid();
					
					if (ret.success)
					{
						var match = PasteBinLinkParsingFilter.pastebinPattern.exec(parser.pastebinURL);
						DC_LoaTS_Helper.ajax({
							url: PasteBinLinkParsingFilter.rawBase + match[1],
							onload: this.receiveAjax.bind(this),
							});
							
						ret.statusMessage = "Loading data from " + parser.getPasteLink();
					}
						
					return ret;
				},
							
				receiveAjax: function(response)
				{
					DCDebug("Got back pastebin data", response);
					if (response.status === 200)
					{
						var text = response.responseText,
							xx = 100,
						    matchedRaidsList = [],
						    match,
						    regex = new RegExp(RaidLink.linkPattern.source, "gi"),
						    hasRaidFilter = typeof this.parser.raidFilter !== "undefined";
						    
						while ((match = regex.exec(text)) !== null && xx--)
						{
							var raidLink = new RaidLink(match[0]);
							if (raidLink.isValid())
							{
								if (hasRaidFilter)
								{
									var raidData = RaidManager.fetch(raidLink);
									var currentState = RaidManager.fetchState(raidLink);
									var didMatch = false;
									if (typeof raidData !== "undefined")
									{
										didMatch = this.parser.raidFilter.matches(
										{
											age: this.commandStartTime - raidData.firstSeen,
											difficulty: raidLink.difficulty,
											fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: matchedRaidsList.length
										});
									}
									else
									{
										didMatch = this.parser.raidFilter.matches(
										{
											difficulty: raidLink.difficulty,
											fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: matchedRaidsList.length
										});
									}
										
									if (didMatch)
									{
										matchedRaidsList.push(raidLink);
									}
								}
								else 
								{
									matchedRaidsList.push(raidLink);
								}
							}
						}
						
						var str = "Found " + matchedRaidsList.length + " raids in " + this.parser.getPasteLink();
						
						if (hasRaidFilter)
						{
							str += " matching filter " + this.parser.raidFilter.toString();
						}
						var guid = DC_LoaTS_Helper.generateUUID();
						DC_LoaTS_Helper.bulkRaids[guid] = {
														   loadSource: this.parser.getPasteLink(), 
														   raids: matchedRaidsList, 
														   canceled: false
														  };
						
						str += ". " + DC_LoaTS_Helper.getCommandLink("/raidbulkcallback " + guid, "Load these raids")  + ".";
						console.log(str);

						holodeck.processChatCommand("/raidbulkcallback " + guid);
					}
					else if (response.status === 404)
					{
						holodeck.activeDialogue().raidBotMessage("Pastebin could not locate a valid paste at " + this.parser.getPasteLink());
					}
					else if (response.status >= 500 && response.status < 600)
					{
						holodeck.activeDialogue().raidBotMessage("Pastebin is having server trouble trying to load " + this.parser.getPasteLink() 
						+ ".\n" + "Pastebin gave status of <code>" + response.statusText +"(" + response.status + ")</code>.");
					}
					else 
					{
						holodeck.activeDialogue().raidBotMessage("Trouble loading " + this.parser.getPasteLink() 
						+ ".\n" + "Pastebin gave status of <code>" + response.statusText +"(" + response.status + ")</code>.");
					}
				},			

				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load bin raids from: " + this.parser.getPastebinURL()
						},
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadpastebin pastebinURL raidFilter</code>\n";
					helpText += "where <code>pastebinURL</code> is the url of a raid pastebin\n";
					helpText += "where <code>raidFilter</code> (optional) is a seenraids style filter to limit what's loaded from the bin\n";
					helpText += "\n";
					helpText += "Loads all raids from the pastebin, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
