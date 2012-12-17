		
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
					
					var isCancelled = params === "cancel";
					
					// Cancel the previous timer, if there is one
					if (typeof DC_LoaTS_Helper.autoLoader !== "undefined" || isCancelled)
					{
						// Clear out the raidLinks array from the previous one.
						// The timeout will detect that there are suddenly no more links
						// and acknowledge the error state and quit.
						DC_LoaTS_Helper.autoLoader.raidLinks.length = 0;
					}

					this.commandStartTime = new Date()/1;
						
					ret.success = parser.isValid();
					
					if (ret.success)
					{
						var match = PasteBinLinkParsingFilter.pastebinPattern.exec(parser.pastebinURL);
						DC_LoaTS_Helper.ajax({
							url: PasteBinLinkParsingFilter.rawBase + match[1],
							onload: this.receiveAjax.bind(this),
							});
							
						ret.statusMessage = "Downloading data from " + parser.getPasteLink() + ". Please wait...";
					}
						
					return ret;
				},
							
				receiveAjax: function(response)
				{
					DCDebug("Got back pastebin data", response);
					if (response.status === 200) // Must be OK because even other 200 codes won't have our data
					{
						var text = response.responseText,
						    matchedRaidsList = [],
						    notMatchedRaidsList = [],
						    binData = {},
						    match,
						    regex = new RegExp(RaidLink.linkPattern.source, "gi"), // Prevent weird JS regex caching/lastIndex issues
						    hasRaidFilter = typeof this.parser.raidFilter !== "undefined";
						    
						while ((match = regex.exec(text)) !== null)
						{
							var raidLink = new RaidLink(match[0]);
							if (raidLink.isValid())
							{
								var thisBin = binData[raidLink.getRaid().shortName];
								if (!thisBin){
									thisBin = {};
									binData[raidLink.getRaid().shortName] = thisBin;
								}
								var thisBinRaids = thisBin[raidLink.difficulty];
								if (!thisBinRaids){
									thisBinRaids = [];
									thisBin[raidLink.difficulty] = thisBinRaids;
								}
								thisBinRaids.push(raidLink);

								
								if (hasRaidFilter)
								{
									var raidData = RaidManager.fetch(raidLink);
									var currentState = raidData ? RaidManager.STATE.valueOf(raidData.stateId) || RaidManager.STATE.UNSEEN;

									
									if (this.parser.raidFilter.matches(
											{
												age: (raidData && raidData.firstSeen)? this.commandStartTime - raidData.firstSeen : 0,
												difficulty: raidLink.difficulty,
												fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
												name: raidLink.getRaid().getSearchableName(),
												state: currentState,
												count: matchedRaidsList.length
											}
									))
									{
										matchedRaidsList.push(raidLink);
									}
									else 
									{
										notMatchedRaidsList.push(raidLink);
									}
								}
								else 
								{
									matchedRaidsList.push(raidLink);
								}
							}
						} // End while(regex)
						
						var str = "Found " + matchedRaidsList.length + " raids in " + this.parser.getPasteLink();
						
						if (hasRaidFilter)
						{
							str += " matching filter " + this.parser.raidFilter.toString();
						}
						
						var binUUID = DC_LoaTS_Helper.generateUUID();
						var binBreakdown = "\n<a href='#' onclick='$(\"" + binUUID + "\").toggleClassName(\"hidden\"); return false;'>Toggle Bin Data</a>";
						binBreakdown += "\n<span id='" + binUUID + "' class='hidden'>";
						binBreakdown += "\nTotal Raids: " + (matchedRaidsList.length + notMatchedRaidsList.length);
						for (var shortName in binData) {
							for (var diff = 1; diff < 5; diff++) {
								var raids = binData[shortName][diff];
								if (raids && raids.length) {
									binBreakdown += "\n" + RaidType.shortDifficulty[diff] + " " + shortName + " - " + raids.length;
								}
							}
						}
						
						binBreakdown += "</span>";
						
						str += binBreakdown;
						
						// Store all the raids we're not going to visit
						for (var i = 0; i < notMatchedRaidsList.length; i++) {
							RaidManager.store(notMatchedRaidsList[i]);
						}
						
						
						str += "\nBin fatched and parsed in " + (new Date()/1 - this.commandStartTime) + " ms.";
						
						if (matchedRaidsList.length) {
							str += "\n\nStarting to load " + matchedRaidsList.length + " raids. " + this.getCommandLink("/loadpastebin cancel", "Cancel?");
							
							DC_LoaTS_Helper.loadAll(matchedRaidsList);
						}
						
						holodeck.activeDialogue().raidBotMessage(str);
						
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
		
