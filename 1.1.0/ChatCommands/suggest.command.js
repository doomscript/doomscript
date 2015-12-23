		RaidCommand.create(
			{
				commandName: "suggest",
				aliases: ["idea", "suggestion", "bug", "doomcat", "doomscript", "report", "feature", "feedback"],

                generateResponseMessage: function(command) {
                    switch(command) {
                        case "idea":
                        case "feature":
                        case "doomcat":
                        case "doomscript":
                            return "Thanks for the idea!";
                        case "suggestion":
                            return "Thanks for the suggestion!";
                        case "report":
                        case "bug":
                            return "Thanks for the bug report!";
                        case "feedback":
                        default:
                            return "Thanks for the feedback!"
                    }
                },

                handler: function(deck, parser, params, text, context)
                {
                    if (!params || !params.trim()) {
                        holodeck.processChatCommand("/suggest help");
                        return {success: true};
                    }

                    var command = text.split(" ")[0].toLowerCase().substring(1);

                    var ret = {success: true, message: "Submitting..."};

                    var me = this;
                    DC_LoaTS_Helper.ajax({
                            url: "http://getKongE.org/games/lots/suggestions/",
                            method: "POST",
                            data: DC_LoaTS_Helper.uriSerialize({user: deck.username(), message: params, text: text, url: window.location.href}),
                            onload: function(response) {
                                if (response.status >= 200 && response.status < 300) {
                                    holodeck.activeDialogue().raidBotMessage(me.generateResponseMessage(command));
                                }
                                else {
                                    holodeck.activeDialogue().raidBotMessage("Sorry, there was an error (" + response.status + " processing your request. Please try again later. :-(");
                                    console.error("Server failed to process /suggest", response);
                                }
                            }
                    });

                    return ret;
                },


                getOptions: function()
                {
                    var commandOptions = {
                        initialText: {
                            text: "Suggest a doomscript feature or report a doomscript bug"
                        }
                    };

                    return commandOptions;
                },

                buildHelpText: function()
                {
                    var helpText = "<b>Raid Command:</b> <code>/suggest idea/bug text here</code>\n";
                    helpText += "If you have an idea for a new feature or you've got a bug to report, this command will let you submit them";

                    return helpText;
                }
            }
        );
