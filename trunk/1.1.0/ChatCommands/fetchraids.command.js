		
		// Fetch raids command
		RaidCommand.create( 
			{
				commandName: "fetchraids",
				aliases: ["fetch", "fr"],
				parsingClass: UrlParsingFilter,
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: parser.known || parser.force};
						
					if (ret.success) {
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						if (!parser.known) {
							ret.statusMessage = parser.url + " is not from a known raid host. Are you sure you wish to fetch from there? " + DC_LoaTS_Helper.getCommandLink("/fetchraids force " + params);
						}
						else {
							ret.statusMessage = "Could not find a url in <code>" + text + "</code>";
						}
					}
					return ret;
				},
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load raids from: " + this.parser.getWorkingUrl()
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/fetchraids url</code>\n";
					helpText += "where <code>url</code> is the url of a raid host of some kind\n";
					helpText += "\n";
					helpText += "Loads all raids from the url, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
