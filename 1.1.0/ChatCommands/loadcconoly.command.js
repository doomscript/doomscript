		
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
					var helpText = "<b>Raid Command:</b> <code>/loadcconoly [filter]</code>\n";
					helpText += "\n";
					helpText += "Loads all raids from CConoly, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
