		/************************************/
		/********* Preferences Tab **********/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Preferences",
				tabPosition: 100,
				
				rightClickVisitedKey: "RightClickVisited",
				ignoreInvalidCommandsKey: "IgnoreInvalidCommands",
				hideVisitedRaidsKey: "HideVisitedRaids",
				hideWorldChatKey: "HideWorldChat",
				loadRaidsInBackgroundKey: "LoadRaidsInBackground",
				reportDeadRaidsKey: "ReportDeadRaids",
				useQueryTimeDeltaKey: "UseQueryTimeDelta",
				loadRaidsInBackgroundDelayKey: "LoadRaidsInBackgroundDelay",
				leftClickToWhisperKey: "LeftClickToWhisper",
				rightClickUserMenu: "RightClickUserMenu",

				initPane: function()
				{
					var wrapper = document.createElement("div");
					var me = this;

                    var rightClickOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-RightClickVisitedInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.rightClickVisitedKey, true),
                        "Right-click should mark raids visited.",
                        "If checked, right clicking a link will mark it visited",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.rightClickVisitedKey, this.checked);
                            }
                        }
                    );
					wrapper.appendChild(rightClickOption.wrapper);

                    var ignoreInvalidOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-IgnoreInvalidCommandsInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.ignoreInvalidCommandsKey, true),
                        "Ignore invalid commands.",
                        "If checked, any command that is not a valid command will be ignored",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.ignoreInvalidCommandsKey, this.checked);
                            }
                        }
                    );
                    wrapper.appendChild(ignoreInvalidOption.wrapper);


                    var hideVisitedOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-HideVisitedRaidsInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.hideVisitedRaidsKey, false),
                        "Hide Visited and Completed Raids.",
                        "If checked, Visited and Completed Raids posted into chat will be hidden",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.hideVisitedRaidsKey, this.checked);

                                DC_LoaTS_Helper.handleIgnoreVisitedRaids(this.checked);
                            }
                        }
                    );
                    wrapper.appendChild(hideVisitedOption.wrapper);

                    var hideWorldChat = me.createSimpleOptionHTML(
                        "PreferencesMenu-HideWorldChatInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.hideWorldChatKey, false),
                        "Hide World Chat",
                        "If checked, World Chat will not be visible",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.hideWorldChatKey, this.checked);

                                DC_LoaTS_Helper.handleHideWorldChat(this.checked);
                            }
                        }
                    );
                    wrapper.appendChild(hideWorldChat.wrapper);

                    var loadBackgroundOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-LoadRaidsInBackgroundInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundKey, true),
                        "Load Raids in Background (Skips the Play Now screen when loading raids)",
                        "If checked, raids won't load in the game area.",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.loadRaidsInBackgroundKey, this.checked);
                            }
                        }
                    );
                    wrapper.appendChild(loadBackgroundOption.wrapper);

                    var loadRaidsInBackgroundDelayOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-LoadRaidsInBackgroundDelayInput",
                        "text",
                        DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundDelayKey, 50),
                        "ms. Time Between Loading Raids (Only applicable if Load Raids in Background is enabled)",
                        "Default = 50; No delay = 0; Half a second = 500.",
                        {
                            size: 4,
                            maxlength: 4,
                            onchange: function()
                            {
                                var v = this.value;

                                if (/^\d+$/.test(v))
                                {
                                    DC_LoaTS_Helper.setPref(me.loadRaidsInBackgroundDelayKey, v);
                                }
                                else
                                {
                                    holodeck.activeDialogue().raidBotMessage("Load Raids In Background Delay: Please enter only numbers.");
                                }
                            }
                        }
                    );
                    wrapper.appendChild(loadRaidsInBackgroundDelayOption.wrapper);

                    var leftClickToWhisperOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-LeftClickToWhisper",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.leftClickToWhisperKey, true),
                        "Left click a user's name in chat to whisper them (Requires refresh after change)",
                        "Overrides default functionality of showing mini-profile",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.leftClickToWhisperKey, this.checked);

                                // Attach or detach the handlers
                                DC_LoaTS_Helper.handleMessageWindowClickHandler();

                                // Ask the user if they want to refresh now
                                if (window.confirm && window.confirm("The page needs to be refreshed in order for your preference change to take effect. Confirm to refresh now; Cancel to refresh later.")) {
                                    document.location.reload();
                                }
                            }
                        }
                    );
                    wrapper.appendChild(leftClickToWhisperOption.wrapper);

                    var rightClickUserMenuOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-RightClickUserMenu",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.rightClickUserMenu, true),
                        "Right click a user's name to show an action menu",
                        "Contains options to show their profile, friend them, and eventually more",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.rightClickUserMenu, this.checked);

                                // Attach or detach the handlers
                                DC_LoaTS_Helper.handleMessageWindowContextMenuHandler();
                            }
                        }
                    );
                    wrapper.appendChild(rightClickUserMenuOption.wrapper);

					this.pane.appendChild(wrapper);
				}
		});

