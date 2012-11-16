		RaidCommand.create( 
			{
				commandName: "version",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					return {success: true, statusMessage: "Your doomscript version is <b>" + DC_LoaTS_Properties.version + "</b>"};
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Your doomscript version is <b>" + DC_LoaTS_Properties.version + "</b>",
							doNotCallHandler: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/version</code>\n";
					helpText += "Tells the current version of the installed script.\n";
					
					return helpText;
				}
			}
		);
		
