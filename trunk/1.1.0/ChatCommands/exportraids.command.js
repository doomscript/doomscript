		RaidCommand.create( 
			{
				commandName: "exportraids",
				aliases: ["dumpraids"],
				parsingClass: RaidFilter,
				
				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
						
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
							// Capture all the text in one block
							var outputText = "";
							
							// For every link we found
							for (var i = 0; i < raidLinks.length; i++)
							{
								// Print matched links
								outputText += raidLinks[i].getURL() + "\n";
							}
							
							// Export the data we found
							DC_LoaTS_Helper.forceDownload(outputText, raidFilter.toString().replace(" ", "_").replace(/\W/gi, ""));
							
							// Print out the stats for the query
							ret.statusMessage = "<code>/" + this.commandName + " " + raidFilter.toString() + "</code> took " + (new Date()/1 - queryStartTime) + " ms and exported " + raidLinks.length + " results.";
							
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
							text: "Export matching data",
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/exportraids raidName difficulty {state: stateName} {age: timeFormat} {fs: fsFormat} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "Exports to file raids that you've seen before in chat"
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
					helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
					
					return helpText;
				}
			}
		);
		
