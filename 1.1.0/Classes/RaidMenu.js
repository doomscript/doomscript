		/************************************/
		/********** RaidMenu Class **********/
		/************************************/
		
		// TODO: RaidMenu coming soon!
		// Class to manage a popup raid menu
		// There can only be a single raid menu at a time. The constructor will enforce this
		window.RaidMenu = Class.create({
			initialize: function()
			{
				// Find the existing RaidMenu
				this.container = document.getElementById("DC_LoaTS_raidMenu");
				
				// If a RaidMenu doesn't exist yet, make it
				if (typeof this.container == "undefined" || this.container == null)
				{
					// Hooks to register and unregister
					this._startDragHook = this._startDrag.bind(this);
					this._performDragHook = this._performDrag.bind(this);
					this._stopDragHook = this._stopDrag.bind(this);

					this.container = document.createElement("div");
					this.container.id = "DC_LoaTS_raidMenu";
					$(this.container).hide();
					document.body.appendChild(this.container);
					
					this.titleBarWrapper = document.createElement("div");
					this.titleBarWrapper.id = "DC_LoaTS_raidMenuTitleBarWrapper";
					this.titleBarWrapper.className = "clearfix";
					this.container.appendChild(this.titleBarWrapper);
					
					this.titleBar = document.createElement("div");
					this.titleBar.id = "DC_LoaTS_raidMenuTitleBar";
					this.titleBarWrapper.appendChild(this.titleBar);
					DC_LoaTS_Helper.registerEventHandler(this.titleBar, "mousedown", this._startDragHook);
					
					var titleBarLeft = document.createElement("div");
					titleBarLeft.id = "DC_LoaTS_raidMenuTitleBarLeft";
					titleBarLeft.appendChild(document.createTextNode("LoaTS Helper Menu"));
					this.titleBar.appendChild(titleBarLeft);
					
					this.titleBarCenter = document.createElement("div");
					this.titleBarCenter.id = "DC_LoaTS_raidMenuTitleBarCenter";
					this.titleBar.appendChild(this.titleBarCenter);
					
					var titleBarRight = document.createElement("div");
					titleBarRight.id = "DC_LoaTS_raidMenuTitleBarRight";
					this.titleBar.appendChild(titleBarRight);


					// Set up the close button
					this.titleBarClose = document.createElement("img");
					this.titleBarClose.id = "DC_LoaTS_raidMenuClose";
					this.titleBarClose.src = "https://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/base.png";					
					this.titleBarClose.setAttribute("usemap", "#raidMenuCloseMap");
					this.titleBarWrapper.appendChild(this.titleBarClose);
					
					// We only want the hover effect to work on the red triangle, so we'll need a click map
					this.titleBarCloseMap = document.createElement("map");
					this.titleBarCloseMap.name = "raidMenuCloseMap";
					this.titleBarCloseMap.id = "raidMenuCloseMap";
					this.titleBarWrapper.appendChild(this.titleBarCloseMap);
					
					// Define the click map for the triangle close image.
					// This is the area that responds to clicks and hover effects
					var titleBarCloseArea = document.createElement("area");
					titleBarCloseArea.shape = "poly";
					titleBarCloseArea.coords = "12,6,50,42,50,6,46,1,42,0,19,-1";
					titleBarCloseArea.href = "#";
					titleBarCloseArea.setAttribute("onclick", "RaidMenu.toggle(); return false;");
					titleBarCloseArea.setAttribute("onmouseover", "$('DC_LoaTS_raidMenuClose').src = 'https://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/hover.png';");
					titleBarCloseArea.setAttribute("onmouseout", "$('DC_LoaTS_raidMenuClose').src = 'https://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/base.png';");
					this.titleBarCloseMap.appendChild(titleBarCloseArea);

					
					// This is where the panes go
					this.bodyWrapper = document.createElement("div");
					this.bodyWrapper.id = "DC_LoaTS_raidMenuBodyWrapper";
					this.container.appendChild(this.bodyWrapper);
					
					// This is where the tabs go
					this.tabsList = document.createElement("ul");
					this.tabsList.id = "DC_LoaTS_raidMenuTabs"
					this.bodyWrapper.appendChild(this.tabsList);


					// Activate tab container
					this.tabs = new Control.Tabs('DC_LoaTS_raidMenuTabs');

					// Holder for activated tabs
					this.activatedTabs = {};
					
					// Activate tabs
					this._activateTabs();
				}
			},
			
			// Resorts the tabs according to their position
			// TODO: RaidMenu should probably have an addTab() where it manages this
			resortTabs: function() {
				
				var tabs = this.tabsList.getElementsByTagName("li");
				console.log(tabs);
				
			},
			
			// Toggles the visibility of the raid menu
			/*public void*/
			toggle: function()
			{
				this.container.toggle();
			},
			
			// Show the raid menu
			/*public void*/
			show: function()
			{
				this.container.show();
			},
			
			// Hide the raid menu
			/*public void*/
			hide: function()
			{
				this.container.hide();
			},
			
			// Activates the tab classes. Probably don't call this except once in initialize
			/*private void*/
			_activateTabs: function()
			{
				// Create all the tabs
				for (var tabPosition in RaidMenu.tabClasses)
				{
					try 
					{
						this.activatedTabs[tabPosition] = new RaidMenu.tabClasses[tabPosition](this);
					}
					catch (ex)
					{
						console.warn("Error activating tab in position " + tabPosition);
						console.warn(ex);
					}
				}
				
				// Activate first tab
				this.tabs.first();
			},
			
			activateTab: function(tabClass) {
				this.activatedTabs[tabClass.tabPosition] = new tabClass(this);
			},

            setActiveTab: function(tabClass) {
                this.tabs.setActiveTab(this.activatedTabs[tabClass.tabPosition].tabA);
            },
			
			// Event fired as the menu title has been clicked
			/*private void*/	
			_startDrag: function(e)
			{
				// Half-hearted IE check
				var evt = e || window.event;
				
				// Detect right click
				var rightclick;
				if (evt.which)
				{
					rightclick = (evt.which == 3);
				}
				else if (evt.button)
				{
					rightclick = (evt.button == 2);
				}
				
				// Don't start dragging on right click
				if (rightclick)
				{
					return;
				}
				
				// Mark that it's being dragged
				this.beingDragged = true;
				
				// Capture the drag start point in order to calculate movement
				this.preDragLeft = this.container.offsetLeft;
				this.preDragTop = this.container.offsetTop;
				this.startingMouseX = evt.clientX;
				this.startingMouseY = evt.clientY;
				
				// Register the listeners for the rest of the drag
				DC_LoaTS_Helper.registerEventHandler(document, "mousemove", this._performDragHook);
				DC_LoaTS_Helper.registerEventHandler(document, "mouseup", this._stopDragHook);
				
				// This should hopefully keep it from selecting text and doing anything else
				// that normal clicking would do
				return DC_LoaTS_Helper.stopDefaultEventAction(evt);
			},
			
			// Event fired as the menu is being actually dragged
			/*private void*/
			_performDrag: function(e)
			{
				// Half-hearted IE check
				var evt = e || window.event;
				
				// Move the menu based on the user's mouse movements
				this.container.style.left = Math.max(this.preDragLeft + (evt.clientX-this.startingMouseX), 0) + "px";
				this.container.style.top = Math.max(this.preDragTop + (evt.clientY-this.startingMouseY), 0) + "px";
				
				// This should hopefully keep it from selecting text and doing anything else
				// that normal dragging would do
				return DC_LoaTS_Helper.stopDefaultEventAction(evt);
			},
			
			//Event fired as the mouse is released at the end of a drag
			/*private void*/
			_stopDrag: function(e)
			{
				// Mark that it's no longer being dragged
				this.beingDragged = false;
				
				// Remove the event listeners
				DC_LoaTS_Helper.unregisterEventHandler(document, "mousemove", this._performDragHook);
				DC_LoaTS_Helper.unregisterEventHandler(document, "mouseup", this._stopDragHook);

				// Release the variables holding the previous locations
				delete this.preDragLeft;
				delete this.preDragTop;
				delete this.startingMouseX;
				delete this.startingMouseY;
			}
		});
		
		// Put in a place holder for the tabs
		RaidMenu.tabClasses = {};
		
		// Ensure the raid menu is available
		/*public static RaidMenu*/
		RaidMenu.getInstance = function()
		{
			// Locate or create a raid menu
			var raidMenu = window.raidMenu;
			if (typeof raidMenu == "undefined")
			{
				try
				{
					raidMenu = new RaidMenu();
					window.raidMenu = raidMenu;
				}
				catch(ex)
				{
					console.error("Error while opening raid menu");
					console.error(ex);
					return;
				}
			}
			
			return raidMenu;
		};

		// Toggle the visibility of the raid menu
		/*public static void*/
		RaidMenu.toggle = function()
		{
			// Toggle its visibility
			RaidMenu.getInstance().toggle();
		};

		// Show the raid menu
		/*public static void*/
		RaidMenu.show = function()
		{
			// Show it
			RaidMenu.getInstance().show();
		};

        // Hide the raid menu
        /*public static void*/
        RaidMenu.hide = function()
        {
            // Hide it
            RaidMenu.getInstance().hide();
        };

        // Show a specific tab
        /*public static void*/
        RaidMenu.setActiveTab = function(tabClass)
        {
            // Switch to the tab
            RaidMenu.getInstance().setActiveTab(tabClass);

            // Show the menu itself, if it's hidden
            RaidMenu.show();
        };


