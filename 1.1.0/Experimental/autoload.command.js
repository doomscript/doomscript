		RaidCommand.create(
			{
				commandName: "autoload",
				aliases: [],
				parsingClass: RaidFilter,

				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					var ret = {};
						

						
					return ret;
				},
				getOptions: function()
				{
					return;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/autoload raidFilter</code>\n";
					helpText += "where <code>raidFilter</code> is a valid raid filter\n";
					helpText += "NOT YET IMPLEMENTED\n";
					
					return helpText;
				}
			}
		);
		
