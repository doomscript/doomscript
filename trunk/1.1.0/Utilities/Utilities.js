		/************************************/
		/********* Utility Functions ********/
		/************************************/
		
		// Hooks up a listener for a particular event on a specific object
		// Borrowed from: http://www.quirksmode.org/js/eventSimple.html
		DC_LoaTS_Helper.registerEventHandler = function(obj,evt,fn)
		{
			if (obj.addEventListener)
			{
				obj.addEventListener(evt,fn,false);
			}
			else if (obj.attachEvent)
			{
				obj.attachEvent('on'+evt,fn);
			}
		};

		// Unhooks a listener for a particular event on a specific object
		// Borrowed from: http://www.quirksmode.org/js/eventSimple.html
		DC_LoaTS_Helper.unregisterEventHandler = function(obj,evt,fn)
		{
			if (obj.removeEventListener)
			{
				obj.removeEventListener(evt,fn,false);
			}
			else if (obj.detachEvent)
			{
				obj.detachEvent('on'+evt,fn);
			}
		};
		
		// Should prevent the event from doing its normal action
		// like selecting text on click and drag.
		// Borrowed from http://stackoverflow.com/a/891616
		DC_LoaTS_Helper.stopDefaultEventAction = function(evt)
		{
		    if (evt && evt.preventDefault)
		    {
		        evt.preventDefault();
		    }
		    else
		    {
		        window.event.returnValue = false;
		    }
		    return false;
		};

		
		// Pretty format health / damage numbers
		DC_LoaTS_Helper.prettyFormatNumber = function(num)
		{
			var text = "Unknown";
			if (typeof num == "number")
			{
				// Trillions
				if (num >= 1000000000000)
				{
					text = parseFloat((num/1000000000000).toFixed(3)) + "T";
				}
				// Billions
				else if (num >= 1000000000)
				{
					text = parseFloat((num/1000000000).toFixed(2)) + "B";
				}
				// Millions
				else if (num >= 1000000)
				{
					text = parseFloat((num/1000000).toFixed(2)) + "M";
				}
				// Thousands
				else if (num >= 1000)
				{
					text = parseFloat((num/1000).toFixed(1)) + "K";
				}
				// Other
				else if (num > 0)
				{
					text = num + "";
				}
				else
				{
					console.warn("Cannot pretty format number: " + num);
				}
			}
			else if (typeof num == "string")
			{
				text = num;				
			}
			else
			{
				console.warn("Cannot pretty format text \"" + num + "\" as a number");
			}
			return text;
		};
		
		// Responds to a click on a raid link
		// Returns true if the browser should load the raid itself, false if we loaded without refresh
		DC_LoaTS_Helper.raidLinkClick = function(eventParam)
		{
			// Want to handle any errors that occur in here
			try
			{
				// Just in case
				var event = eventParam || window.event;
				
				// Couldn't locate event
				if (typeof event == "undefined")
				{
					console.warn("Couldn't locate the event for right-click detection");
					
					// Don't cancel the click
					return;
				}
				
				// Get the target element
				var target;			
				if (event.target) 
				{
					target = event.target;
				}
				else if (event.srcElement)
				{
					target = event.srcElement;
				}
				
				// Safari work around
				if (target.nodeType == 3)
				{
					target = target.parentNode;
				}

				
				if (typeof target == "undefined")
				{
					console.warn("Couldn't locate the target for right-click detection");
					
					// Don't cancel the click
					return;
				}
				
				// Grab the url from the link
				var url = target.href;
							
				// Still failed
				if (typeof url == "undefined" || url.length == 0)
				{
					// In certain cases, the image can detect the click instead of the link
					if (target.parentNode.href != "undefined")
					{
						url = target.parentNode.href;
					}
					else
					{
						console.warn("Trouble determining url from link. Could not apply click.");
						console.warn(event);
						console.warn(target);
						
						// Let the click go through and reload the whole browser. Better than nothing.
						return true;
					}
				}
				
				// If the user is holding shift, cycle through the states
				if (event.shiftKey)
				{
					// Generate an actual raid link object
					var raidLink = new RaidLink(url);
					
					// If the link is valid
					if (raidLink.isValid())
					{
						// Get the STATE of the link
						var linkState = RaidManager.fetchState(raidLink);
						
						// Place holder for our new state
						var newLinkState;
						
						var foundCurrent = false;
						var firstState;
						
						// Iterate over all possible states
						// This is basically a hack for the fact that the 
						// STATEs don't have any inherit ordinal values that could be incremented
						//TODO: Reorganize STATE to have ordinals if this ever happens somewhere else in the code
						for (var stateKey in RaidManager.STATE)
						{
							// Grab the state
							var state = RaidManager.STATE[stateKey];
							
							// Make sure this isn't a function or anything from STATE
							if (typeof state == "object")
							{
								// If this is the first state we've seen
								if (typeof firstState == "undefined")
								{
									// Capture it so we can roll back around past the last state
									firstState = state;
								}
							
								// If this is the same state as the link is currently in
								if (RaidManager.STATE.equals(linkState, state))
								{
									// Note the current state
									foundCurrent = true;
								}
								// If we found current, this must be the next state
								else if (foundCurrent)
								{
									// Grab this state to save as the new state
									newLinkState = state;
									
									// Don't accidentally find other states
									break;
								}
							}
						}
						
						// If we did not find a new state to set it to
						if (typeof newLinkState == "undefined")
						{
							// Cycle back around to the first state
							newLinkState = firstState;
						}
						
						// Store the link with its new state
						RaidManager.store(raidLink, newLinkState);					
					}
					// Log invalid raid links
					else
					{
						console.warn("Clicked invalid link to " + url);
					}
					
					// Always suppress reload on shift-clicks
					return false;
				}
				// If the user is not holding shift, just load the raid
				else
				{
					return DC_LoaTS_Helper.loadRaid(url);
				}
			}
			catch(ex)
			{
				// Notify the user of the issue
				console.warn("An error occurred while trying to handle your click!");
				
				console.warn(ex);
				
				// Let the click go through. Annoying, but still can load raid
				return true;
			}
		};
		
		// Intended solely to capture right clicks for the purpose of marking them visited
		DC_LoaTS_Helper.raidLinkMouseDown = function(eventParam)
		{
			// Just in case
			var event = eventParam || window.event;
			
			// Couldn't locate event
			if (typeof event == "undefined")
			{
				console.warn("Couldn't locate the event for right-click detection");
				
				// Don't cancel the click
				return;
			}
			
			// Detect right click
			var rightclick;
			if (event.which)
			{
				rightclick = (event.which == 3);
			}
			else if (event.button)
			{
				rightclick = (event.button == 2);
			}
			
			// Only care about right clicks
			if (rightclick)
			{
				// Get the target element
				var target;			
				if (event.target) 
				{
					target = event.target;
				}
				else if (event.srcElement)
				{
					target = event.srcElement;
				}
				
				// Safari work around
				if (target.nodeType == 3)
				{
					target = target.parentNode;
				}

				// If there was no target
				if (typeof target == "undefined")
				{
					console.warn("Couldn't locate the target for right-click detection");
					
					// Don't cancel the click
					return;
				}
				
				// Grab the url from the link
				var url = target.href;
							
				// Still failed
				if (typeof url == "undefined" || url.length == 0)
				{
					// In certain cases, the image can detect the click instead of the link
					if (target.parentNode.href != "undefined")
					{
						url = target.parentNode.href;
					}
					else
					{
						console.warn("Trouble determining url from link. Could not apply click.");
						console.warn(event);
						console.warn(target);
						
						// No useful work to complete here
						return;
					}
				}
				// Successfully got the url
				// Get the raid link
				var raidLink = new RaidLink(url);
				
				// Only care about valid links
				if (raidLink.isValid())
				{
					if (DC_LoaTS_Helper.getPref("RightClickVisited") === true)
					{
						RaidManager.store(raidLink, RaidManager.STATE.VISITED);
					}
				}
				else
				{
					console.warn("Could not parse url (\"" + url + "\") into a valid RaidLink");
					console.warn(raidLink);
				}
			}
			

		};
		
		// Force the download of some data as a file
		// Works nice on some browsers
		// Title parameter only works in some browsers as well.
		DC_LoaTS_Helper.forceDownload = function(data, title)
		{
			// Awesome style
//			if (window.webkitRequestFileSystem)
//			{
//				window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
//	        		fs.root.getFile(title, {create: true}, function(fileEntry) {
//	            		fileEntry.createWriter(function(fileWriter) {
//			                var builder = new WebKitBlobBuilder();
//			                builder.append(data);
//			                var blob = builder.getBlob();
//			    
//			                fileWriter.onwriteend = function() {
//			                    // navigate to file, will download
//			                    location.href = fileEntry.toURL();
//			                };
//			    
//			                fileWriter.write(blob);
//			            }, function() {});
//			        }, function() {});
//			    }, function() {});​
//			}
			// Sad style
//			else
//			{
		    	window.location='data:text/csv;charset=utf8,' + encodeURIComponent(data);
//			}
		    return true; 
		}
		
		// Load raid without refreshing page
		// Returns true if the browser should load the raid itself, false if we loaded without refresh
		DC_LoaTS_Helper.loadRaid = function(raidParam)
		{
			// If we're not actually on LoaTS right now, we have to actually go to the link
			// UPDATE: Script doesn't even load on non LoaTS pages now anyway
			// if (window.location.href.indexOf("http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns") != 0)
			// {
				// // Will let the browser actually alter the location of the page
				// return true;
			// }
			
			
			try
			{
				// Regex to locate the iframe properties as defined by Kong
				var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
				
				// If Kong has defined the properties we need to scrape from			
				if (typeof activateGame !== "undefined")
				{
					// Attempt to find the properties we need
					var match = reg.exec(activateGame); 
					
					// If we have the iframe options
					if (match != null)
					{
						var raidLink;
						if (typeof raidParam === "string")
						{
							// Create a raid link from the url
							var raidLink = new RaidLink(raidParam);
						}
						else if (typeof raidParam.isValid === "function")
						{
							// Passed in value must've been a link
							raidLink = raidParam;
						}
						
						// If the link is valid
						if (typeof raidLink !== "undefined" && raidLink.isValid())
						{
							// Mark link as visited
							RaidManager.store(raidLink, RaidManager.STATE.VISITED);
							
							// Parse the existing iframe options
							var iframe_options = eval('('+match[1]+')');
							
							// Override properties that we're going to change
							iframe_options['kv_action_type'] = 'raidhelp';
							iframe_options['kv_difficulty'] = raidLink.difficulty;
							iframe_options['kv_hash'] = raidLink.hash;
							iframe_options['kv_raid_boss'] = raidLink.raidTypeId;
							iframe_options['kv_raid_id'] = raidLink.id;
							
							// Destroy the old iframe and replace with blank one
							$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
							
							// Set location of new game window
							$('gameiframe').contentWindow.location.replace("http://web1.legacyofathousandsuns.com/kong?" + Object.toQueryString(iframe_options));
						}
						else
						{
							// Notify the user that we don't know what that state is
							holodeck.activeDialogue().raidBotMessage("Could not parse <code>" + raidParam + "</code> as a raid link url.");
						}
						// Don't follow the HTML link because we succeeded here
						return false;
					}
				}
			}
			catch(ex)
			{
				// Don't really care
				console.error("FAILED TO PROCESS LOADRAID");
				console.error(raidParam);
				console.error(ex);
			}
			
			// Follow the HTML link because we failed here
			return true;
		};
		
		DC_LoaTS_Helper.reload = function()
		{
			// Whether or not we managed to reload
			var didReload = false;
			
			// Try to reload the game
			if (typeof activateGame  != "undefined")
			{
				holodeck.activeDialogue().raidBotMessage("Reloading game, please wait...");
				activateGame();
				didReload = true;
			}
			// Could not find necessary info to reload game
			else
			{
				holodeck.activeDialogue().raidBotMessage("Unable to reload game");
			}
			
			// Return whether or not we were successful
			return didReload;
		};
		
		// Update links that are already in chat
		DC_LoaTS_Helper.updatePostedLinks = function(raidLink)
		{
			if (typeof DC_LoaTS_Helper.updatePostedLinksTimeout !== "undefined")
			{
				clearTimeout(DC_LoaTS_Helper.updatePostedLinksTimeout);
			}
			
			// Set a timeout to go and update the links in chat
			DC_LoaTS_Helper.updatePostedLinksTimeout = setTimeout( function(raidLink)
			{
				Timer.start("updatePostedLinksTimeout");
				try 
				{
					// Look up all raid links in chat
					var elems = $("chat_window").getElementsByClassName("raidMessage");
					
					// Retrieve the message format
					var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
					// Retrieve the link format
					var linkFormat = DC_LoaTS_Helper.getLinkFormat();
					
					// Iterate over all link elements in the chat
					for (var i = 0; i < elems.length; i++)
					{
						// Convert them to RaidLink objects
						var elem = elems[i];
						var newRaidLink = new RaidLink(elem.children[0].href);
						
						// If we're looking for a specific link, make sure to match it. Otherwise, do them all
						if (newRaidLink.isValid() &&  (typeof raidLink === "undefined" || raidLink.getUniqueKey() == newRaidLink.getUniqueKey()))
						{
							elem.insert({after: newRaidLink.getFormattedRaidLink(messageFormat, linkFormat)});
							elem.remove();
							
							// Restyle the message as appropriate
							var styles = newRaidLink.getMatchedStyles();
							if (typeof styles.messageStyle !== "undefined")
							{
								elem.setAttribute("style", styles.messageStyle);
								elem.cssText = styles.messageStyle;
							}
						}
						else if (!newRaidLink.isValid())
						{
							console.warn("Element did not produce a valid raid link:");
							console.warn(elem);
						}
						else if (/*newRaidLink.getRaid().id == raidLink.getRaid().id ||*/ newRaidLink.hash == raidLink.hash || raidLink.id == newRaidLink.id)
						{
							DCDebug("Similar links found while updating posted links, but not similar enough?");
							DCDebug(raidLink);
							DCDebug(newRaidLink);
						}
					}
					
					delete DC_LoaTS_Helper.updatePostedLinksTimeout;
				}
				catch (e)
				{
					console.warn(e);
				}
				Timer.stop("updatePostedLinksTimeout");
			}.bind(window, raidLink), 500);
		};
		
		// Check for updates
		DC_LoaTS_Helper.checkForUpdates = function()
		{
			var elems = $("chat_window").getElementsByClassName("DC_LoaTS_updateNotRun");
			
			for (var i = 0; i < elems.length; i++)
			{
				var elem = elems[i];
				elem.innerHTML = "Checking...<span class='spinner'>loading</span>";
				elem.removeClassName("DC_LoaTS_updateNotRun");
				elem.removeClassName("DC_LoaTS_checkingForUpdate");
			}
			
			new Ajax.Request(DC_LoaTS_Properties.updateURL,
				{
					method: 'get',
					onSuccess: function(transport)
					{
						// How to find the version number of the script 
						var versionPattern = /Current LoaTS Helper Version: ([\d\.]+)/i;
						
						var match = versionPattern.exec(transport.responseText);
						
						var resultText = DC_LoaTS_Properties.version + ". This is the latest version.";
						var resultState = "current";
						
						if (match != null)
						{
							var currentVersion = match[1].trim();
							var currentVersionPieces = currentVersion.split("\.");
							var thisVersionPieces = DC_LoaTS_Properties.version.split("\.");
							
							if (currentVersion != DC_LoaTS_Properties.version)
							{
								var i = 0;
								while (i < 5)
								{
									// If both version numbers are long enough to even check
									if (currentVersionPieces.length > i && thisVersionPieces.length > i )
									{
										// If we are behind on version
										if (parseInt(currentVersionPieces[i]) > parseInt(thisVersionPieces[i]))
										{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. An update is available.";
											resultState = "old";
											break;
										}
										// If we are ahead on version
										else if (parseInt(currentVersionPieces[i]) < parseInt(thisVersionPieces[i]))
										{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. You are ahead of the public version.";
											resultState = "new";
											break;
										}
									}
									else if (currentVersionPieces.length > thisVersionPieces.length)
									{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. An update is available.";
											resultState = "old";
											break;
									}
									else if (currentVersionPieces.length < thisVersionPieces.length)
									{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. You are ahead of the public version.";
											resultState = "new";
											break;
									}
									else
									{
										resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> You are up to date.";
										resultState = "current";
										break;
									}

									// Must not have found anything interesting. Try the next digit.
									i++;
								}
							}
						}
						else
						{
							resultText = "Unable to locate current version number.";
							resultState = "fail";
						}
						
						DC_LoaTS_Helper.notifyUpdate(resultState, resultText);
					},
					
					onFailure: function(transport)
					{
						DC_LoaTS_Helper.notifyUpdate("fail", "Unable to contact update site.");
					}
				}
			);
		};
		
		// Notify the user if there's an update
		DC_LoaTS_Helper.notifyUpdate = function(state, text)
		{
			DC_LoaTS_Helper.needUpdateState = state;
			DC_LoaTS_Helper.needUpdateText = text;
			
			
			var newHTML = "";
			
			// If it's time to update
			if (DC_LoaTS_Helper.needUpdateState == "old")
			{
				newHTML += DC_LoaTS_Helper.needUpdateText + "<br>";
				newHTML += "<br>\n";
				newHTML += "<br>\n";
				newHTML += "<span class='clearfix'>";
				newHTML += "<span style='float:left; padding-top: 5px;'>Update now?</span>";
				newHTML += "<span style='float:right;'><a class='DC_LoaTS_updateLink' href='http://userscripts.org/scripts/source/124753.user.js' target='_blank'>Update</a></span>";
				newHTML += "<br><br>\n";
			}
			// If the user has a newer than public version
			else if (DC_LoaTS_Helper.needUpdateState == "new")
			{
				newHTML += DC_LoaTS_Helper.needUpdateText + "<br>";
				newHTML += "<br>";
			}
			// Either current or some kind of failure
			else
			{
				newHTML += "<b>Version</b>: " + (DC_LoaTS_Helper.needUpdateState=="fail"?DC_LoaTS_Properties.version:"") + " " + DC_LoaTS_Helper.needUpdateText + "<br>\n";
				newHTML += "<br>\n";
				newHTML += "<br>\n";
				newHTML += "<span class='clearfix'>";
				newHTML += "<span style='float:left; padding-top: 5px;'>Check for updates?</span>";
				newHTML += "<span style='float:right;'><a class='DC_LoaTS_updateLink DC_LoaTS_updateNotRun' onclick='DC_LoaTS_Helper.checkForUpdates(); return false;' href='#' target='_blank'>Check now</a></span>";
				newHTML += "<br><br>\n";
			}
			
			
			var elems = $("chat_window").getElementsByClassName("DC_LoaTS_versionWrapper");
			
			for (var i = 0; i < elems.length; i++)
			{
				var elem = elems[i];
				elem.innerHTML = newHTML;
			}

			if (state == "old")
			{
				var updateNotificationDiv = document.getElementById("DC_LoaTS_notifitcationBar");
				
				if (!updateNotificationDiv)
				{
					updateNotificationDiv = document.createElement("div");
					updateNotificationDiv.id = "DC_LoaTS_notifitcationBar";
					updateNotificationDiv.className = "clearfix";
					$(updateNotificationDiv).hide();
					
					var updateTitle = document.createElement("div");
					updateTitle.appendChild(document.createTextNode("LoaTS Helper - "));
					updateTitle.id = "DC_LoaTS_notifitcationBarTitle";
					updateNotificationDiv.appendChild(updateTitle);
					
					var updateTextDiv = document.createElement("div");
					updateTextDiv.id = "DC_LoaTS_notifitcationBarText";
					updateNotificationDiv.appendChild(updateTextDiv);
					
					var updateButtonsDiv = document.createElement("div");
					updateButtonsDiv.id = "DC_LoaTS_notifitcationBarButtons";
					updateNotificationDiv.appendChild(updateButtonsDiv);
					
					var updateButton = document.createElement("a");
					updateButton.className = "DC_LoaTS_updateLink";
					updateButton.href = "http://userscripts.org/scripts/source/124753.user.js";
					updateButton.appendChild(document.createTextNode("Update"));
					updateButton.target = "_blank";
					updateButton.onclick = function()
					{
						if ($("DC_LoaTS_notifitcationBar"))
						{
							$("DC_LoaTS_notifitcationBar").hide();
						}
						
						return true;
					};
					updateButtonsDiv.appendChild(updateButton);
					
					var remindButton = document.createElement("a");
					remindButton.className = "DC_LoaTS_notifitcationBarButton";
					remindButton.href = "#";
					remindButton.appendChild(document.createTextNode("Remind me later"));
					remindButton.onclick = function()
					{
						if ($("DC_LoaTS_notifitcationBar"))
						{
							$("DC_LoaTS_notifitcationBar").hide();
						}
						
						return false;
					};
					updateButtonsDiv.appendChild(remindButton);

					var canAutoUpdate = GM_getValue(DC_LoaTS_Properties.storage.autoUpdate, true);

					if (typeof canAutoUpdate != "undefined" && canAutoUpdate)
					{
						var ignoreButton = document.createElement("a");
						ignoreButton.className = "DC_LoaTS_notifitcationBarButton";
						ignoreButton.href = "#";
						ignoreButton.appendChild(document.createTextNode("Turn auto update check off"));
						ignoreButton.onclick = function()
						{
							if ($("DC_LoaTS_notifitcationBar"))
							{
								$("DC_LoaTS_notifitcationBar").hide();
							}
							
							GM_setValue(DC_LoaTS_Properties.storage.autoUpdate, false);
							
							return false;
						};
						updateButtonsDiv.appendChild(ignoreButton);
					}
					
					
					document.body.appendChild(updateNotificationDiv);
				}
				$(updateNotificationDiv).down("#DC_LoaTS_notifitcationBarText").update(text);
				$(updateNotificationDiv).show();
			}
		};
		
		DC_LoaTS_Helper.getCommandLink = function(commandText, displayText)
		{
			if (typeof displayText == "undefined"){displayText = commandText};
			return "<a href=\"#\" class=\"chatCommandLink\" onclick=\"holodeck.processChatCommand('" + commandText + "'); return false;\">" + displayText + "</a>";
		};
		
		// Debug log wrapping function
		// Special scope debugging for just this script
		window.DCDebug = function()
		{
			if (DC_LoaTS_Properties.debugMode === true)
			{
				console.log.apply(console, arguments);
			}
		}
		
		// Borrowed from: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
		String.prototype.format = function()
		{
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number)
			{ 
				return typeof args[number] != 'undefined'?args[number]:match;
			});
		};
