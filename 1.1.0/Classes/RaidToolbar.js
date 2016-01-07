		/************************************/
		/********* RaidToolbar Class ********/
		/************************************/
		window.RaidToolbar = Class.create({
			initialize: function()
			{
				// Set up the matched commands container
				this.existingMatchedCommands = [];
				
				// Find the existing RaidToolbar
				this.container = document.getElementById("DC_LoaTS_raidToolbarContainer");
				
				// If a RaidToolbar doesn't exist yet, make it
				if (typeof this.container == "undefined" || this.container == null)
				{
					// Create the space bewteen the kong buttons and game
					var td = new Element("td", {"id": "DC_LoaTS_toolbarCell"});
					var tr = new Element("tr");
					tr.appendChild(td);
					
					this.container = new Element("ul", {id: "DC_LoaTS_raidToolbarContainer"});
					td.appendChild(this.container);
					
					$($("flashframecontent").children[0].children[0].children[0]).insert({after:tr});
					var ccc = $("chat_container_cell");
					ccc.remove();
					td.insert({after: ccc});
					ccc.setAttribute("rowspan", "2");
					
					$("maingame").style.height = parseInt($("maingame").style.height) + 20 + "px";
					$("chat_container").style.height = parseInt($("chat_container").style.height) + 20 + "px";
					$("chat_tab_pane").style.height = parseInt($("chat_tab_pane").style.height) + 20 + "px";
					
					//TODO: Should break these out like the commands?
					this.buttons = {
						toggleMenu: new RaidButton("toggleMenu", "DC_LoaTS_menuButton", 
							function(event)
							{
								// Show the raid menu
								RaidMenu.toggle();
								
								// If the menu was spawned by a click, move the menu there
								if (typeof event != "undefined")
								{
									// Fixed Menu positioning - Needs to be relative to window scroll
									var scrollOffsets = document.viewport.getScrollOffsets();
									
									// Move the raid menu to where the mouse clicked this button
									window.raidMenu.container.style.left = Event.pointerX(event) - scrollOffsets.left + "px";
									window.raidMenu.container.style.top = Event.pointerY(event) - scrollOffsets.top + 20 + "px";
								}

							}
						),
						reload: new RaidButton("reload", "DC_LoaTS_reloadButton", DC_LoaTS_Helper.reload),
                        toggleGame: new RaidButton("toggleGame", "DC_LoaTS_toggleGameButton", DC_LoaTS_Helper.toggleGame, "Show / Hide the game"),
                        toggleWorldChat: new RaidButton("toggleWorldChat", "DC_LoaTS_toggleWorldChatButton", DC_LoaTS_Helper.toggleWorldChat, "Show / Hide World Chat"),
						reloadWorldChat: new RaidButton("reloadWC", "DC_LoaTS_reloadWCButton", DC_LoaTS_Helper.reload)
					};
					for (var buttonName in this.buttons)
					{
						this.container.insert({bottom: this.buttons[buttonName].node});
					}
					
					this.omniboxWrapper = new Element("li", {"class": "DC_LoaTS_omniboxWrapper"});
					
					this.omnibox = new Element("input", {type: "text", "class": "DC_LoaTS_omnibox", autocomplete: "off"});
					this.omniboxWrapper.insert({bottom: this.omnibox});
					this.omnibox.oldValue = "";
					
					this.omniboxCommandsWrapper = new Element("ul", {"class": "DC_LoaTS_omniboxCommandsWrapper"});
					this.omniboxCommandsWrapper.hide();
					
					this.omniboxWrapper.insert({bottom: this.omniboxCommandsWrapper});
					this.container.insert({bottom: this.omniboxWrapper});

					this.omnibox.observe("mouseover", function() {
						$(this).addClassName("DC_LoaTS_omnibox_focus");
					});
					
					this.omniboxWrapper.observe("mouseover", function() {
						$(this).addClassName("DC_LoaTS_omniboxWrapper_hover");
					});
					
					this.omnibox.observe("focus", function(event, raidToolbar) {
						$(this).addClassName("DC_LoaTS_omnibox_focus");
						if (this.value.length >= 3 && raidToolbar.omniboxCommandsWrapper.childElements().length > 0)
						{
							raidToolbar.omniboxCommandsWrapper.show();
						}
					}.bindAsEventListener(this.omnibox, this));
					
					this.omnibox.observe("mouseout", function() {
						if (this.value.length == 0 && this != document.activeElement)
						{
							$(this).removeClassName("DC_LoaTS_omnibox_focus");
						}
					});
					
					this.omniboxWrapper.observe("mouseout", function() {
						$(this).removeClassName("DC_LoaTS_omniboxWrapper_hover");
					});
					
					this.omnibox.observe("blur", function(event, raidToolbar) {
						if (this.value.length == 0 && this != document.activeElement)
						{
							$(this).removeClassName("DC_LoaTS_omnibox_focus");
						}
						
						if (!$(raidToolbar.omniboxWrapper).hasClassName("DC_LoaTS_omniboxWrapper_hover"))
						{
							raidToolbar.omniboxCommandsWrapper.hide();
						}
					}.bindAsEventListener(this.omnibox, this));
					
					this.omnibox.observe("input", function(event, raidToolbar) {
						if (this.oldValue != this.value)
						{
							// Stretch the bar as needed
							this.setAttribute("size", Math.min(Math.max(20, (93/80) * this.value.length), 120));
							this.oldValue = this.value;
							
							DCDebug("Text Changed");
							
							// Process the omnibox text
							raidToolbar.processOmniboxText(this.value);
						}
					}.bindAsEventListener(this.omnibox, this));
					
					//TODO: Rig up keys to control omnibox selection
					this.omnibox.observe("keydown", function(event) {
						// Up arrow
						if (event.keyCode == 38)
						{
							DCDebug("Pressed up")
						}
						// Down arrow
						else if (event.keyCode == 40)
						{
							DCDebug("Pressed down")							
						}
						// Left arrow
						else if (event.keyCode == 41)
						{
							DCDebug("Pressed left")							
						}
						// Right arrow
						else if (event.keyCode == 39)
						{
							DCDebug("Pressed right")							
						}
						// Enter
						else if (event.keyCode == 13)
						{
							DCDebug("Pressed Enter")							
						}
					});
					
					RaidToolbar.createWRButton();
					
				}
				// Else if it does exist, grab the hooks
				//TODO
			},
			
			// Process omnibox text
			processOmniboxText: function(text)
			{
				var matchedCommands = [];
				
				// Clean up whitespace
				text = text.trim();
				
				// We really need at least 3 characters to make sense of the user's input
				if (text.length >= 3)
				{
					// Run through all of the text processors
					var raidLink = new RaidLink(text);
					var raidFilter = new RaidFilter(text);
					
					// If this is a valid link
					if (raidLink.isValid())
					{
						try
						{
							DCDebug("Link refers to: " + raidLink.getSimpleText() + "First seen: " + "Last seen: ");
							
							DCDebug("Load: " + raidLink.getSimpleText());
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.loadraid("omnibox", raidLink.getURL()));
							DCDebug("Info: " + raidLink.getDifficultyText() + " " + raidLink.getName());
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.raid("omnibox", raidLink.getName() + " " + raidLink.difficulty));
							DCDebug("State: Forget/Remember, Un/Mark Visited");
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.linkstate("omnibox", raidLink.getURL()));
							
							DCDebug("Seen:  " + raidLink.getName() + " Any, Normal, Hard, Legendary, Nightmare");
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.seenraids("omnibox", raidLink.getName() + " " + raidLink.difficulty));
							DCDebug("Search: " + raidLink.getName() + " on ZoyWiki");
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.wiki("omnibox", raidLink.getName()));
						}
						catch(ex)
						{
							console.warn("Failure while creating options for omnibox");
							console.warn(raidLink);
							console.warn(ex);
						}
						
					}
					// If it's a valid filter and it's not empty
					else if (raidFilter.isValid() && !raidFilter.isEmpty())
					{
						var matchedTypes = DC_LoaTS_Helper.getRaidTypes(raidFilter);
						if (matchedTypes.length > 0)
						{
							// If it's simple and matches only 1 type, put raid info first
							var raidInfoFirst = matchedTypes == 1 && raidFilter.isSimple();
							if (raidInfoFirst)
							{
								if (typeof raidFilter.difficulty != "undefined")
								{
									DCDebug("Raid info for " + raidFilter.getDifficultyText() + " " + matchedTypes[0].fullName);
								}
								else
								{
									DCDebug("Raid info for " + matchedTypes[0].fullName);
								}
								
								DCDebug("Look up " + matchedTypes[0].fullName + " on ZoyWiki");
							}
							
							DCDebug("Seen raids matching " + text);
							
							// If we didn't offer raid info first
							if (!raidInfoFirst)
							{
								DCDebug("Raid info for all matching raids");
								for (var i = 0; i < matchedTypes.length; i++)
								{
									if (typeof raidFilter.difficulty != "undefined")
									{
										DCDebug("Raid info for " + raidFilter.getDifficultyText() + " " + matchedTypes[i].fullName);
									}
									else
									{
										DCDebug("Raid info for " + matchedTypes[i].fullName);
									}
								}
							}
						}
					}

					// Simple commands
					if (text.toLowerCase().indexOf("lsi") == 0)
					{
						DCDebug("Calculate lsi");
					}
					else if (text.toLowerCase().indexOf("bsi") == 0)
					{
						DCDebug("Calculate bsi");
					}
					else if (text.toLowerCase().indexOf("help") == 0)
					{
						DCDebug("Get help?");
					}

					if (matchedCommands.length == 0)
					{
						try
						{
							// Attempt to match the text to a known command
							for (var commandName in DC_LoaTS_Helper.chatCommands)
							{
								// Going to add a wiki command no matter what
								if (commandName.toLowerCase() == DC_LoaTS_Helper.chatCommands.wiki.commandName ||
									commandName.toLowerCase() == DC_LoaTS_Helper.chatCommands.forum.commandName)
								{
									continue;
								}
								
								// Check command
								if (text.toLowerCase().indexOf(commandName.toLowerCase()) == 0
									||
									text.toLowerCase().indexOf("/" + commandName.toLowerCase()) == 0
								)
								{
									matchedCommands.push(new DC_LoaTS_Helper.chatCommands[commandName]("omnibox", text));
								}
								// Check aliases of this command
								else
								{
									var command = DC_LoaTS_Helper.chatCommands[commandName];
									for (var i = 0; i < command.aliases.length; i++)
									{
										var alias = command.aliases[i];
										if (text.toLowerCase().indexOf(alias.toLowerCase()) == 0
											||
											text.toLowerCase().indexOf("/" + alias.toLowerCase()) == 0
										)
										{
											matchedCommands.push(new DC_LoaTS_Helper.chatCommands[commandName]("omnibox", text));
										}
									}
								}
							}
							
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.wiki("omnibox", text));
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.forum("omnibox", text));
						}
						catch(ex)
						{
							console.warn("Failure while matching omnibox text (\"" + text + "\") to command.");
							console.warn(ex);
						}
					}
					
					// Clear out any old suggestions
					if (matchedCommands.length > 0 || this.omnibox.value.length < 3)
					{
						// Remove all existing options
						this.omniboxCommandsWrapper.childElements().invoke("remove");

						// Unhook the existing commands
						this.existingMatchedCommands.invoke("onRemovedFromOmnibox");
					}
					
					// Set the new commands we found to tbe ones we remember
					this.existingMatchedCommands = matchedCommands;
					
					// Put in the new suggestions, if any
					if (matchedCommands.length > 0)
					{						
						for (var i = 0; i < matchedCommands.length; i++)
						{
							var command = matchedCommands[i];
							DCDebug(command.commandName);
//							var option = new Element("li", {"class": "omniboxCommandOption"});
//							var anchor = new Element("a", {"href": "#"});
//							anchor.onclick = function(){alert(this.innerHTML); return false;};
//							anchor.update(command.commandName);
//							
//							option.insert({bottom: anchor});
//							this.omniboxCommandsWrapper.insert({bottom: option});

							this.omniboxCommandsWrapper.insert({bottom: command.getOptionLine()});
						}
						
						this.omniboxCommandsWrapper.show();
					}
				}
				else
				{
					this.omniboxCommandsWrapper.hide();
				}
			},
			
			toggle: function()
			{
				this.container.toggle();
			},

			show: function()
			{
				this.container.show();
			},

			hide: function()
			{
				this.container.hide();
			}
		});
		
		// Toggle the visibility of the raid toolbar
		RaidToolbar.toggle = function()
		{
			// Locate or create a raid toolbar
			var raidToolbar = window.raidToolbar;
			if (typeof raidToolbar == "undefined")
			{
				raidToolbar = new RaidToolbar();
				window.raidToolbar = raidToolbar;
			}
			
			// Toggle its visibility
			raidToolbar.toggle();
		};
		
		// Show the raid toolbar
		RaidToolbar.show = function()
		{
			// Locate or create a raid toolbar
			var raidToolbar = window.raidToolbar;
			if (typeof raidToolbar == "undefined")
			{
				raidToolbar = new RaidToolbar();
				window.raidToolbar = raidToolbar;
			}
			
			// Toggle its visibility
			raidToolbar.show();
		};
		
		// Hide the raid toolbar
		RaidToolbar.hide = function()
		{
			// Locate or create a raid toolbar
			var raidToolbar = window.raidtoolbar;
			if (typeof raidToolbar != "undefined")
			{
				// Hide the toolbar
				raidToolbar.hide();
			}
		};
		
		// Hide the command options
		RaidToolbar.hideCommandOptions = function()
		{
			$$(".DC_LoaTS_omniboxCommandsWrapper")[0].hide();
		}
		
		// Hide the command options
		RaidToolbar.resetOmnibox = function()
		{
			$$(".DC_LoaTS_omnibox")[0].value = "";
			$$(".DC_LoaTS_omnibox")[0].focus();			
		}
		
		RaidToolbar.createWRButton = function() {
			var wr = DC_LoaTS_Helper.worldRaidInfo;
			if (!DC_LoaTS_Helper.wrButton && typeof wr === "object" && (!wr.timerEnds || new Date(wr.timerEnds) > new Date())) {
				// Locate or create a raid toolbar
				var raidToolbar = window.raidToolbar;
				if (typeof raidToolbar == "undefined")
				{
					raidToolbar = new RaidToolbar();
					window.raidToolbar = raidToolbar;
				}
				
				DC_LoaTS_Helper.wrButton = new RaidButton(DC_LoaTS_Helper.worldRaidInfo.name + " Info", "DC_LoaTS_WRButton", DC_LoaTS_Helper.showWRInfo);
				raidToolbar.container.insert({bottom: DC_LoaTS_Helper.wrButton.node});
			}
		}
