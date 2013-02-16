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
				reportDeadRaidsKey: "ReportDeadRaids",
				useQueryTimeDeltaKey: "UseQueryTimeDelta",
				loadRaidsInBackgroundDelayKey: "LoadRaidsInBackgroundDelay",
				
				initPane: function()
				{
					var wrapper = document.createElement("div");
					var me = this;
					
					var rightClickOption = me.createSimpleOptionHTML(
									"PreferencesMenu-RightClickVisitedInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(me.rightClickVisitedKey), 
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
							DC_LoaTS_Helper.getPref(me.ignoreInvalidCommandsKey), 
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
									DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundKey), 
									"Raids should load in background rather than in the game area.", 
									"If checked, raids won't load in game area.", 
									//"Snull Snulls in the Snull",
									//"Snull Snull Snull Snull Snull",
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
							DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundDelayKey, 200), 
							"Delay (millisecons) between loading each raid in the background.",
							"Default = 200; No delay = 0; Half a second = 500.",
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

					var reportDeadRaidsOption = me.createSimpleOptionHTML(
							"PreferencesMenu-ReportDeadRaidsInput",
							"boolean", 
							DC_LoaTS_Helper.getPref(me.reportDeadRaidsKey, true), 
							"Report Dead Raids to CConoly",
							"When a raid is marked Complete, inform CConoly",
							{
								onclick: function()
								{
									DC_LoaTS_Helper.setPref(me.reportDeadRaidsKey, this.checked);
								}
							}
					);
					wrapper.appendChild(reportDeadRaidsOption.wrapper);

					var useQueryTimeDeltaOption = me.createSimpleOptionHTML(
							"PreferencesMenu-UseQueryTimeDeltaInput",
							"boolean", 
							DC_LoaTS_Helper.getPref(me.useQueryTimeDeltaKey, true), 
							"Only fetch new raids from CConoly",
							"If enabled, when you use /lcc, it will only collect raids since the last time you used it (saves some cycles on the cconoly server, so it's a nice thing to do)",
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
		
