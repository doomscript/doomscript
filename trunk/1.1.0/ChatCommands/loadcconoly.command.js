		
		// Load CConoly command
		RaidCommand.create( 
			{
				commandName: "loadcconoly",
				aliases: ["loadcc", "lcc", "cconoly", "cc", "loadcconolyraids", "loadccraids"],
				// No predefined parsing
				// parsingClass: none,
				
				paramText: "[filter]",
					
				timePrefKey: "LastQueryTime_Cconoly",

				cconolyUrl: "http://cconoly.com/lots/raidlinks.php?doomscript=tpircsmood",
				
				handler: function(deck, parser, params, text, context)
				{
					if (params === "cancel") {
						parser = new UrlParsingFilter("cancel");
					}
					else {
						parser = new UrlParsingFilter(this.cconolyUrl + "&hrs=" + this.hoursSinceLastCall() + " " + params);
					}
					
					// Declare ret object
					var ret = {success: parser.type === "cconoly"};
						
					if (ret.success) {
						DC_LoaTS_Helper.setPref(this.timePrefKey, new Date()/1);
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						ret.statusMessage = "Error processing command <code>" + text + "</code>";
					}
					return ret;
				},
					
				hoursSinceLastCall: function()
				{
					elapsedMs = new Date()/1 - DC_LoaTS_Helper.getPref(this.timePrefKey, 0);
					elapsedHrs = elapsedMs / 1000 / 60 / 60;
					return Math.ceil(elapsedHrs * 1000)/1000; // Round to 3 decimals
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
					var helpText = "<b>Raid Command:</b> <code>/loadcconoly [filter]</code>\n";
					helpText += "\n";
					helpText += "Loads all raids from CConoly, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
