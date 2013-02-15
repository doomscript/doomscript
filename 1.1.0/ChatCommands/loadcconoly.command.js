		
		// Load CConoly command
		RaidCommand.create( 
			{
				commandName: "loadcconoly",
				aliases: ["loadcc", "lcc", "cconoly", "cc", "loadcconolyraids", "loadccraids"],
				// No predefined parsing
				// parsingClass: none,
				
				paramText: "[filter]",

				cconolyUrl: "http://cconoly.com/lots/raidlinks.php?doomscript=tpircsmood",
				
				handler: function(deck, parser, params, text, context)
				{
					if (params === "cancel") {
						parser = new UrlParsingFilter("cancel");
					}
					else {
						parser = new UrlParsingFilter(this.cconolyUrl + "&hrs=" + this.hoursSinceLastQuery() + " " + params);
					}
					
					// Declare ret object
					var ret = {success: parser.type === "cconoly"};
						
					if (ret.success) {
						GM_setValue(DC_LoaTS_Properties.storage.cconolyLastQueryTime, new Date()/1);
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						ret.statusMessage = "Error processing command <code>" + text + "</code>";
					}
					return ret;
				},
					
				hoursSinceLastQuery: function()
				{
					if (DC_LoaTS_Helper.getPref("UseQueryTimeDelta", true))
					{
						elapsedMs = new Date()/1 - GM_getValue(DC_LoaTS_Properties.storage.cconolyLastQueryTime, 0);
						elapsedHrs = elapsedMs / 1000 / 60 / 60;
						return Math.min(168, Math.ceil(elapsedHrs * 1000)/1000); // Round to 3 decimals
					}
					else
					{
						return 168;
					}
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
		
