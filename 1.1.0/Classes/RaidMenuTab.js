		/************************************/
		/******** RaidMenuTab Class *********/
		/************************************/
		
		// Class to manage a tab in the raid popup menu
		window.RaidMenuTab = Class.create({
			initialize: function(parentMenu)
			{
				//console.log("Creating tab ", arguments);
				this.parentMenu = parentMenu;
				var me = this;
				
				var sanitaryName = me.getSanitizedName();
				me.tabLi = document.createElement("li");
				me.tabLi.className = "DC_LoaTS_raidMenuTab";
				me.parentMenu.tabsList.appendChild(me.tabLi);
				
				me.tabA = document.createElement("a");
				me.tabA.href = "#DC_LoaTS_raidMenu" + sanitaryName + "Pane";
				me.tabA.id = "DC_LoaTS_raidMenu" + sanitaryName + "PaneTab";
				me.tabA.appendChild(document.createTextNode(me.tabName));
				me.tabLi.appendChild(me.tabA);
				
				me.pane = document.createElement("div");
				me.pane.id = "DC_LoaTS_raidMenu" + sanitaryName + "Pane";
				me.pane.className = "DC_LoaTS_raidMenuPane";
				me.pane.style.display = "none";
				me.parentMenu.bodyWrapper.appendChild(me.pane);
				
				me.parentMenu.tabs.addTab(me.tabA);

				
				if (me.closeable) {
					me.tabCloseA = document.createElement("a");
					me.tabCloseA.href = "#";
					me.tabCloseA.className = "DC_LoaTS_raidMenuCloseTabA";
					me.tabCloseA.innerText = "X";
					me.tabCloseA.onclick = function() {
						me.parentMenu.tabsList.removeChild(me.tabLi);
						me.parentMenu.bodyWrapper.removeChild(me.pane);
						delete RaidMenu.tabClasses[me.tabPosition];
						delete me.parentMenu.tabs.containers._object[me.tabA.href];
						var links = me.parentMenu.tabs.links;
						for (var i = 0; i < links.length; i++) {
							var link = links[i];
							if (link.key == me.tabA.href) {
								var rest = links.slice((i-1 || i) + 1 || links.length);
								links.length = i < 0 ? links.length + i : i;
								me.parentMenu.tabs.links = links.push.apply(links, rest);

								break;
							}
						}
						me.parentMenu.tabs.previous();
						return false;
					};
					me.tabLi.appendChild(me.tabCloseA);
				} // End closeable logic
				
				me.header = me.createHeader(me.tabHeader || me.tabName);
				me.pane.appendChild(me.header);
								
				
				if (typeof me.initPane === "function") {
					me.initPane();
				}
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
				if (type == "boolean" || type == "text") // Not sure if other types would need different wrappers...
				{
						var outerWrapper = document.createElement("div");
						outerWrapper.id = id + "Wrapper";
						outerWrapper.className = "DC_LoaTS_raidMenuOptionWrapper clearfix";
						
						var innerWrapper = document.createElement("div");
						innerWrapper.className = "DC_LoaTS_raidMenuInnerWrapper"
						outerWrapper.appendChild(innerWrapper);
				}
				
				switch(type)
				{
					case "boolean":
					{
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
					case "text":
					{						
						var option = document.createElement("input");
						option.type = "text";
						option.id = id;
						option.title = hoverText;
						option.value = value;
						
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
			}
		});
		
		RaidMenuTab.create = function(classObject)
		{
			//console.log(classObject);
			try
			{
				// Don't collide with other poorly positioned tabs
				while (typeof RaidMenu.tabClasses[classObject.tabPosition] !== "undefined")
				{
					classObject.tabPosition++;
				}
				
				var tabClass = Class.create(RaidMenuTab, classObject);
				tabClass.tabName = classObject.tabName;
				tabClass.tabPosition = classObject.tabPosition;
				tabClass.closeable = classObject.closeable;
				RaidMenu.tabClasses[classObject.tabPosition] = tabClass;
				return tabClass;
			}
			catch(ex)
			{
				var tabName = (typeof classObject !== "undefined" && typeof classObject.tabName !== "undefined")?classObject.tabName:"";
				
				console.warn("Error while creating RaidMenu tab class " + tabName);
				console.warn(classObject);
				console.warn(ex);
			}
		};

		RaidMenuTab.createDataDumpTab = function(data, title)
		{
			var tabTitle = title.length == 0?"Data Export":title.length > 25?title.substring(0,25):title;
			var tabA;
			RaidMenu.show();
			var tabClass = RaidMenuTab.create({
				tabName: tabTitle,
				tabHeader: "Export: " + title,
				tabPosition: 150,
				closeable: true,
				
				initPane: function()
				{
					var textArea = document.createElement("textarea");
					textArea.className = "DataDumpTab-Data";
					textArea.innerHTML = data;
					
					tabA = this.tabA;
					this.pane.appendChild(textArea);
				}
			});
			RaidMenu.getInstance().activateTab(tabClass);
			RaidMenu.getInstance().tabs.setActiveTab(tabA);
		};

