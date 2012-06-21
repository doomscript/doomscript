		RaidCommand.create( 
			{
				commandName: "clearchat",
				aliases: [],
				// No parsing
				//parsingClass: ,
				handler: function(deck, raidLink, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true, statusMessage: "Chat cleared at " + (new Date().toLocaleString())};
						
					// Load the raid from the link's url
					holodeck._active_dialogue._message_window_node.childElements().invoke("remove");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Clear chat?",
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/clearchat</code>\n";
					helpText += "Clears the text of the chat.\n";
					
					return helpText;
				}
			}
		);
		
