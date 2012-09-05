		/************************************/
		/********* Preferences Tab **********/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Preferences",
				tabPosition: 100,
				
				rightClickVisitedKey: "RightClickVisited",
				loadRaidsInBackgroundKey: "LoadRaidsInBackground",
				
				initPane: function()
				{
					var wrapper = document.createElement("div");
					
					var rightClickOption = this.createSimpleOptionHTML(
									"PreferencesMenu-RightClickVisitedInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(this.rightClickVisitedKey), 
									"Right-click should mark visited.", 
									"If checked, right clicking a link will mark it visited", 
									{
										onclick: function()
										{
											//TODO: Obviously, this should come from a key
											DC_LoaTS_Helper.setPref("RightClickVisited", this.checked);
										}
									}
					);

					var loadBackgroundOption = this.createSimpleOptionHTML(
									"PreferencesMenu-LoadRaidsInBackgroundInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(this.loadRaidsInBackgroundKey), 
									"Raids should load in background rather than in the game area.", 
									"If checked, raids won't load in game area.", 
									{
										onclick: function()
										{
											//TODO: Obviously, this should come from a key
											DC_LoaTS_Helper.setPref("LoadRaidsInBackground", this.checked);
										}
									}
					);
					
					wrapper.appendChild(rightClickOption.wrapper);
					wrapper.appendChild(loadBackgroundOption.wrapper);

					this.pane.appendChild(wrapper);
				}
							
		});
		
