		RaidCommand.create( 
			{
				commandName: "raidstyle",
				aliases: [],
				parsingClass: RaidStyleParser,

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					
										
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Create this raid style",
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidstyle filter style</code>\n";
					helpText += "Ta\n";
					
					return helpText;
				},	
			}
		);
		
