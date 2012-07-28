		/************************************/
		/************ Raids Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Raids",
				tabHeader: "Seen Raids",
				tabPosition: 10,
				
				initPane: function()
				{
					this.currentRaidFilter;
					
//					this.header = document.createElement("h1");
//					this.header.className = "RaidMenuTab-Header";
//					this.header.update("Seen Raids");
//					this.pane.appendChild(this.header);
//					
					this.searchWrapper = document.createElement("div");
					this.searchWrapper.id = "RaidsMenu-SearchWrapper";
					this.pane.appendChild(this.searchWrapper);
					
					this.searchWrapper.update("Search for raids: ");
					
					this.searchBox = document.createElement("input");
					this.searchBox.id = "RaidsMenu-SearchBox";
					this.searchBox.observe("input", function(e)
					{
						if (typeof this._searchBoxTypingTimeout)
						this.onSearchBoxChange();
					}.bind(this));
					
					this.searchWrapper.appendChild(this.searchBox);
					
					var afterSearchWrapper = document.createElement("div");
					afterSearchWrapper.update("RaidBot sees: /seenraids ");
					this.searchWrapper.appendChild(afterSearchWrapper);
					
					
					this.searchBoxNormalized = document.createElement("span");
					this.searchBoxNormalized.id = "RaidsMenu-SearchBoxNormalized";
					afterSearchWrapper.appendChild(this.searchBoxNormalized);
					
					this.resultsBox = document.createElement("div");
					this.resultsBox.id = "RaidsMenu-ResultsBox";
					this.pane.appendChild(this.resultsBox);
				},
				
				onSearchBoxChange: function()
				{
					if (this.searchBox.value.length < 3)
					{
						this.clearResults();
						return;
					}
					
					var tmpFilter = new RaidFilter(this.searchBox.value);
					
					if (!this.currentRaidFilter || this.currentRaidFilter.toString() != tmpFilter.toString())
					{
						this.currentRaidFilter = tmpFilter;
						this.searchBoxNormalized.update(this.currentRaidFilter.toString());
						
						
						// Retrieve the message format
						var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
						// Retrieve the anchor tag format
						var linkFormat = DC_LoaTS_Helper.getLinkFormat();
						
						
						var raidLinks = RaidManager.fetchByFilter(this.currentRaidFilter);
						var raidsHTML = "";
						for (var i = 0; i < raidLinks.length; i++)
						{
							raidsHTML += (i+1) + ") " + raidLinks[i].getFormattedRaidLink(messageFormat.replace("{image}", ""), linkFormat) + "<br><br>";
						}
						
						this.resultsBox.innerHTML = raidsHTML;
					}
				},
				
				getRaidRow: function(link)
				{
					var raid = link.getRaid();
				},
				
				clearResults: function()
				{
					this.resultsBox.childElements().invoke("remove");
				}
			
		});
		
//		RaidMenuTab.raidSearchResultsFields = [{"raid."}]
		
