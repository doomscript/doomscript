		RaidCommand.create( 
			{
				commandName: "updateraiddata",
				aliases: ["urd", "updatedata"],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					DC_LoaTS_Helper.updateRaidData();
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Update your local raid data"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/updateraiddata</code>\n";
					helpText += "Attempts to update to the latest raid data (All the raid types).\n";
					
					return helpText;
				}
			}
		);
		
