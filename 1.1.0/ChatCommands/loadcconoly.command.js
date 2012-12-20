		
		// Load CConoly command
		RaidCommand.create( 
			{
				commandName: "loadcconoly",
				aliases: ["loadcc", "lcc", "cconoly", "cc", "loadcconolyraids", "loadccraids"],
				// No predefined parsing
				// parsingClass: none,
				
				cconolyUrl: "http://cconoly.com/lots/raidlinks.php",
				
				handler: function(deck, parser, params, text, context)
				{
					if (params === "cancel") {
						parser = new UrlParsingFilter("cancel");
					}
					else {
						parser = new UrlParsingFilter(this.cconolyUrl + " " + params);
					}
					
					// Declare ret object
					var ret = {success: parser.type === "cconoly"};
						
					if (ret.success) {
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						ret.statusMessage = "Error processing command <code>" + text + "</code>";
					}
					return ret;
				},
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load cconoly raids"
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadcconoly</code>\n";
					helpText += "\n";
					helpText += "Loads raids from CConoly, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
