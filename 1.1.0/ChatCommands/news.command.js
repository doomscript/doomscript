		RaidCommand.create( 
			{
				commandName: "news",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					DC_LoaTS_Helper.loadWRsAndNews();

					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Check the latest doomscript news"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/news</code>\n";
					helpText += "Loads news from the doomscript servers.\n";
					
					return helpText;
				}
			}
		);
		
