		RaidCommand.create( 
			{
				commandName: "timerdata",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					deck.activeDialogue().raidBotMessage(Timer.getReport());
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Print the timer report",
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/timerdata</code>\n";
					helpText += "Prints out timing and performance data about the script\n";
					
					return helpText;
				}
			}
		);
		
