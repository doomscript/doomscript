		RaidCommand.create( 
			{
				commandName: "raidhelp",
				aliases: ["raidabout", "raidbot", "help", "doomscript", "doomscripthelp", "dshelp"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
					
					DC_LoaTS_Helper.printScriptHelp(deck, text);
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display doomscript help"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidhelp</code>\n";
					helpText += "Displays the help info for the script\n";
					
					return helpText;
				}
			}
		);
		
