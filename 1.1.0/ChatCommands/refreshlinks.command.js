		RaidCommand.create( 
			{
				commandName: "refreshlinks",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					DC_LoaTS_Helper.updatePostedLinks();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Refresh the links in chat"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/refreshlinks</code>\n";
					helpText += "Will refresh all the links and their states in chat.\n";
					helpText += "This can help if raids aren't looking marked like they should be.\n";
					
					return helpText;
				}
			}
		);
		
