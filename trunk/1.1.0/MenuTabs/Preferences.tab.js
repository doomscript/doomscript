		/************************************/
		/********* Preferences Tab **********/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Preferences",
				tabPosition: 100,
				
				rightClickVisitedKey: "RightClickVisited",
				
				initPane: function()
				{
//					this.header = document.createElement("h1");
//					this.header.className = "RaidMenuTab-Header";
//					this.header.update("Preferences");
//					this.pane.appendChild(this.header);
//
					var htmlRet = this.createSimpleOptionHTML(
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

					this.pane.appendChild(htmlRet.wrapper);
				},
							
		});
		
