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
				loadRaidsInBackgroundKey: "LoadRaidsInBackground",
				useQueryTimeDeltaKey: "UseQueryTimeDelta",
				loadRaidsInBackgroundDelayKey: "LoadRaidsInBackgroundDelay",
				
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
							DC_LoaTS_Helper.getPref(me.hideVisitedRaidsKey), 
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

					var useQueryTimeDeltaOption = me.createSimpleOptionHTML(
							"PreferencesMenu-UseQueryTimeDeltaInput",
							"boolean", 
							DC_LoaTS_Helper.getPref(me.useQueryTimeDeltaKey, true), 
							"Ignore Duplicates When Using /loadcconoly",
							"If enabled, when you use /loadccconoly (/lcc), it will only collect raids since the last time you used it (Saves your time and saves CConoly bandwidth money)",
							{
								onclick: function()
								{
									DC_LoaTS_Helper.setPref(me.useQueryTimeDeltaKey, this.checked);
								}
							}
					);
					wrapper.appendChild(useQueryTimeDeltaOption.wrapper);

					this.pane.appendChild(wrapper);
				}
							
		});
		
