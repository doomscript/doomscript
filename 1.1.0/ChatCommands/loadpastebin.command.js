		
			// Load Pastebin command
		RaidCommand.create( 
			{
				commandName: "loadpastebin",
				aliases: ["loadpaste", "loadbin", "lpb", "loadraidbin", "lrb"],
				parsingClass: UrlParsingFilter,
				
				pastebinRawBase: "http://pastebin.com/raw.php?i=",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: parser.type === "pastebin"};
						
					if (ret.success) {
						// Make sure to convert to the better url
						parser.convertedURL = this.pastebinRawBase + parser.regexMatch[1];
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						if (parser.getWorkingUrl()) {
							ret.statusMessage = parser.url + " does not appear to be a pastebin link. Try " + DC_LoaTS_Helper.getCommandLink("/fetchraids " + params);
						}
						else {
							ret.statusMessage = "Could not find a pastebin link in <code>" + text + "</code>";
						}
					}
					return ret;
				},
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load bin raids from: " + this.parser.getWorkingUrl()
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadpastebin pastebinURL raidFilter</code>\n";
					helpText += "where <code>pastebinURL</code> is the url of a raid pastebin\n";
					helpText += "where <code>raidFilter</code> (optional) is a seenraids style filter to limit what's loaded from the bin\n";
					helpText += "\n";
					helpText += "Loads all raids from the pastebin, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
