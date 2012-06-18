		/************************************/
		/********** RaidLink Class **********/
		/************************************/
		
		// Represents and parses actual raid link
		// Constructor is either
		// new RaidLink(str)
		//	params:
		//		str - Any string containing a raid link. The rest of the string will be ignored.
		//
		// OR
		//
		// new RaidLink(id, hash, difficulty, raidTypeId)
		//	params:
		//		id - kv_raid_id - the unique id for this raid instance
		//		hash - kv_hash - the string hash for the raid
		//		difficulty - kv_difficulty - a number from 1 to 4 where 1 is normal, 4 is nightmare
		//		raidTypeId - kv_raid_boss - the unique key for the raid type
		window.RaidLink = Class.create({
			initialize: function()
			{
				Timer.start("RaidLink init");
				// Capture variable args
				var args = $A(arguments);
				
				// If there's only one arg, must be link text
				if (args.length == 1)
				{
					// Only 1 arg means that it must be a link URL
					var linkURL = args[0];
					
					if (typeof linkURL != "undefined")
					{
						// Execute our regular expression (defined below) against the message
						// This checks to see if the message contained a LoaTS raid link
						var match = RaidLink.linkPattern.exec(linkURL);
						
						// If there was a raid link
						if (match != null)
						{
							// Get Param String
							var paramString = match[0];
							
							// Remove junk
							paramString = paramString.replace(/amp;/gi, "");
							
							// Separate params 
							var params = paramString.split("\?")[1].split("&");
														
							// Put the params together again into this object
							var paramObj = {kv_raid_id: "", kv_hash: ""};
							
							try 
							{
								for (var i = 0; i < 5; i++)
								{
									// If the param wasn't empty
									if (typeof params[i] == "string" &&  params[i] != "")
									{
										// Find the KV pairs
										var paramKV = params[i].split("=");
										
										// If there was something to split
										if (typeof paramKV[1] == "string")
										{
											// Split off any extra junk
											paramKV[1] = paramKV[1].split(/["'] /)[0].replace(/[^\w]/, "");
											
											// Assign the KV pairs
											paramObj[paramKV[0]] = paramKV[1];
										}
									}
								}
							}
							catch(ex)
							{
								console.warn(ex);
							}
													
							// Extract the difficulty
							this.difficulty = paramObj.kv_difficulty;
							
							// Extract the hash
							this.hash = paramObj.kv_hash;
							
							// Extract the raid boss (RaidType.id)
							this.raidTypeId = paramObj.kv_raid_boss;
							
							// Extract the raid id
							this.id = paramObj.kv_raid_id.replace(/\D/g, "");
						}
					}
					else
					{
						console.warn("Attempted make a raid link from an undefined URL");
					}
				}
				// If we got the 4 separate parts rather than a whole link
				else if (args.length > 1)
				{
					// Extract the raid id
					this.id = args[0];

					// Extract the hash
					this.hash = args[1];
					
					// Extract the difficulty
					this.difficulty = args[2];
					
					// Extract the raid boss (RaidType.id)
					this.raidTypeId = args[3];
				}
				else
				{
					console.error("Invalid parameters trying to create a RaidLink. ");
					console.error(args);
				}
								
				Timer.stop("RaidLink init");
			},
			
			getUniqueKey: function()
			{
				return this.id + "_" + this.hash;
			},
			
			getRaid: function()
			{
				// If this link wasn't fully filled out
				if (typeof this.raidTypeId == "undefined" || typeof this.difficulty == "undefined")
				{
					// Look up the same link in the storage
					var savedLink = RaidManager.fetch(this);
					
					// If there's a previous version of the link
					if (typeof savedLink != "undefined")
					{
						// Capture the save params into this link
						this.raidTypeId = savedLink.raidTypeId;
						this.difficulty = savedLink.difficulty;
					}
				}
				
				// Look up the raid type
				var raid = DC_LoaTS_Helper.raids[this.raidTypeId];
				
				// Return the raid type, or if we found nothing, a new empty raid type
				return (typeof raid != "undefined")?raid:new RaidType(this.raidTypeId);
			},
			
			// Takes in a format returns a formatted text for this link
			getFormattedRaidLinkText: function(messageFormat)
			{
				try
				{
					if (this.isValid())
					{
						// Start with just an empty template
						var newMessage = messageFormat;
						
						// Grab the link state
						var linkState = RaidManager.fetchState(this);
						
						// Grab the raid type
						var raid = this.getRaid();
						
						// Fill in the basic data to the template
						newMessage = newMessage.replace(/{id}/gi, this.id);
						newMessage = newMessage.replace(/{line}/gi, "<br>");
						newMessage = newMessage.replace(/{size}/gi, raid.size);
						newMessage = newMessage.replace(/{stat}/gi, raid.stat);
						newMessage = newMessage.replace(/{health}/gi, raid.getHealthText(this.difficulty));
						newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
						newMessage = newMessage.replace(/{diff}/gi, RaidType.shortDifficulty[this.difficulty]);
						newMessage = newMessage.replace(/{zone}/gi, raid.zone);
						newMessage = newMessage.replace(/{name}/gi, raid.fullName);
						newMessage = newMessage.replace(/{short-name}/gi, raid.shortName);
						newMessage = newMessage.replace(/{shorter-name}/gi, raid.colloqName);
						newMessage = newMessage.replace(/{time}/gi, raid.getTimeText());

						newMessage = newMessage.replace(/{fs}/gi, raid.getFairShareText(this.difficulty));
						newMessage = newMessage.replace(/{target}/gi, raid.getTargetDamageText(this.difficulty));
						newMessage = newMessage.replace(/{optimal}/gi, raid.getTargetDamageText(this.difficulty));
						newMessage = newMessage.replace(/{ofs}/gi, raid.getTargetDamageText(this.difficulty));
						
						newMessage = newMessage.replace(/{cache-state}/gi, linkState.text);
						newMessage = newMessage.replace(/{cache-state-nice}/gi, linkState.niceText);
						newMessage = newMessage.replace(/{cache-state-short}/gi, linkState.shortText);
						newMessage = newMessage.replace(/{visited}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.niceText:"");
						newMessage = newMessage.replace(/{visited-short}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.shortText:"");
						
						if (typeof linkState == "undefined" || linkState.text == "undefined")
						{
							console.warn("Bad Link State");
							console.warn(linkState);
							console.warn(this);
						}
						
						// FS has special properties, so parse it differently
						var fsMatch = /{fs([^}]*)}/.exec(newMessage);
						
						// How many times we matched an FS
						var fsMatchCount = 0;
						
						// If there were any FS calls
						while (fsMatch != null)
						{
							try
							{
								// Don't get in an infite loop
								if (fsMatchCount >= 5)
								{
									console.warn("Can only match 5 {fs} with math")
									holodeck.activeDialogue().raidBotMessage("Can only match 5 {fs} with math while formatting");
									break;
								}
								
								fsMatchCount++;
								
								// Replace FS and do the math
								newMessage = newMessage.replace(/{fs[^}]*}/, 
									DC_LoaTS_Helper.prettyFormatNumber(eval(raid.getFairShare(this.difficulty)+fsMatch[1])));
								
								// Find the next FS
								var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
							}
							catch (ex)
							{
								console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
								console.error(ex);
							}
						}
						
						return newMessage.trim();
					}
					else
					{
						console.warn("Tried to get formatted raid link text from invalid link");
						return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Unknown Raid (id: " + this.raidTypeId + ")"
					}
				}
				catch(ex)
				{
					console.warn("Error encountered in RaidLink.getFormattedRaidLinkText");
					console.warn(ex);
					return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Error Formatting Raid (id: " + this.raidTypeId + ")"
				}
			},
			
			// Gets the simplest text possible based on the storage messagen and link formats
			getSimpleText: function()
			{
				if (this.isValid())
				{
					// Retrieve the message format
					var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
					// Retrieve the anchor tag format
					var linkFormat = DC_LoaTS_Helper.getLinkFormat();
					
					// Start with just an empty template
					var newMessage = messageFormat;
					
					// Grab the link state
					var linkState = RaidManager.fetchState(this);
					
					// Grab the raid type
					var raid = this.getRaid();
					
					// Fill in the basic data to the template
					newMessage = newMessage.replace(/{id}/gi, this.id);
					newMessage = newMessage.replace(/{size}/gi, raid.size);
					newMessage = newMessage.replace(/{stat}/gi, raid.stat);
					newMessage = newMessage.replace(/{health}/gi, raid.getHealthText(this.difficulty));
					newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
					newMessage = newMessage.replace(/{diff}/gi, RaidType.shortDifficulty[this.difficulty]);
					newMessage = newMessage.replace(/{zone}/gi, raid.zone);
					newMessage = newMessage.replace(/{name}/gi, raid.fullName);
					newMessage = newMessage.replace(/{short-name}/gi, raid.shortName);
					newMessage = newMessage.replace(/{shorter-name}/gi, raid.colloqName);
					newMessage = newMessage.replace(/{time}/gi, raid.getTimeText());

					newMessage = newMessage.replace(/{fs}/gi, raid.getFairShareText(this.difficulty));
					newMessage = newMessage.replace(/{target}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{optimal}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{ofs}/gi, raid.getTargetDamageText(this.difficulty));
					
					newMessage = newMessage.replace(/{cache-state}/gi, linkState.text);
					newMessage = newMessage.replace(/{cache-state-nice}/gi, linkState.niceText);
					newMessage = newMessage.replace(/{cache-state-short}/gi, linkState.shortText);
					newMessage = newMessage.replace(/{visited}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.niceText:"");
					newMessage = newMessage.replace(/{visited-short}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.shortText:"");
					
					// Remove fields we don't want
					newMessage = newMessage.replace(/{line}/gi, "");
					newMessage = newMessage.replace(/{image}/gi, "");
					newMessage = newMessage.replace(/<[^>]+>/gi, "");
					
					
					// FS has special properties, so parse it differently
					var fsMatch = /{fs([^}]*)}/.exec(newMessage);
					
					// How many times we matched an FS
					var fsMatchCount = 0;
					
					// If there were any FS calls
					while (fsMatch != null)
					{
						try
						{
							// Don't get in an infite loop
							if (fsMatchCount >= 5)
							{
								console.warn("Can only match 5 {fs} with math")
								holodeck.activeDialogue().raidBotMessage("Can only match 5 {fs} with math while formatting");
								break;
							}
							
							fsMatchCount++;
							
							// Replace FS and do the math
							newMessage = newMessage.replace(/{fs[^}]*}/, 
								DC_LoaTS_Helper.prettyFormatNumber(eval(raid.getFairShare(this.difficulty)+fsMatch[1])));
							
							// Find the next FS
							var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
						}
						catch (ex)
						{
							console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
							console.error(ex);
						}
					}
					
					return newMessage.trim();
				}
				else
				{
					console.warn("Tried to get simple raid link text from invalid link");
					return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Unknown Raid (id: " + this.raidTypeId + ")";
				}
							
			},

			// Takes in a message format and a link format and returns a ready to inject link
			getFormattedRaidLink: function(messageFormat, linkFormat)
			{
				Timer.start("getFormattedRaidLink");
				
				// If there was no message format, look it up
				if (typeof messageFormat == "undefined")
				{
					messageFormat = DC_LoaTS_Helper.getMessageFormat();
				}
				
				// If there was no link format, look it up
				if (typeof linkFormat == "undefined")
				{
					linkFormat = DC_LoaTS_Helper.getLinkFormat();
				}
				
				// Get the basics of the message
				var newMessage = this.getFormattedRaidLinkText(messageFormat).trim();
				
				try 
				{
					// Get the text of the message without the image
					var noImage = newMessage.replace(/{image}/gi, "").replace(/<[^>]+>/gi, "").trim();
					
					// Index of the image tag
					var imageIndex = newMessage.indexOf("{image}");
					
					// If {image} is in the middle, just lump it in with the text
					if (imageIndex == -1 || (imageIndex > 0 && imageIndex < newMessage.length - "{image}".length))
					{
						newMessage = newMessage.replace(/{image}/gi, RaidLink.defaultImage).trim();
						newMessage = linkFormat.replace(/{text}/gi, newMessage);
					}
					// If {image} is at the beginning or end, put it in it's own anchor, for aesthetics
					else
					{
						// At the beginning
						if (newMessage.indexOf("{image}") == 0)
						{
							newMessage = linkFormat.replace(/{text}/gi, RaidLink.defaultImage).replace(/class=\"/, "class=\"game_icon_link ") + " " + linkFormat.replace(/{text}/gi, newMessage);
						}
						// At the end
						else
						{
							newMessage = linkFormat.replace(/{text}/gi, newMessage) + " " + linkFormat.replace(/{text}/gi, RaidLink.defaultImage);
						}
						
						// Remove images from the message
						newMessage = newMessage.replace(/{image}/gi, "");
					}
					
					
					newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
					newMessage = newMessage.replace(/{text-no-image}/gi, noImage);
					newMessage = newMessage.replace(/{url}/gi, this.getURL());
					newMessage = "<span class=\"raidMessage\">" + newMessage + "</span>";
					
					// If this is an unseen link, mark it new
//					var linkState = RaidManager.fetchState(this);
//					
//					if (linkState.text == RaidManager.STATE.UNSEEN.text)
//					{
//						newMessage = "NEW " + newMessage;
//					}
					
				}
				catch(ex)
				{
					console.warn("Error encountered in RaidLink.getFormattedRaidLink");
					console.warn(ex);
				}
				
				Timer.stop("getFormattedRaidLink");
				return newMessage;
			},
			
			// Get the raid name
			getName: function()
			{
				return this.getRaid().fullName;
			},
			
			// Get the difficulty text of the raid
			getDifficultyText: function()
			{
				return RaidType.difficulty[this.difficulty];
			},
			
			// Generate a url for this raid
			getURL: function()
			{
				var raidURL = "http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp";
				
				if (typeof this.raidTypeId != "undefined")
				{
					raidURL += "&kv_raid_boss=" + this.raidTypeId;	
				}
				if (typeof this.difficulty != "undefined")
				{
					raidURL += "&kv_difficulty=" + this.difficulty;
				}
				
				// It's easier to inspect the link if the easier to read bits are first
				raidURL += "&kv_raid_id=" + this.id + "&kv_hash=" + this.hash;
				
				return raidURL;
			},
			
			// Generate a param array for this link
			getParamArray: function()
			{
				return [this.id, this.hash, this.difficulty, this.raidTypeId];
			},
			
			// Is this a valid link (to the best of our knowledge)
			isValid: function()
			{
				// All a link needs to be valid is an id and a hash
				return typeof this.id != "undefined" && typeof this.hash != "undefined" && this.id != "" && this.hash != "";
			},
			
		});
		
		// Parameter text for this parser
		RaidLink.paramText = "url";

		// Define the regular expression (regex) that tells us if a link is a raid link or not
		RaidLink.linkPattern = /(?:https?:\/\/www\.kongregate\.com)?(?:\/games\/)?(?:5thPlanetGames\/legacy-of-a-thousand-suns)?(?!\?4217\-op)\?([^,"]*)\b/i;
		
		// Define a regular expresson to catch busted links
		RaidLink.backupLinkReplacementPattern = /.?\[?"?http:\/\/cdn2\.kongregate\.com\/game_icons\/0033\/2679\/i\.gif\?4217\-op","5thPlanetGames\/legacy\-of\-a\-thousand\-suns\?.*?(?:\u2026|\u8320|…|\.\.\.|\])*$/i;
		
		// Fallback image url if we can't get the provided one
		RaidLink.defaultImage = '<img src="http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op" />';
		
		// Fallback message format
		RaidLink.defaultMessageFormat = "{image} {visited} Raid: [{size}-{stat}-{difficulty}-{fs}] {name}";
		
		// Old link format
		RaidLink.defaultLinkFormat_v1 = "<a class=\"raidLink raidDiff{difficulty}\" onclick=\"return DC_LoaTS_Helper.raidLinkClick(event, '{url}');\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";
		
		// Fallback link format
		RaidLink.defaultLinkFormat_v2 = "<a class=\"raidLink raidDiff{difficulty}\" onclick=\"return DC_LoaTS_Helper.raidLinkClick(event);\" onmousedown=\"return DC_LoaTS_Helper.raidLinkMouseDown(event);\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";
		
