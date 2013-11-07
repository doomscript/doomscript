RaidCommand.create(
    {
        commandName: "updatecooldowns",
        aliases: ["ucd", "cd", "cooldowns", "updatecooldown", "cooldown", "updatecd", "updatecds"],
        // No parsing needed
        /*parsingClass: ,*/
        handler: function(deck, parser, params, text, context)
        {
            // Declare ret object
            var ret = {success: true, statusMessage: "Updating Cooldowns"};

            DC_LoaTS_Helper.updateCooldowns();

            return ret;
        },
        getOptions: function()
        {
            var commandOptions = {
                initialText: {
                    text: "Update Cooldowns"
                }
            };

            return commandOptions;
        },
        buildHelpText: function()
        {
            var helpText = "<b>Raid Command:</b> <code>/updatecooldowns</code>\n";
            helpText += "Updates your cooldowns as displayed in the Raid Monitor orbs menu.\n";
            return helpText;
        }
    }
);
		
