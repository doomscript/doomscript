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
			var text = "?";
			if (typeof num === "number")
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
			}
			else if (typeof num === "string")
			{
				text = num;				
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
//			// Awesome style
//			window.requestFileSystem = window.webkitRequestFileSystem || window.requestFileSystem;
//			if (window.requestFileSystem)
//			{
//				
//				function onInitFs(fs) {
//
//					fs.root.getFile(title + '.txt', {create: true}, function(fileEntry) {
//				
//						fileEntry.createWriter(function(fileWriter) {
//						
//							fileWriter.onwriteend = function(e) {
////								if (typeof fileEntry.toURI === "function") {
////									location.href = fileEntry.toURI();
////								}
////								else {
//									window.open(fileEntry.toURL());
////								}
//								holodeck.activeDialogue().raidBotMessage('Finished writing ' + title);
//							};
//							
//							fileWriter.onerror = function(e) {
//								holodeck.activeDialogue().raidBotMessage('Write of ' + title + ' failed: ' + e.toString());
//							};
//							
//							// Create a new Blob and write it
//							var blob = new Blob([data], {type: 'text/plain'});
//							
//							console.log("Writing ", data, blob);
//							
//							fileWriter.write(blob);
//						
//						}, errorHandler);
//					
//					}, errorHandler);
//				
//				}
//				
//				function errorHandler(e) {
//					var msg = '';
//					
//					switch (e.code) {
//						case FileError.QUOTA_EXCEEDED_ERR:
//							msg = 'QUOTA_EXCEEDED_ERR';
//							break;
//						case FileError.NOT_FOUND_ERR:
//							msg = 'NOT_FOUND_ERR';
//							break;
//						case FileError.SECURITY_ERR:
//							msg = 'SECURITY_ERR';
//							break;
//						case FileError.INVALID_MODIFICATION_ERR:
//							msg = 'INVALID_MODIFICATION_ERR';
//							break;
//						case FileError.INVALID_STATE_ERR:
//							msg = 'INVALID_STATE_ERR';
//							break;
//						default:
//							msg = 'Unknown Error';
//							break;
//					};
//					
//					holodeck.activeDialogue().raidBotMessage('Write of ' + title + ' failed: ' + msg);
//				}
//
//				
//				window.requestFileSystem(window.TEMPORARY, 8*data.length, onInitFs, errorHandler);
//
//				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
//				 window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
//				    fs.root.getFile(title + '.txt', {create: true}, function(fileEntry) {
//				        fileEntry.createWriter(function(fileWriter) {
////				            var arr = new Uint8Array(3); // data length
////				
////				            arr[0] = 97; // byte data; these are codes for 'abc'
////				            arr[1] = 98;
////				            arr[2] = 99;
////				
////				            var blob = new Blob([arr]);
////				
////				            fileWriter.addEventListener("writeend", function() {
////				                // navigate to file, will download
////				                location.href = fileEntry.toURL();
////				            }, false);
//				
//				            fileWriter.write(data);
//				        }, function() {});
//				    }, function() {});
//				}, function() {});
//			}
			// Sad style
//			else
//			{
		    	window.open('data:text/csv;charset=utf8,' + encodeURIComponent(data));
//			}
		    return true; 
		};
		
		// Pastebin API
		DC_LoaTS_Helper.PastebinAPI = {
				privacy: {
					PUBLIC: 0,
					UNLISTED: 1,
					PRIVATE: 2
				},

				duration: {
					MINUTES: "10M",
					HOUR: "1H",
					DAY: "1D",
					MONTH: "1M",
					NEVER: "N"
				},
				
				options: {
					PASTE: "paste",
					LIST: "list",
					TRENDS: "trends",
					DELETE: "delete",
					USER_DETAILS: "userdetails"
					
				},

				pasteData: function(data, title, note) {

					var paste = {
							api_option: this.options.PASTE,
							api_dev_key_enc: ":117ce9e35bfgec11f1336f96916c4d1",
							api_paste_code: data,
							api_paste_private: this.privacy.UNLISTED, 
							api_paste_name: title,
							api_paste_expire_date: this.duration.MONTH
					};


					DC_LoaTS_Helper.ajax({
						url: "http://pastebin.com/api/api_post.php",
						method: "POST",
						data: DC_LoaTS_Helper.uriSerialize(paste),
						onload: function(response) {
							var message;
							if (response.status == 200 && /^(?:http:\/\/)?(?:www\.)?pastebin.com\/\w+$/i.test(response.responseText)) {
								message = "Successfully created pastebin <a href='" + response.responseText + "' target='_blank'>" + response.responseText + "</a> for " + note;
								window.open(response.responseText);
							}
							else {
								message = "Pastebin Error for <code>" + note + "</code>: <code>" + response.responseText + "</code>";
							}

							holodeck.activeDialogue().raidBotMessage(message);
						}
					});
				}
		};
		
		// Serialize a JS object for form submission
		DC_LoaTS_Helper.uriSerialize = function(obj) {
            var ret = [];
            for (var field in obj) {
                if (obj.hasOwnProperty(field)) {
                    var value = obj[field];
                    if (typeof value !== "function" && obj.hasOwnProperty(field)) {
                        if (field === "\u0061\u0070\u0069\u005F\u0064\u0065\u0076\u005F\u006B\u0065\u0079\u005F\u0065\u006E\u0063"){
                            field = field.substring(0, field.length-4);
                            value = (function () {
                                var m = "";
                                for (var i = 0; i < value.length; i++) {
                                    m += (!(value.charCodeAt(i) - 28)) ? '&' : (!(value.charCodeAt(i) - 23)) ? '!' : String.fromCharCode(value.charCodeAt(i) - 1)
                                }
                                return m;
                            }());
                        }
                        ret.push(encodeURIComponent(field) + "=" + encodeURIComponent(value));
                    }
                }
            }
			
			return ret.join("&");
		};
		
		
        // Obtains the iframe_options from the game page
        DC_LoaTS_Helper.getIFrameOptions = function() {
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
                        // Parse and return the existing iframe options
                        return eval('('+match[1]+')');
                        
                    }
                }
            }
            catch (ex) {
                console.error("Failed to parse iframe_options.", ex);
                return {};
            }
        };
        
        
        // Obtains the GameIframe from the game page
        DC_LoaTS_Helper.getGameIframe = function() {
            try
            {
                // Regex to locate the iframe properties as defined by Kong
                var reg = new RegExp(/(new GameIframe\(.*?\)).createGameIframeElement\(\);/g);
                
                // If Kong has defined the properties we need to scrape from            
                if (typeof activateGame !== "undefined")
                {
                    // Attempt to find the properties we need
                    var match = reg.exec(activateGame); 
                    
                    // If we have the iframe options
                    if (match != null)
                    {
                        // Needed for the creation of GameIframe
                        var urlOptions = '';
                        
                        // Parse and return the existing iframe options
                        return eval(match[1]);
                    }
                }
            }
            catch (ex) {
                console.error("Failed to parse GameIframe.", ex);
                return {};
            }
        };
        
        
		
		// Load raid without refreshing page
		// Returns true if the browser should load the raid itself, false if we loaded without refresh
		// callback should be a function that takes two parameters, oldState and newState
		DC_LoaTS_Helper.loadRaid = function(raidParam, gameIframe, loadRaidsInBackground, callback)
		{
			var start = new Date()/1;
			
			// Gather the info we need to load a raid, either from params or utility methods
			gameIframe = gameIframe || DC_LoaTS_Helper.getGameIframe();
			loadRaidsInBackground = typeof loadRaidsInBackground !== "undefined"? loadRaidsInBackground : DC_LoaTS_Helper.getPref("LoadRaidsInBackground", false);
			
			try
			{
				var raidLink;
				if (typeof raidParam.isValid === "function")
				{
					// Param was a RaidLink
					raidLink = raidParam;
				}
				else if (typeof raidParam === "string")
				{
					// Create a raid link from the url
					raidLink = new RaidLink(raidParam);
				}
				
				// If the link is valid
				if (typeof raidLink !== "undefined" && raidLink.isValid())
				{
					// Set necessary gameIframe options
				    gameIframe.urlOptions = raidLink;
				    var iframe_options = gameIframe.iframeOptions();
					
					if (loadRaidsInBackground)
					{
						var collapsedOptions = "";
						
						for (var option in iframe_options)
						{
							collapsedOptions += option + "=" + iframe_options[option] + "&";
						}
						
						DC_LoaTS_Helper.ajax({
											  url: DC_LoaTS_Properties.joinRaidURL + "?" + collapsedOptions,
											  method: "GET",
											  onload: DC_LoaTS_Helper.handleAjaxRaidReturn.bind(this, raidLink, callback, start)
						});
					}
					else	
					{
					    $("gameiframe").contentWindow.location.replace(gameIframe.getGameIframeUrl());
					    
						// Mark link as visited
						var currentState = RaidManager.fetchState(raidLink);
						var newState = currentState;
						if (RaidManager.STATE.equals(currentState, RaidManager.STATE.UNSEEN) || RaidManager.STATE.equals(currentState, RaidManager.STATE.SEEN)) {
							RaidManager.store(raidLink, RaidManager.STATE.VISITED);
							newState = RaidManager.STATE.VISITED;
						}

						if (typeof callback === "function") {
							callback.call(this, currentState, newState);
						}

						var time = new Date()/1 - start;
						Timer.addRun("Load Raid - Foreground", time);
					}
				}
				else
				{
					// Notify the user that we don't know what that state is
					holodeck.activeDialogue().raidBotMessage("Could not parse <code>" + raidParam + "</code> as a raid link url.");
				}

				// Don't follow the HTML link because we succeeded here
				return false;
			}
			catch(ex)
			{
				// Don't really care
				console.error("FAILED TO PROCESS LOADRAID", arguments, ex);
			}
						
			// Follow the HTML link because we failed here
			return true;
		};
		
		DC_LoaTS_Helper.handleAjaxRaidReturn = function(raidLink, callback, start, response)
		{
			var responseText = response.responseText;
			var raidJoinMessage = /<div style="position:absolute;left:375px;top:318px;width:180px;color:#FFFFFF;text-align:center;">\s*(.*?)\s*<\/div>/.exec(responseText)[1].trim();
			DCDebug("Ajax Raid Join: ", raidLink.raidTypeId + " (" + raidLink.id + ")", " Message: ", raidJoinMessage);
			
			// Get the current state of the raid form the cache
			var oldState = RaidManager.fetchState(raidLink)
			
			if (responseText.indexOf("You have successfully joined the raid!") >= 0)
			{
				// Joined
				RaidManager.store(raidLink, RaidManager.STATE.VISITED);
				if (typeof callback === "function") {
					callback.call(this, oldState, RaidManager.STATE.VISITED);
				}
			}
			else if (responseText.indexOf("You are already a member of this raid!") >= 0 || responseText.indexOf("You have successfully re-joined the raid!") >= 0)
			{
				// Already visited / rejoined
				RaidManager.store(raidLink, RaidManager.STATE.VISITED);
				if (typeof callback === "function") {
					callback.call(this, RaidManager.STATE.VISITED, RaidManager.STATE.VISITED);
				}
			}
			else if (responseText.indexOf("This raid is already completed!") >= 0)
			{
				// Raid is dead
				RaidManager.store(raidLink, RaidManager.STATE.COMPLETED);
				if (typeof callback === "function") {
					callback.call(this, oldState, RaidManager.STATE.COMPLETED);
				}
			}
			else
			{
				// Invalid response (bad hash, wrong alliance, or otherwise broken link)
				RaidManager.store(raidLink, RaidManager.STATE.IGNORED);
				if (typeof callback === "function") {
					callback.call(this, oldState, RaidManager.STATE.IGNORED);
				}
			}

			DC_LoaTS_Helper.updatePostedLinks(raidLink);

			var time = new Date()/1 - start;
			Timer.addRun("Load Raid - Background", time);
		};
		
		DC_LoaTS_Helper.fetchAndLoadRaids = function(urlParsingFilter) {
			
			if (typeof urlParsingFilter === "string") {
				urlParsingFilter = new UrlParsingFilter(urlParsingFilter);
			}
						
			// Cancel the previous timer, if there is one
			if (typeof DC_LoaTS_Helper.autoLoader !== "undefined" || urlParsingFilter.cancel)
			{
				// Clear out the raidLinks array from the previous one.
				// The timeout will detect that there are suddenly no more links
				// and acknowledge the error state and quit.
				if (DC_LoaTS_Helper.autoLoader && DC_LoaTS_Helper.autoLoader.raidLinks) {
					DC_LoaTS_Helper.autoLoader.raidLinks.length = 0;
				}
			}
			
			if (urlParsingFilter.cancel) {
				return;
			}
			
			// Ignore the tiny amount of time it takes to check for cancellation/ending
			var commandStartTime = new Date()/1;
			
			if (holodeck.activeDialogue())
			{
				holodeck.activeDialogue().raidBotMessage("Fetching raids from " + urlParsingFilter.getUrlLink() + ". Please wait...");
			}
			
			// Run the download
			DC_LoaTS_Helper.ajax({
				url: urlParsingFilter.getWorkingUrl(),
				onload: function(response) {
					
					//DCDebug("Got back external raid data", response);
					if (response.status === 200) // Must be OK because even other 200 codes won't have our data
					{
						var text = response.responseText,
							fetchedRaids = [],
						    binData = {},
						    match,
						    regex = new RegExp(RaidLink.linkPattern.source, "gi"), // Prevent weird JS regex caching/lastIndex issues
						    hasRaidFilter = typeof urlParsingFilter.raidFilter !== "undefined",
						    raidFilter = urlParsingFilter.raidFilter;
						
						// Safety catchall to prevent infinite matching
						// This also means the maximum number of raids that can be loaded like this is 10,000 which seems reasonable
						var xx = 10000;
						
						Timer.start("Parsing External Raids");
						while ((match = regex.exec(text)) && xx--)
						{
							var raidLink = new RaidLink(match[0]);
							//DCDebug("Found Link: " + raidLink);
							if (raidLink.isValid())
							{
								// Record all raids by boss and difficulty, so we can report them to the user
								var thisBin = binData[raidLink.getRaid().shortName];
								if (!thisBin){
									thisBin = {};
									binData[raidLink.getRaid().shortName] = thisBin;
								}
								var thisBinRaids = thisBin[raidLink.difficulty];
								if (!thisBinRaids){
									thisBinRaids = [];
									thisBin[raidLink.difficulty] = thisBinRaids;
								}
								thisBinRaids.push(raidLink);
								fetchedRaids.push(raidLink);
							}
						} // End while(regex)
						
						DCDebug("Bin Data from '" + urlParsingFilter.getWorkingUrl() + "': ", binData);
						
						// Store all the raids we grabbed
						RaidManager.storeBulk(fetchedRaids);
						Timer.stop("Parsing External Raids");
						
						// Report the fetched raids
						str = "Fetched " + fetchedRaids.length + " raids from " + urlParsingFilter.getUrlLink() + " in " + (new Date()/1 - commandStartTime) + "ms.";
						if (fetchedRaids.length > 0)
						{
							var binUUID = DC_LoaTS_Helper.generateUUID();
							var binBreakdown = "\n<a href='#' onclick='$(\"" + binUUID + "\").toggleClassName(\"hidden\"); return false;'>Toggle Results Data</a>";
							binBreakdown += "\n<span id='" + binUUID + "' class='hidden'>";
							binBreakdown += "\nTotal Raids: " + fetchedRaids.length;
							for (var shortName in binData) {
								for (var diff = 1; diff < 5; diff++) {
									var raids = binData[shortName][diff];
									if (raids && raids.length) {
										binBreakdown += "\n" + RaidType.shortDifficulty[diff] + " " + shortName + " - " + raids.length;
									}
								}
							}
							binBreakdown += "</span>";
							str += binBreakdown;
						}
						if (holodeck.activeDialogue())
						{
							holodeck.activeDialogue().raidBotMessage(str);
						}
						
						// Load all known raids that match the given filter
						holodeck.processChatCommand("/loadall" + (hasRaidFilter ? " " + raidFilter.toString() : ""));
						
					}
					else if (response.status === 404)
					{
						holodeck.activeDialogue().raidBotMessage("Could not locate a valid raid list at " + urlParsingFilter.getUrlLink());
					}
					else if (response.status >= 500 && response.status < 600)
					{
						holodeck.activeDialogue().raidBotMessage("Trouble trying to load " + urlParsingFilter.getUrlLink() 
						+ ".\n" + "Server gave status of <code>" + response.statusText +"(" + response.status + ")</code>.");
					}
					else 
					{
						holodeck.activeDialogue().raidBotMessage("Trouble loading " + urlParsingFilter.getUrlLink() 
						+ ".\n" + "Server gave status of <code>" + response.statusText +"(" + response.status + ")</code>.");
					}
				} // End onload function
			});
		};

		DC_LoaTS_Helper.loadAll = function(raidLinks) {
			// Private variable to be closed over in the autoLoader
			var autoLoadCounter = {
					attempted: 0, 
					invalid: 0,
					loaded: 0, 
					visited: 0, 
					completed: 0, 
					reported: false,
					isValid: function() {return this.loaded + this.visited + this.completed + this.invalid == this.attempted;},
					getReport: function() {this.reported = true; return this._generateReportText()},
					_generateReportText: function() {return "Joined: " + this.loaded + "\nVisited: " + this.visited + "\nDead: " + this.completed + "\n<span class='abbr' title='Invalid Hash, Wrong Alliance, Broken Links, etc'>Invalid</span>: " + this.invalid;}
			};
			var startTime = new Date()/1;
			var lrib = DC_LoaTS_Helper.getPref("LoadRaidsInBackground", false);
			var lribDelay = DC_LoaTS_Helper.getPref("LoadRaidsInBackgroundDelay", 200);
			var lrDelay = DC_LoaTS_Helper.getPref("LoadRaidsDelay", 1500);
			var gameIframe = DC_LoaTS_Helper.getGameIframe();

			// Create function closure to be called repeatedly
			var autoLoader = function __autoload()
			{
				// This shouldn't be called without links, but just in case
				if (raidLinks.length > 0)
				{
					// Keep track of how many we've tried to load
					autoLoadCounter.attempted++;
					
					// Load the next raid, capture the visitation marking
					DC_LoaTS_Helper.loadRaid(raidLinks.pop(), gameIframe, lrib, 
						function(oldState, newState){
							if (RaidManager.STATE.equals(newState, RaidManager.STATE.IGNORED)) {
								autoLoadCounter.invalid++;
							}
							else if (RaidManager.STATE.equals(newState, RaidManager.STATE.COMPLETED)) {
								autoLoadCounter.completed++;
							}
							else if (RaidManager.STATE.equals(oldState, RaidManager.STATE.VISITED)) {
								autoLoadCounter.visited++;
							}
							else {
								autoLoadCounter.loaded++;
							}
							
							if (raidLinks.length === 0 && autoLoadCounter.isValid() && !autoLoadCounter.reported) {
								// Calculate how long it took to load them all
								var endTime = new Date()/1;
								var took = (endTime - startTime)/1000;
								holodeck.activeDialogue().raidBotMessage("Loading Complete! " + autoLoadCounter.attempted + " raids loaded in " + took + "s.\n" + autoLoadCounter.getReport());
								
								// Update all the links, in case any were missed while loading
								DC_LoaTS_Helper.updatePostedLinks();
								
								// Clean up
								delete DC_LoaTS_Helper.autoLoader;
							}
						}
					);
					
					// If there are any links left, we'll need to continue loading them
					if (raidLinks.length > 0)
					{
						// Fire the loader again after a while
						// Loading in Background
						if (lrib) {
							DC_LoaTS_Helper.autoLoader.timeout = setTimeout(__autoload, lribDelay);
						}
						// Loading in Foreground
						else {
							DC_LoaTS_Helper.autoLoader.timeout = setTimeout(__autoload, lrDelay);
						}
					}
				}
				else
				{
					// Calculate how long it took to load them all
					var endTime = new Date()/1;
					var took = (endTime - startTime)/1000;
					holodeck.activeDialogue().raidBotMessage("Load ended abruptly. " + autoLoadCounter.attempted + " raids loaded in " + took + "s.\n" + autoLoadCounter.getReport());
				}
			}
			

			// Kick off the auto loading
			DC_LoaTS_Helper.autoLoader = {
				timeout: setTimeout(autoLoader, 500), 
				raidLinks: raidLinks, 
				counter: autoLoadCounter,
				startingLinkCount: raidLinks.length,
				startTime: (new Date()/1) + 500
			};
			
		};
		
		DC_LoaTS_Helper.reload = function()
		{
			// Whether or not we managed to reload
			var didReload = false;
			
			// Try to reload the game
			if (typeof window.activateGame  !== "undefined")
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
		
		DC_LoaTS_Helper.handleIgnoreVisitedRaids = function(ignore) {
			
			if (typeof ignore === "undefined") {
				ignore = DC_LoaTS_Helper.getPref("HideVisitedRaids", false);
			}
			
			// Parser style for the hiding of these raids
			var parser = new RaidFilterStyleParser("{state: visited}||{state: completed}||{state: ignored} ++none");
			
			// Find all the styles matching this filter
			var matchingStyles = DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()];
			
			//console.log("Ignore: ", ignore);
			if (ignore === true) {
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
						if (parser.raidFilter.getKey() === matchingStyles[i].raidFilter.getKey()) {
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
						if (parser.raidFilter.getKey() === matchingStyles[i].raidFilter.getKey()) {
							matchingStyles.splice(i, 1);
							break;
						}
					}
				}
			}
			
			DC_LoaTS_Helper.updatePostedLinks();
		}
		
		DC_LoaTS_Helper.listContainsRaid = function(list, raidLink) {
			DCDebug("List contains raid: ", list, raidLink);
			if (list && raidLink && raidLink.isValid()) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].id === raidLink.id && list[i].hash === raidLink.hash) {
						return true;
					}
				}
			}
			else {
				DCDebug("No comparison to be done", list, raidLink);
			}
			
			return false;
		}
		
		// Make sure the upl namespace exists
		DC_LoaTS_Helper.upl = {now: {}, next: {}};
		
		// Update links that are already in chat
		DC_LoaTS_Helper.updatePostedLinks = function(raidLink)
		{
			/*
			// If updating posted links is locked
			if (DC_LoaTS_Helper.upl.lock) {
				DCDebug("UPL already locked trying to update: " + (raidLink ? raidLink.id : "ALL"));
				// No raidLink provided. Load everything
				if (!raidLink) {
					DC_LoaTS_Helper.upl.next.refreshAll = true;
					delete DC_LoaTS_Helper.upl.next.list;
				}
				// If we're not loading all
				else if (!DC_LoaTS_Helper.upl.next.refreshAll) {
					// Make sure the list is ready
					if (!DC_LoaTS_Helper.upl.next.list) {
						DC_LoaTS_Helper.upl.next.list = [];
					}
					DC_LoaTS_Helper.upl.next.list.push(raidLink);
				}
				
				// If updating posted links became unlocked
				if (DC_LoaTS_Helper.upl.lock) {
					// Lock it
					DC_LoaTS_Helper.upl.lock = true;
					DCDebug("UPL became unlocked during update: " + (raidLink ? raidLink.id : "ALL"));
					DCDebug("UPL Locking now for: " + (raidLink ? raidLink.id : "ALL"));

					// In theory, we now have the lock and other code can't get in here

					// Copy over the important values
					DC_LoaTS_Helper.upl.now.refreshAll = DC_LoaTS_Helper.upl.next.refreshAll;
					DC_LoaTS_Helper.upl.now.list = DC_LoaTS_Helper.upl.next.list;
					
					// Clear out the nexts
					DC_LoaTS_Helper.upl.next.refreshAll = false;
					delete DC_LoaTS_Helper.upl.next.list;

					DCDebug("Calling UPL for: " + (raidLink ? raidLink.id : "ALL"));
					// Run the private runner. Will do the unlock for us
					_upl();
				}
				// If it's still locked, don't do anything
			}
			else {
				// Lock it
				DC_LoaTS_Helper.upl.lock = true;
				DCDebug("UPL already unlocked for: " + (raidLink ? raidLink.id : "ALL"));
				DCDebug("UPL Locking now for: " + (raidLink ? raidLink.id : "ALL"));
				
				// In theory, we now have the lock and other code can't get in here

				// Set the important values
				DC_LoaTS_Helper.upl.now.refreshAll = !raidLink;
				DC_LoaTS_Helper.upl.now.list = raidLink ? [raidLink] : undefined;

				DCDebug("Calling UPL for: " + (raidLink ? raidLink.id : "ALL"));
				// Run the private runner. Will do the unlock for us
				_upl();
			}
			
			// Private function
			function _upl() {
				// At this time, we can assume that the locks prevent this code from every being run
				// more than once at a time, and that the upl.now variables are set and won't change
				
				// Set a timeout to avoid sucking up all the cpu
				setTimeout(function()
				{
					Timer.start("updatePostedLinksTimeout");
					DCDebug("Running UPL for: ", DC_LoaTS_Helper.upl.now.list, " refreshAll: " + DC_LoaTS_Helper.upl.now.refreshAll);
					try 
					{
						// Look up all raid links in chat
						var elems = $("play").getElementsByClassName("raidMessage");
						
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
							if (newRaidLink.isValid() && (DC_LoaTS_Helper.upl.now.refreshAll || DC_LoaTS_Helper.listContainsRaid(DC_LoaTS_Helper.upl.now.list, newRaidLink)))
							{
								// Restyle the message as appropriate
								var styles = newRaidLink.getMatchedStyles();
								
								// TODO: Eventually figure out how to style whispers without it being a PITA especially raidbot seenraids whispers
								if ((elem.parentNode.parentNode.parentNode.className || "").indexOf("hisper") < 0) {
									
									// Remove existing doomscript styles. We don't want to double them up or anything weird
									elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").replace(/DCLH-RFSP-\d+/gi, "").trim();

									// If there are styles, apply them
									if (styles && styles.className)
									{
										// Append to the existing styles
										elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").trim() + " " + styles.className.trim();
									}
								}
								
								// Remove the old link, and shove in the new, formatted, styled one
								elem.insert({after: newRaidLink.getFormattedRaidLink(messageFormat, linkFormat)});
								elem.remove();
							}
							else if (!newRaidLink.isValid())
							{
								console.warn("Element did not produce a valid raid link:");
								console.warn(elem);
							}
							else if (newRaidLink.hash === raidLink.hash || raidLink.id === newRaidLink.id)
							{
								DCDebug("Similar links found while updating posted links, but not similar enough?");
								DCDebug(raidLink);
								DCDebug(newRaidLink);
							}
						}
					}
					catch (e)
					{
						console.warn(e);
					}
					
					// If there's other stuff to run
					if (DC_LoaTS_Helper.upl.next.refreshAll || DC_LoaTS_Helper.upl.next.list) {
						DCDebug("Additional links available. Scheduling UPL again for: ", DC_LoaTS_Helper.upl.next.list, " refreshAll: " + DC_LoaTS_Helper.upl.next.refreshAll);
						setTimeout(function() {
							// Copy over the important values
							DC_LoaTS_Helper.upl.now.refreshAll = DC_LoaTS_Helper.upl.next.refreshAll;
							DC_LoaTS_Helper.upl.now.list = DC_LoaTS_Helper.upl.next.list;
							
							// Clear out the nexts
							DC_LoaTS_Helper.upl.next.refreshAll = false;
							delete DC_LoaTS_Helper.upl.next.list;
	
							DCDebug("Calling UPL for: ", DC_LoaTS_Helper.upl.now.list, " refreshAll: " + DC_LoaTS_Helper.upl.now.refreshAll);
							// Run the private runner. Will do the unlock for us
							_upl();
						// If we go to run this again, don't run it too soon
						}, 500);
					}
					else {
						DCDebug("Unlocking UPL");
						DC_LoaTS_Helper.upl.lock = false;
					}
					Timer.stop("updatePostedLinksTimeout");
				}, 100);
			}
			
			
			
			*/
			
			
			
			
			
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
					var elems = $("play").getElementsByClassName("raidMessage");
					
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
						if (newRaidLink.isValid() &&  (typeof raidLink === "undefined" || raidLink.getUniqueKey() === newRaidLink.getUniqueKey()))
						{
							// Restyle the message as appropriate
							var styles = newRaidLink.getMatchedStyles();
							
							// TODO: Eventually figure out how to style whispers without it being a PITA especially raidbot seenraids whispers
							if ((elem.parentNode.parentNode.parentNode.className || "").indexOf("hisper") < 0) {
								
								// Remove existing doomscript styles. We don't want to double them up or anything weird
								elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").replace(/DCLH-RFSP-\d+/gi, "").trim();

								// If there are styles, apply them
								if (styles && styles.className)
								{
									// Append to the existing styles
									elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").trim() + " " + styles.className.trim();
								}
							}
							
							// Remove the old link, and shove in the new, formatted, styled one
							elem.insert({after: newRaidLink.getFormattedRaidLink(messageFormat, linkFormat)});
							elem.remove();
						}
						else if (!newRaidLink.isValid())
						{
							console.warn("Element did not produce a valid raid link:");
							console.warn(elem);
						}
						else if (newRaidLink.hash == raidLink.hash || raidLink.id == newRaidLink.id)
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
			}.bind(window, raidLink), 100);
			
		};
		
		DC_LoaTS_Helper.ajax = function(params){
            if (!params.method)
            {
                params.method = "GET";
            }
            else if (["POST", "GET", "HEAD"].indexOf(params.method.toUpperCase()) === -1)
            {
                if (params.data.length > 0)
                {
                    params.data = "_method=" + params.method + "&" + params.data;
                }
                else
                {
                    params.data = "_method=" + params.method;
                }
                params.method = "POST";
            }
            if (params.method.toUpperCase() === "POST" && (!params.headers || !params.headers["Content-Type"]))
            {
                (params.headers||(params.headers={}))["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (typeof params.synchronous === "undefined")
            {
                params.synchronous = false;
            }
            params.UUID = DC_LoaTS_Helper.generateUUID();
            document.addEventListener(params.UUID, function listener(event)
            {
                if (event.data.responseObj.readyState == 4)
                {
                    document.removeEventListener(params.UUID, listener);
                }
                
                if (typeof params[event.data.callbackName] === "function")
                {
                    params[event.data.callbackName](event.data.responseObj);
                }
            });
            // Convert params to simple object
            var paramSimple = {};
            for (var param in params)
            {
                if (params.hasOwnProperty(param)) {
                    if (typeof params[param] === "function")
                    {
                        paramSimple["__callback_" + param] = "function";
                    }
                    else {
                        paramSimple[param] = params[param];
                    }
                }
            }
            var origin = window.location.protocol + "//" + window.location.host;
            var evt = document.createEvent("MessageEvent");
            evt.initMessageEvent("DC_LoaTS_ExecuteGMXHR", true, true, paramSimple, origin, 1, window, null);
            document.dispatchEvent(evt);
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
		
		DC_LoaTS_Helper.updateRaidData = function() {
			DC_LoaTS_Helper.ajax({
				url: DC_LoaTS_Properties.raidDataURL + "?_dc=" + DC_LoaTS_Helper.generateUUID(),
				onload: function(response) {
					var message;
					if (response.status === 200) {
						eval(response.responseText.replace("DC_LoaTS_Helper.raids", "var data"));
						var added = [];
						for (var i in data) {
							if (data.hasOwnProperty(i) && typeof DC_LoaTS_Helper.raids[i] === "undefined") {
								DC_LoaTS_Helper.raids[i] = data[i];
								added.push(data[i].fullName);
							}
						}
						if (added.length > 0) {
							message = "Loaded " + added.length + " new raid type" + ((added.length!=1)?"s":"") + ".\n" + added.join("\n");
							DC_LoaTS_Helper.updatePostedLinks();
						}
						else {
							message = "No new raid types found."
						}
					}
					else if (response.status > 200 && response.status < 400) {
						message = "No new raid types found."
					}
					else {
						message = "Unable to check for updated raid data from update site. (status: " + response.status + ")";
					}

					if (message) {
						if (holodeck.activeDialogue()) {
							holodeck.activeDialogue().raidBotMessage(message);
						}
					}
					
					if (window.raidTools && window.raidTools.spammer && window.raidTools.spammer.raids) {
						var raidsObj = window.raidTools.spammer.raids;
						if (!raidsObj.lots) {
							raidsObj.lots = {};
						}
						
						for (var raidId in DC_LoaTS_Helper.raids) {
							if (!raidsObj.lots[raidId]){
								raidsObj.lots[raidId] = DC_LoaTS_Helper.raids[raidId].shortName;
							}
						}
					}
				}
			});

			DC_LoaTS_Helper.ajax({
				url: DC_LoaTS_Properties.worldRaidDataURL + "?_dc=" + DC_LoaTS_Helper.generateUUID(),
				onload: function(response) {
					var message;
					if (response.status === 200) {
						var oldWRData = DC_LoaTS_Helper.worldRaidInfo;
						try {
						    eval(response.responseText);
						}
						catch (ex){}
						var WRData = DC_LoaTS_Helper.worldRaidInfo;
						
						if (!oldWRData && WRData) {
							message = "New " + (WRData.spawnType||"World Raid") + ": " + WRData.name;
						}
						
						RaidToolbar.createWRButton();
					}
					else if (response.status > 200 && response.status < 400) {
						message = "No new World Raids found."
					}
					else {
						message = "Unable to check for updated world raid data from update site. (status: " + response.status + ")";
					}

					if (message) {
						if (holodeck.activeDialogue()) {
							holodeck.activeDialogue().raidBotMessage(message);
						}
					}
				}
			});

		};
		
		DC_LoaTS_Helper.getCommandLink = function(commandText, displayText)
		{
			if (typeof displayText == "undefined"){displayText = commandText};
			return "<a href=\"#\" class=\"chatCommandLink\" onclick=\"holodeck.processChatCommand('" + commandText + "'); return false;\">" + displayText + "</a>";
		};
		
		
		// Calculate shortest names
		DC_LoaTS_Helper.calculateShortestRaidNames = function()
		{
			Timer.start("calculateShortestRaidNames calc");
			// Borrowed from: http://stackoverflow.com/questions/11245481/find-the-smallest-unique-substring-for-each-string-in-an-array
			var uniqueNames = [], nameInd, windowSize, substrInd, substr, otherNameInd, foundMatch;
			// For each name
			for (nameInd in DC_LoaTS_Helper.raids)
			{
			    var name = DC_LoaTS_Helper.raids[nameInd].getSearchableName();
			    // For each possible substring length
			    windowLoop:
			    for (windowSize = 1; windowSize <= name.length; windowSize++)
			    {
			        // For each starting index of a substring
			        for (substrInd = 0; substrInd <= name.length-windowSize; substrInd++)
			        {
			            substr = name.substring(substrInd,substrInd+windowSize).toLowerCase();
			            if (/\W|_|^[1-4]$/gi.test(substr)){continue;}
			            foundMatch = false;
			            // For each other name
			            for (otherNameInd in DC_LoaTS_Helper.raids)
			            {
			                if (nameInd != otherNameInd && DC_LoaTS_Helper.raids[otherNameInd].getSearchableName().toLowerCase().indexOf(substr) > -1)
			                {
			                    foundMatch = true;
			                    break;
			                }
			            }
			
			            if (!foundMatch)
			            {
			                // This substr works!
			                DC_LoaTS_Helper.raids[nameInd].shortestName = substr;
			                break windowLoop;
			            }
			        }
			    }
			}
			Timer.stop("calculateShortestRaidNames calc");
		};
		
		DC_LoaTS_Helper.showWRInfo = function() {
			if (typeof DC_LoaTS_Helper.worldRaidInfo === "object") {
				
				var wr = DC_LoaTS_Helper.worldRaidInfo;
				wr.spawnType = wr.spawnType || "World Raid";
				
				RaidMenu.show();

				var wrtab = document.getElementById("DC_LoaTS_raidMenu" + wr.spawnType.trim().replace(" ", "_") + "PaneTab");
				if (!wrtab) {
					// Need to create a WR Info Div
					var tabClass = RaidMenuTab.create({
						tabName: wr.spawnType || "World Raid",
						tabHeader: wr.name + " " + wr.spawnType + ". " + wr.startDate,
						tabPosition: 150,
						closeable: true,
						
						initPane: function()
						{
							var timerDiv = document.createElement("div");
							timerDiv.className = "DC_LoaTS_WR_Timer";
							timerDiv.style.fontWeight = "Bold";
							timerDiv.appendChild(document.createTextNode("Please Wait, Starting Timer..."));
							this.pane.appendChild(timerDiv);
							this.pane.appendChild(document.createElement("br"));
							
							if (wr.raidUrl) {
								var wrlink = new RaidLink(wr.raidUrl);
								var wrlinkDiv = document.createElement("div");
								wrlinkDiv.innerHTML = wrlink.getFormattedRaidLink();
								this.pane.appendChild(wrlinkDiv);
							}
							
							var infoDiv = document.createElement("div");
							
							if (wr.infoUrl) {
								var infoLink = document.createElement("a");
								infoLink.href = wr.infoUrl;
								infoLink.target = "_BLANK";
								infoLink.appendChild(document.createTextNode(wr.infoUrlTitle||wr.infoUrl));
								infoDiv.appendChild(infoLink);
							}
							
							if (wr.lootTableImageUrl) {
								infoDiv.appendChild(document.createElement("br"));
								var lootTable = document.createElement("img");
								lootTable.src = wr.lootTableImageUrl;
								lootTable.title = wr.name  + " Loot Table. " + wr.startDate;
								lootTable.style.borderRadius = "5px";
								infoDiv.appendChild(lootTable);
							}
							
							this.pane.appendChild(infoDiv);
							
							wrtab = this.tabA;
							
							DC_LoaTS_Helper.doWRTimer();
						}
					});
					RaidMenu.getInstance().activateTab(tabClass);
				}
	
				RaidMenu.getInstance().tabs.setActiveTab(wrtab);
			}
		};

		DC_LoaTS_Helper.doWRTimer = function() {
			var wr = DC_LoaTS_Helper.worldRaidInfo;
			var timerText = "No current WR or WR is over.";
			if (typeof wr === "object" && wr.timerEnds) {
				var now = new Date();
				var timerEnds = new Date(wr.timerEnds);
				
				if (timerEnds > now) {
					// WR is on
					var diff = Math.floor((timerEnds.getTime() - now.getTime()) / 1000);
					var hours = Math.floor(diff/3600);
					var minutes = Math.floor((diff%3600)/60);
					var seconds = Math.floor((diff%60));
					timerText = "Estimated Time Remaining: " + 
								(hours<10?"0"+hours:hours) + ":" + 
								(minutes<10?"0"+minutes:minutes) + ":" + 
								(seconds<10?"0"+seconds:seconds);
				}
				else {
					// WR is over
					timerText = wr.name + " is over.";
				}
				
				var elems = document.getElementsByClassName("DC_LoaTS_WR_Timer");
				if (elems && elems.length > 0) { 
					for (var i = 0; i < elems.length; i++) {
						elems[i].innerHTML = timerText;
					}
					
					wr.timerEndsTimeout = setTimeout(DC_LoaTS_Helper.doWRTimer, 1000);
				}
			}
		};

        DC_LoaTS_Helper.updateCooldowns = function() {
            DC_LoaTS_Helper.ajax({
                method: "GET",
                url: RaidMonitorAPI.getCooldownsUrl(),
                onload: function(response) {
                    var cds = JSON.parse(response.responseText);
                    RaidMonitorAPI.cooldowns = cds;
                    RaidMonitorTools.refresh();
                }
            });
        };

		DC_LoaTS_Helper.timeDifference = function(current, previous) {

		    var msPerImmediate = 10 * 1000,
		        msPerMinute = 60 * 1000,
		        msPerHour = msPerMinute * 60,
		        msPerDay = msPerHour * 24,
		        msPerMonth = msPerDay * 30,
		        msPerYear = msPerDay * 365,

		        elapsed = current - previous,
		        val, unit, text;

		    if (elapsed < msPerImmediate) {
		         text = "moments ago";
		    }
		    else if (elapsed < msPerMinute) {
		         val = Math.round(elapsed/1000);
		         unit = "second";
		    }
		    else if (elapsed < msPerHour) {
		         val = Math.round(elapsed/msPerMinute);
		         unit = "minute";
		    }
		    else if (elapsed < msPerDay ) {
		    	val = Math.round(elapsed/msPerHour);
		        unit = "hour";
		    }
		    else if (elapsed < msPerMonth) {
		    	val = Math.round(elapsed/msPerDay);
		        unit = "day";
		    }
		    else if (elapsed < msPerYear) {
		    	val = Math.round(elapsed/msPerMonth);
		        unit = "month";
		    }
		    else {
		    	val = Math.round(elapsed/msPerYear);
		        unit = "year";
		    }
		    
		    return text || val + " " + unit + (val !== 1 ? 's':'') + " ago"
		};
		
		DC_LoaTS_Helper.getCurrentPrettyDate = function() {
			// Via: https://gist.github.com/akb/1187817
			return (function () {
			    return ['Jan.', 'Feb.', 'Mar.', 
			            'Apr.', 'May', 'Jun.',
			            'Jul.', 'Aug.', 'Sep.', 
			            'Oct.', 'Nov.', 'Dec.'][this.getMonth()] + " " +
			            (function (d) { 
			                var s = d.toString(), l = s[s.length-1];
			                return s+(['st','nd','rd'][l-1] || 'th');
			            })(this.getDate()) + ", " +
			            this.getFullYear() + " " +
			            this.getHours() + ":" + ("0" + this.getMinutes()).slice(-2);
			}).call(new Date())
		};


		DC_LoaTS_Helper.generateUUID = function()
		{
		    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		        return v.toString(16);
		    });
		};

        DC_LoaTS_Helper.getRealOffsetTop = function(el) {
            var top = el.offsetTop;
            while ((el = el.offsetParent)) {
                top += el.offsetTop;
            }
            return top;
        };
		
		// Go ahead and execute this, too
		DC_LoaTS_Helper.calculateShortestRaidNames();

		// Debug log wrapping function
		// Special scope debugging for just this script
		window.DCDebug = function()
		{
			if (DC_LoaTS_Properties.debugMode === true)
			{
				console.log.apply(console, arguments);
			}
		};
		
		// Borrowed from: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
		String.prototype.format = function()
		{
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number)
			{ 
				return typeof args[number] != 'undefined'?args[number]:match;
			});
		};


