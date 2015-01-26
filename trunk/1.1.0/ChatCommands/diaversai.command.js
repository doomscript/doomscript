		RaidCommand.create( 
			{
				commandName: "diaversai",
				aliases: ["dia"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
                    // Borrowed from: http://stackoverflow.com/a/5915122/1449525
                    function randomItem(items) {
                        return items[Math.floor(Math.random()*items.length)];
                    }

					// Declare ret object
					var ret = {success: true},
                        users_list = holodeck._active_dialogue._user_manager._active_room._users_list,
                        name = (params.trim().length > 0 ? params.trim() : randomItem(users_list).username),
                        quote = randomItem(DC_LoaTS_Helper.quotables);

                    quote = quote.format(randomItem(["dia", "diaversai"]), name);

                    holodeck._chat_window._active_room.sendRoomMessage(quote);
                    if (holodeck.username() !== "diaversai") {
                        DC_LoaTS_Helper.donateSpam("You, too, can have a command for a {donation of $10}!");
                    }

					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Hear what dia has to say"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/diaversai</code>\n";
					helpText += "Hear what <a href='http://www.kongregate.com/accounts/diaversai'>dia</a> has to say.\n";
					
					return helpText;
				}
            }
		);
		
