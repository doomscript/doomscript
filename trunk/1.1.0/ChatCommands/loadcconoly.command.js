		
		// Load CConoly command
		RaidCommand.create( 
			{
				commandName: "loadcconoly",
				aliases: ["loadcc", "lcc", "cconoly", "cc", "loadcconolyraids", "loadccraids"],
				// No predefined parsing
				// parsingClass: none,
				
				paramText: "[filter]",

				handler: function(deck, parser, params, text, context)
				{
					if (params === "cancel") {
						parser = new UrlParsingFilter("cancel");
					}
					else {
						parser = new UrlParsingFilter(CConolyAPI.getRaidListUrl() + " " + params);
					}
					
					// Declare ret object
					var ret = {success: parser.type === "cconoly"};
						
					if (ret.success) {
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						ret.statusMessage = "Error processing command <code>" + text + "</code>";
						DCDebug("Error with /lcc. Parser: ", parser);
					}
					return ret;
				},
					
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load CConoly raids"
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
                    var helpText = "<b>Raid Command:</b> <code>/loadcconoly raidName difficulty {state: stateName} {age: timeFormat} {size: sizeFormat} {fs: fsFormat} {os: osFormat} {zone: zoneNumber} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "\n";
                    helpText += "Looks up raids from CConoly. "
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
		
