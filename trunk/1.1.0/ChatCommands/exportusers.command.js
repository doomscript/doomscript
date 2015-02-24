
RaidCommand.create(
    {
        commandName: "exportusers",
        aliases: ["eu"],
        doNotEnumerateInHelp: true,

        handler: function(deck, parser, params, text, context)
        {
            // Declare ret object
            var ret = {success: true, message: "Exported Users"};

            var playerData = "Date: " + new Date() + "\n" +
                "User,Level,Admin,Developer,K+\n";

            for (var i = 0; i < active_room._users_list.length; i++) {
                var ufr = active_room._users_list[i];
                playerData += [ufr.username, ufr._level, ufr._admin, ufr._developer, ufr._premium].join(",") + "\n";
            }

            RaidMenuTab.createDataDumpTab(playerData, "KChat Users");

            return ret;
        },

        getOptions: function()
        {
            return {};
        },

        buildHelpText: function()
        {
            return "";
        }
    }
);
		
