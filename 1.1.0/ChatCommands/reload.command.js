		RaidCommand.create( 
			{
				commandName: "reload",
				aliases: ["refresh", "reloaf", "reloa", "eload"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					params = params.trim().toLowerCase();
					if (params != "game" && params != "chat" && params != "wc" && params != "")
					{
						holodeck.processChatCommand("/reload help");
                        return {success: true};
					}
					// true if we did reload, false otherwise
					ret.success = DC_LoaTS_Helper.reload(null, params);
					
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
					helpText += "To reload the World Chat, use <code>/reload chat</code>\n";
					
					return helpText;
				}
			}
		);
		
