		RaidCommand.create( 
			{
				commandName: "linktools",
				aliases: ["ad", "advertise", "blatantselfpromotion", "getdoomscript"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};

                    var toolsText;

                    if (params.indexOf("2") > -1) {
                        toolsText = this.getToolsText2();
                    }
                    else {
                        toolsText = this.getToolsText();
                    }

                    if (DC_LoaTS_Helper.getPref("LinkifyUrls", true)) {
                        toolsText = toolsText.replace(urlPattern, function(url) {
                            // Last minute check to make sure the regex didn't flub it
                            // If the url contains any weird characters, ", ', <, or >, just bail
                            return /["'><]/g.test(url) ? url : urlFormat.format(url);
                        });
                    }

                    // If the user passed in the "post" param or is using /ad, show it publicly
					if (params.trim() === "post" || text.toLowerCase().trim() === "/ad") {
						holodeck._chat_window._active_room.sendRoomMessage(toolsText);
					}
					else {
						deck.activeDialogue().raidBotMessage(toolsText);
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display tools links" + (this.commandText.indexOf("2") > -1 ? " (Page 2)" : "")
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/linktools [post]</code>\n";
					helpText += "Displays a list of scripts that you might find useful.\n";
					helpText += "<code>" + this.getCommandLink("") + "</code> will post the links just to you.\n";
					helpText += "<code>" + this.getCommandLink("post") + "</code> will post the links to chat.\n";
					helpText += "\n";
					helpText += "Note: The <code>" + DC_LoaTS_Helper.getCommandLink("/ad") + "</code> alias automatically posts, unlike the other aliases.";

					return helpText;
				},

                getToolsText: function() {
                    var toolsText = "\nGet doomscript: " + DC_LoaTS_Properties.scriptURL + " and any of: ";
                    toolsText += "\nRaidTools: " + DC_LoaTS_Properties.RaidToolsURL + " ";
                    toolsText += "\nQuickFriend: " + DC_LoaTS_Properties.QuickFriendURL + " ";
                    toolsText += "\nPlay Now Fix: " + DC_LoaTS_Properties.PlayNowFixURL;

                    return toolsText;
                },
                getToolsText2: function() {
                    var toolsText = "\nFleet Codes: " + DC_LoaTS_Properties.FleetCodesURL;

                    return toolsText;
                }
			}
		);
		
