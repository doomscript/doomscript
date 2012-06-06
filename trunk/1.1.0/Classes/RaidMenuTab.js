		/************************************/
		/******** RaidMenuTab Class *********/
		/************************************/
		
		// Class to manage a tab in the raid popup menu
		window.RaidMenuTab = Class.create({
			initialize: function(parentMenu)
			{
				this.parentMenu = parentMenu;
				
				var sanitaryName = this.getSanitizedName();
				this.tabLi = document.createElement("li");
				this.tabLi.className = "DC_LoaTS_raidMenuTab";
				this.parentMenu.tabsList.appendChild(this.tabLi);
				
				this.tabA = document.createElement("a");
				this.tabA.href = "#DC_LoaTS_raidMenu" + sanitaryName + "Pane";
				this.tabA.appendChild(document.createTextNode(this.tabName));
				this.tabLi.appendChild(this.tabA);
				
				this.pane = document.createElement("div");
				this.pane.id = "DC_LoaTS_raidMenu" + sanitaryName + "Pane";
				this.pane.className = "DC_LoaTS_raidMenuPane";
				this.pane.style.display = "none";
				this.parentMenu.bodyWrapper.appendChild(this.pane);
				
				this.parentMenu.tabs.addTab(this.tabA);
				
				this.header = this.createHeader(this.tabHeader || this.tabName);
				this.pane.appendChild(this.header);
				
				this.initPane();
			},
			
			getSanitizedName: function()
			{
				return this.tabName.trim().replace(" ", "_");
			},
			
			createHeader: function(title)
			{
				var header = document.createElement("h1");
				header.className = "RaidMenuTab-Header";
				header.update(title);
				return header;
			},
			
			createSimpleOptionHTML: function(id, type, value, description, hoverText, additionalAttributes)
			{
				switch(type)
				{
					case "boolean":
					{
						var outerWrapper = document.createElement("div");
						outerWrapper.id = id + "Wrapper";
						outerWrapper.className = "DC_LoaTS_raidMenuOptionWrapper clearfix";
						
						var innerWrapper = document.createElement("div");
						innerWrapper.className = "DC_LoaTS_raidMenuInnerWrapper"
						outerWrapper.appendChild(innerWrapper);
						
						var option = document.createElement("input");
						option.type = "checkbox";
						option.id = id;
						option.title = hoverText;
						
						if (value === "true" || value === true)
						{
							option.checked = true;
						}
						
						for (var attribute in additionalAttributes)
						{
							option[attribute] = additionalAttributes[attribute];
						}
						
						innerWrapper.appendChild(option);
						
						var desc = document.createElement("div");
						desc.className = "DC_LoaTS_raidMenuDescription";
						desc.innerHTML = description;
						outerWrapper.appendChild(desc);
						
						return {wrapper: outerWrapper, option: option};
					}
				}
			}, 
			
		});
		
		RaidMenuTab.create = function(classObject)
		{
			try
			{
				// Don't collide with other poorly positioned tabs
				while (typeof RaidMenu.tabClasses[classObject.tabPosition] != "undefined")
				{
					classObject.tabPosition++;
				}
				
				var tabClass = Class.create(RaidMenuTab, classObject);
				tabClass.tabName = classObject.tabName;
				tabClass.tabPosition = classObject.tabPosition;
				RaidMenu.tabClasses[classObject.tabPosition] = tabClass;
			}
			catch(ex)
			{
				var tabName = (typeof classObject != "undefined" && typeof classObject.tabName != "undefined")?classObject.tabName:"";
				
				console.warn("Error while creating RaidMenu tab class " + tabName);
				console.warn(classObject);
				console.warn(ex);
			}
		};

