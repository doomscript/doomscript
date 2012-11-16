		/************************************/
		/*********** Styles Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Styles",
				tabHeader: "Raid Styles (Under construction)",
				tabPosition: 20,
				optionIndex: 0,
				
				initPane: function()
				{
					this.optionRowTemplate = document.createElement("div");
					this.optionRowTemplate.className = "StylesTab-OptionRow clearfix";
					
					var raidNamesPicker = document.createElement("div");
					raidNamesPicker.className = "StylesTab-RaidNamesPicker";
					this.optionRowTemplate.appendChild(raidNamesPicker);
					
					var selectedRaidsInput = document.createElement("input");
					raidNamesPicker.appendChild(selectedRaidsInput);
					
					var selectedRaidsOptionHolder = document.createElement("div");
					raidNamesPicker.appendChild(selectedRaidsOptionHolder);
					
					for (var raidId in DC_LoaTS_Helper.raids)
					{
						var raid = DC_LoaTS_Helper.raids[raidId];
						var label = document.createElement("label");
						label["for"] = "StyleTab-RaidOption-" + raid.shortestName + "-" + this.optionIndex++;
						label.appendChild(document.createTextNode(raid.colloqName));
						
						var checkbox = document.createElement("input");
						checkbox.type = "checkbox";
						checkbox.id = label["for"];
						label.appendChild(checkbox);
						
						selectedRaidsOptionHolder.appendChild(label);
						selectedRaidsOptionHolder.appendChild(document.createElement("br"));
					}
					
					this.pane.appendChild(this.optionRowTemplate);
				}
				
		});

