    // Show a list of users that you've muted
    RaidCommand.create(
        {
            commandName: "mutelist",
            aliases: ["muted", "ml"],

            handler: function(deck, parser, params, text, context)
            {
                var ret = {success: true},
                    list = "",
                    count = 0;
                for (var p in deck._chat_window._mutings) {
                    count++;
                    list += '<span _username="' + p + '" class="username chat_message_window_username">' + p + '</span>' + '\n';
                }

                ret.statusMessage = "You have " + count + " user" + (count!=1?'s':'') + " muted.\n" + list;
                return ret;
            },


            getOptions: function()
            {
                var commandOptions = {
                    initialText: {
                        text: "See who you've muted"
                    }
                };

                return commandOptions;
            },

            buildHelpText: function()
            {
                var helpText = "<b>Raid Command:</b> <code>/mutelist</code>\n";
                helpText += "See the list of Kongregate users you've muted.\n";

                return helpText;
            }
        }
    );
