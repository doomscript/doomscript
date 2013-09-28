		RaidCommand.create( 
			{
				commandName: "update",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					window.open(DC_LoaTS_Properties.scriptDownloadURL, "_blank");
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Get the current stable script"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/update</code>\n";
					helpText += "Attempts to install the latest stable doomscript version from <a href=\"" + DC_LoaTS_Properties.scriptURL + "\">" + DC_LoaTS_Properties.scriptURL + "</a>.\n";
					
					return helpText;
				}
			}
		);
		
