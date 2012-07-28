		RaidCommand.create( 
			{
				commandName: "clearraids",
				aliases: ["clearraid", "raidclear", "raidsclear", "clearcache"],
				parsingClass: RaidFilter,
				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					ret = {};
					
					// If the user wants to clear all raids
					if (raidFilter.name == "all")
					{
						// Clear all raids stored in memory
						RaidManager.clear();
						
						// Notify the user
						ret.statusMessage = "All raids have been cleared from script memory.";
						ret.success = true;
					}
					// If there were no params. 
					// This used to clear all raids, but that was catching some people by surprise, :-P
					else if (params.length == 0)
					{
						// Notify the user
						ret.statusMessage = "/" + this.getName() + " no longer clears all raids. Use " + this.getCommandLink("all") + " to clear all raids or " + this.getCommandLink("help") + " to find out more about this command.";
						ret.success = true;
					}
					// The user posted specific criteria
					else
					{
						// Find all raids that match the user's criteria
						var raidLinks = RaidManager.fetchByFilter(raidFilter);
						
						// If the RaidManager executed successfully
						if (typeof raidLinks != "undefined")
						{
							// If we didn't match a single raid
							if (raidLinks.length == 0)
							{
								ret.statusMessage = "Could not locate any raids to clear matching <code>" + raidFilter.toString() + "</code>";
								ret.success = true;
							}
							// If we did match some raids
							else
							{
								// Delete all found raids from memory
								RaidManager.clear(raidLinks);
								
								// Notify the user
								ret.statusMessage = "Cleared " + raidLinks.length + " raids from memory.";
								ret.success = true;
							}
						}
						// RaidManager failed
						else
						{
							ret.statusMessage = "Did not understand command: <code>/" + this.getName() + " " + raidFilter.toString() + "</code>";
							ret.success = false;
						}
					}						
					return ret;
				},
				
				getOptions: function()
				{
					//TODO: Decide what options should go here
					var commandOptions;
					if (this.parser.name == "all")
					{
						commandOptions = {
							initialText: {
								text: "Clear all raids from memory"
							}
						};
					}
					else
					{
						commandOptions = {
							initialText: {
								text: "Clear raids from memory matching " + this.parser.toString()
							}
						};
					}
					
					return commandOptions;
				},

				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/clearraids raidName difficully {state:stateName} {age: timeFormat} {fs: fsFormat}</code>\n";
					helpText += "Deletes all raids from script memory.\n";
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "\n"
					helpText += "<b>Examples:</b>\n"
					helpText += "\n"
					helpText += "<i>Clear all seen but keep all visited raids<i>\n"
					helpText += "<code>/clearraids {state:seen}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n"
					helpText += "<code>/clearraids {state:seen} {age: <5h}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n"
					helpText += "<code>/clearraids {state:seen} {age: <5h} {fs:<1M}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all normal telemachus raids that you've visited before\n"
					helpText += "<code>/clearraids tele 1 {state:visited}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all void killer raids in memory\n"
					helpText += "<code>/clearraids killer</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all void nightmare vorden raids\n"
					helpText += "<code>/clearraids vorden 4</code>\n"
					
					return helpText;
				}
			}
		);
		
