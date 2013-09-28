		RaidCommand.create( 
			{
				commandName: "seenraids",
				aliases: ["seenraid", "raidseen", "raidseen", "sr"],
				parsingClass: RaidMultiFilter,
				handler: function(deck, raidFilter, params, text, context)
				{
					// Capture the start time of the query
					var queryStartTime = new Date()/1;
				
					// Declare ret object
					var ret = {};
					
					// Find all raids that match the user's criteria
					var raidLinks = RaidManager.fetchByFilter(raidFilter);
					
					// If the RaidManager executed successfully
					if (typeof raidLinks != "undefined")
					{
						// If we didn't match a single raid
						if (raidLinks.length == 0)
						{
							if (params.length == 0)
							{
								ret.statusMessage = "Could not locate any seen raids in memory.";
							}
							else
							{
								ret.statusMessage = "Could not locate any seen raids matching <code>" + params + "<code>";
							}
							
							// The lookup succeeded, we just didn't find anything
							ret.success = true;
						}
						// If we did match some raids
						else
						{
							// Retrieve the message format
							var messageFormat = DC_LoaTS_Helper.getMessageFormat();
						
							// Retrieve the anchor tag format
							var linkFormat = DC_LoaTS_Helper.getLinkFormat();
							
							// Capture all the text in one block
							var outputText = "\n";
							
							// For every link we found
							for (var i = 0; i < raidLinks.length; i++)
							{
								// We need to find the style the user has requested
								var className = raidLinks[i].getMatchedStyles().className;
								
								// Bits to wrap each message raid link with
								var wrapperFront = "<span class=\"seenraidMessageWrapper" + (className?" " + className:"") + "\">" + (i+1) + ") ";
								var wrapperBack = "</span>\n\n";
								
								// Print matched links
								outputText += wrapperFront + raidLinks[i].getFormattedRaidLink(messageFormat, linkFormat) + wrapperBack;
							}
							
							// Print out the raid links we found
							deck.activeDialogue().raidBotMessage(outputText);
							
							// Print out the stats for the query
							ret.statusMessage = "<code>/" + this.commandName + " " + raidFilter.toString() + "</code> took " + (new Date()/1 - queryStartTime) + " ms and yielded " + raidLinks.length + " results.";
							// Succeeded
							ret.success = true;
						}
					}
					// RaidManager failed
					else
					{
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
						ret.success = false;
					}
					
					return ret;
				},
				
				getOptions: function()
				{
					var commandOptions = {
						
						initialText: {
							text: "Seen raids: " + ((typeof this.parser.name != "undefined")?this.parser.name : "Unknown")
						},
						
						any: {
							text: "Any",
							callback: function()
							{
								DCDebug("Seen Any " + this.parser.name);
								delete this.parser.difficulty;
							}
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Seen Normal " + this.parser.name);
								this.parser.difficulty = 1;
							}
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Seen Hard " + this.parser.name);
								this.parser.difficulty = 2;
							}
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Seen Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							}
						},
						
						nightmare: {
							text: "Nightmare",
							callback: function()
							{
								DCDebug("Seen Nightmare " + this.parser.name);
								this.parser.difficulty = 4;
							}
						}
					};
					
					return commandOptions;
				},

				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/seenraids raidName difficulty {state: stateName} {age: timeFormat} {size: sizeFormat} {fs: fsFormat} {os: osFormat} {zone: zoneNumber} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "Looks up raids that you've seen before in chat"
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
                    helpText += "where <code>sizeFormat</code> <i>(optional)</i> is like <code>&lt;100</code> or <code>250</code>\n";
                    helpText += "where <code>osFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
                    helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
                    helpText += "where <code>zoneNumber</code> <i>(optional)</i> is like <code>1</code>, <code>Z14</code>, <code>ZA</code>, <code>WR</code>\n";
					helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
					helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
					helpText += "\n";
					helpText += "<b>Examples:</b>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h} {fs:<1M}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all normal telemachus raids that you've not visited before\n";
					helpText += "<code>" + this.getCommandLink("tele 1 {state:!visited}") + " </code>\n";
					helpText += "\n";
					helpText += "<i>Find the first 10 void killer raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("killer {count: 10}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find the second 10 void killer raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("killer {count: 10} {page: 2}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all void nightmare vorden raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("vorden 4") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Looking for <a href=\"http://www.zoywiki.com/index.php/LotS/experiment/multicoloredcloorian\" title=\"Cloorian Material needed to craft some Legendary pants\">Cloorian Material<a/>\n";
					helpText += "<code>" + this.getCommandLink("vor|gan|nat 4 {age: <24h} {state: !visited}") + "</code>\n";
					
					return helpText;
				}
			}
		);
		
