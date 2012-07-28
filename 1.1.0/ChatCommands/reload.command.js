		RaidCommand.create( 
			{
				commandName: "reload",
				aliases: ["refresh"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// true if we did reload, false otherwise
					ret.success = DC_LoaTS_Helper.reload();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Reload the game"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/reload</code>\n";
					helpText += "Attempts to reload just the game and not the window\n";
					
					return helpText;
				}
			}
		);
		
