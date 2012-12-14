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
				loadRaidsInBackgroundKey: "LoadRaidsInBackground",
				
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
									
									// Parser style for the hiding of these raids
									var parser = new RaidFilterStyleParser("{state: visited}||{state: completed}||{state: ignored} ++none")
									
									// Find all the styles matching this filter
									var matchingStyles = DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()];

									if (this.checked === true) {
										// Does the hide visited style already exist?
										// - If yes, make sure it's enabled
										// - If no, create it and make sure it's enabled
										
										if (typeof matchingStyles === "undefined")
										{
											matchingStyles = [];
											DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()] = matchingStyles;
											parser.injectStyles();
											matchingStyles.push(parser);
										}
										else
										{
											var found = false;
											for (var i = 0; i < matchingStyles.length; i++) {
												if (parser.getKey() === matchingStyles[i].getKey()) {
													found = true;
													break;
												}
											}
											if (!found) {
												parser.injectStyles();
												matchingStyles.push(parser);
											}
										}
									}
									else {
										// Does the hide visited style already exist?
										// - If yes, disable it
										// - If no, do nothing
										if (typeof matchingStyles !== "undefined") {
											for (var i = 0; i < matchingStyles.length; i++) {
												if (parser.getKey() === matchingStyles[i].getKey()) {
													matchingStyles.splice(i, 1);
													break;
												}
											}
										}
									}
									
									
									
									DC_LoaTS_Helper.updatePostedLinks();
								}
							}
					);
					wrapper.appendChild(hideVisitedOption.wrapper);

			

					var loadBackgroundOption = me.createSimpleOptionHTML(
									"PreferencesMenu-LoadRaidsInBackgroundInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundKey), 
									//"Raids should load in background rather than in the game area.", 
									//"If checked, raids won't load in game area.", 
									"Snull Snulls in the Snull",
									"Snull Snull Snull Snull Snull",
									{
										onclick: function()
										{
											//TODO: Obviously, this should come from a key
											DC_LoaTS_Helper.setPref(me.loadRaidsInBackgroundKey, this.checked);
										}
									}
					);
					
					
					// This is commented out until we decide if it can be used.
					// Reminder: Uncomment this line to re-enable loading in the background
					wrapper.appendChild(loadBackgroundOption.wrapper);

					this.pane.appendChild(wrapper);
				}
							
		});
		
