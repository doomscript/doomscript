		/************************************/
		/******** RaidManager Utility *******/
		/************************************/
		
		// The RaidManager utility stores information about
		// instances of raids that the user has seen/joined
		// It is not actually a class, but rather just a 
		// collection of static functions
		window.RaidManager = {
			// STATE Enum
			STATE: {
				// The ids below are critical. Please do not ever change the ids, ever.
				// If you create custom states, please set the ids of the new states above 20 
				// to allow for new native ids in the future.
				// Every state with id below 0 is an unknown state
				// Note: Priority may be removed or altered in future releases
				//TODO: Maybe add an equals method to these in init? RaidManager.STATE.equals is a pain
				UNSEEN:  	{id:0, text: "unseen", 		niceText: "Unseen", 		shortText: "(NEW)",	priority: 0},
				//DB_ONLY: 	{id:1, text: "db_only", 	niceText: "From Database", 	shortText: "(DB)",	priority: 1},
				SEEN:    	{id:2, text: "seen", 		niceText: "Seen", 			shortText: "(S)",	priority: 2},
				VISITED: 	{id:3, text: "visited", 	niceText: "Visited", 		shortText: "(V)", 	priority:5},
				IGNORED: 	{id:4, text: "ignored", 	niceText: "Ignored", 		shortText: "(X)", 	priority:10},
				COMPLETED: 	{id:5, text: "completed", 	niceText: "Completed", 		shortText: "(!)", 	priority:99},
				
				// Takes in a state.text or a state.id and looks up the corresponding state
				// Returns a STATE if one is found, undefined otherwise
				/*public static STATE*/ 
				valueOf: function(stateParam)
				{
					// Set up the cache for ids, if it's not already set up
					if (!RaidManager.STATE.cacheById) {
						RaidManager.STATE.cacheById = {};
						for (var stateKey in this)
						{
							var item = this[stateKey];
							// Ignore functions. Check for the state.id or state.text to equal the passed in value
							if (item && item !== "function")
							{
								RaidManager.STATE.cacheById[item.id] = item;
							}
						}
					}
					
					// State we found
					var state;
					
					// If the parameter was a string
					if (typeof stateParam === "string")
					{
						// lowercase it just in case
						stateParam = stateParam.toLowerCase();
					}
					// Otherwise return from the id cache
					else
					{
						return RaidManager.STATE.cacheById[stateParam];
					}
					
					// Iterate over all valid states
					for (var stateKey in this)
					{
						// Ignore functions. Check for the state.id or state.text to equal the passed in value
						if (this[stateKey] && typeof this[stateKey] !== "function"
							&& (this[stateKey].id == stateParam || this[stateKey].text == stateParam)
						   )
						{
							// If we found a state that matches, capture it and break the loop
							state = this[stateKey];
							break;
						}
						else if (typeof this[stateKey] === "undefined")
						{
							console.warn("Invalid State:", stateKey);
						}
					}
					
					// Return the state we found, or undefined if we didn't find one
					return state;
				},
				
				// Returns the UNKNOWN state. Not listed as enumerable on purpose to avoid listing when iterated over
				/*public static STATE*/
				getUnknownState: function()
				{
					return {id: -1, text: "unknown", niceText: "Unknown", shortText: "(?)", priority: -1};
				},
				
				// Compares two states and returns true if they are equal, false otherwise
				/*public static boolean*/ 
				equals: function(state1, state2)
				{
					return (state1 == state2 || 
							(typeof state1 != "undefined" && typeof state2 != "undefined" && 
								(
									(typeof state1.id != "undefined" && state1.id == state2.id)
									||
									(typeof state1.text != "undefined" && state1.text == state2.text)
								)
							)
						   );
				}
			},
			
			// Initialize the raid manager. MUST BE INITIALIZED before it can be used
			/*public static void*/
			init: function()
			{
				Timer.start("RaidManager init");
				
				// Load up everything that's been stored
				var rawRaidStorage = GM_getValue(DC_LoaTS_Properties.storage.raidStorage);
				
				// Make sure the raid storage actually finds what it's supposed to
				if (typeof rawRaidStorage == "undefined" || rawRaidStorage.length == 0)
				{
					// Otherwise default to empty
					rawRaidStorage = "{}";
				}
				
				try
				{
					RaidManager.raidStorage = JSON.parse(rawRaidStorage);
				}
				catch(ex)
				{
					try
					{
						holodeck.activeDialogue.raidBotMessage("Raid link storage has become corrupted and will now be cleared. RaidBot apologizes for the inconvenience. If this happens frequently, please report it.");
					}
					catch (ex2)
					{
						console.warn("Could not display raid bot message to user: Raid link storage has become corrupted and will now be cleared. RaidBot apologizes for the inconvenience. If this happens frequently, please report it.");
						console.warn(ex2);
					}
					
					console.warn("rawRaidStorage was not able to be parsed. For debugging purposes, it will now been quarantined, and the normal raid link storage will be cleared.");
					console.warn(ex)
					
					// Quarantine the current raid storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage + DC_LoaTS_Properties.storage.quarantine, rawRaidStorage);
					
					// Clear the existing corrupted storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, "{}");
					RaidManager.raidStorage = {};

				}
				
				// Count raids we're about to delete
				var clearCount = 0;
				
				// Iterate over all stored data
				for (var key in RaidManager.raidStorage)
				{
					// Grab this raidData item
					var raidData = RaidManager.raidStorage[key];
					
					// The raidData item is actually RaidLink, but storage doesn't retain methods. Add back in the methods
					Object.extend(raidData.raidLink, RaidLink.prototype);
					
					// Clear items that have been stored for more than their total raid length
					if ((new Date()/1) - raidData.firstSeen > raidData.raidLink.getRaid().time * 60*60*1000)
					{
						delete RaidManager.raidStorage[key];
						clearCount++;
					}
				}

				// If anything was cleared, log it for posterity
				if (clearCount > 0)
				{
					console.info("Cleared " + clearCount + " raid" + ((clearCount != 1)?"s":"") + " for being too old");
				}
				
				// Store back into the DB any modifications we made
				GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(RaidManager.raidStorage));
				
				// Update raid preferences
				RaidManager.updateRaidPreferences();
				
				Timer.stop("RaidManager init");
			},
			
			// Update the script with the user's preferences
			// This handles the customized bits of text loaded from memory
			/*public static void*/
			updateRaidPreferences: function()
			{
				// Load up the raid preferences
				var raidPrefs = GM_getValue(DC_LoaTS_Properties.storage.raidPrefs);
				
				// Make sure the raid prefs are populated
				if (typeof raidPrefs != "undefined" && raidPrefs.length > 0)
				{
					RaidManager.raidPrefs = JSON.parse(raidPrefs);
					
					// Iterate over every preference type
					for (var key in RaidManager.raidPrefs)
					{
						var pref = RaidManager.raidPrefs[key];
						
						// Iterate over every variable to change in that preference.
						for (var variable in pref)
						{
							try
							{
								eval(variable + "=" + pref[variable]);
							}
							catch (ex)
							{
								console.warn("Could not update `" + variable + "` to be \"" + pref[variable] + "\".")
								console.warn(ex);
							}
						}
					}
				}
				
				
				

			},
			
			// Clear everything from storage
			/*public static void*/
			clear: function(raidList)
			{
				Timer.start("clear");
				// If there was no list passed in, clear them all
				if (typeof raidList == "undefined")
				{
					// Replace the entire stored dataset with an empty object
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify({}));
					
					// Also clear the memcache
					RaidManager.raidStorage = {};
				}
				else
				{
					// Iterate over everything we need to delete
					for (var i = 0; i < raidList.length; i++)
					{
						delete RaidManager.raidStorage[raidList[i].getUniqueKey()];
					}
					
					// Store the storage data back into the browser storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(RaidManager.raidStorage));
				}
				
				// Reset the CConoly query time so all the raids can be loaded again
				CConolyAPI.setLastQueryTime(0);
				
				// Reset all the links to NEW
				DC_LoaTS_Helper.updatePostedLinks();
				
				Timer.stop("clear");
			},
			
			// Store a raid link and the state of the link
			// RaidManager.raidStorage is a write-through cache, and the storage is volatile
			// So we have to look up the storage every time we store. This keeps us in sync with
			// other windows of the same browser running the game simultaneously
			/*public static void*/
			store: function(raidLink, state)
			{
				Timer.start("store");
				// If the link is valid
				if (raidLink.isValid())
				{
					Timer.start("store > loading hardRaidStorage");
					// Load up the storage object
					var hardRaidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));
					Timer.stop("store > loading hardRaidStorage");
					
					// Attempt to load the passed in raid link
					var raidData = hardRaidStorage[raidLink.getUniqueKey()];
					
					// Lookup the current state
					var currentState;
					var containedInLocalDB = true;
					if (typeof raidData != "undefined")
					{
						// If there is a stateId, use that first
						if (typeof raidData.stateId != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.stateId);
						}
						// If there is an old-style state, use that second
						else if (typeof raidData.state != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.state.text);
						}
					}
					
					// If we couldn't find the current state, set it to UNSEEN
					if (typeof currentState === "undefined")
					{
						currentState = RaidManager.STATE.UNSEEN;
						containedInLocalDB = false;
					}
					
					// If we weren't provided a state param, set it to the current state
					if (typeof state === "undefined")
					{
						state = currentState;
					}
					
					// Keep track of whether or not this link needs to be updated elsewhere
					var shouldUpdateAllLinks = false;
					
					// If we've never seen this link before
					if (typeof raidData == "undefined")
					{
						// Create a new storage container for it, and wrap it
						raidData = {raidLink: raidLink, stateId: state.id, firstSeen: new Date()/1}
						
						// Place this object into the storage
						hardRaidStorage[raidLink.getUniqueKey()] = raidData;						
					}
					// Two unseens upgrade to seen if the link was already in the DB
					else if (containedInLocalDB
							 &&
								RaidManager.STATE.equals(state, RaidManager.STATE.UNSEEN)
								&& 
								RaidManager.STATE.equals(currentState, RaidManager.STATE.UNSEEN)
							 )
					{
					        // Set the new state
					        raidData.stateId = RaidManager.STATE.SEEN.id;
					       
					        // Changed state
					        shouldUpdateAllLinks = true;
					}
					// If we have seen this link before, change the links state if necessary
					else if (!RaidManager.STATE.equals(currentState, state))
					{
						// Set the new state
						raidData.stateId = state.id;
						
						// Since we changed state, need to update all those links
						shouldUpdateAllLinks = true;
					}
					else
					{
						// Just double check to make sure the state id has been set
						// Helps convert old states to new ones
						raidData.stateId = currentState.id;
					}
					
					// If we should report dead raids and this one is dead and it hasn't been reported yet
					if (DC_LoaTS_Helper.getPref("ReportDeadRaids", true) && RaidManager.STATE.equals(state, RaidManager.STATE.COMPLETED) && !raidData.reported) {
						raidData.reported = true;
						DC_LoaTS_Helper.reportDead(raidLink);
					}
					
					// Update the lastSeen time of the link
					raidData.lastSeen = new Date()/1;
					
					Timer.start("store > storing hardRaidStorage");
					// Store the storage data back into the browser storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(hardRaidStorage));
					Timer.stop("store > storing hardRaidStorage");
					
					Timer.start("store > extending raid links");
					//TODO Work around this (update: not really that big of a deal based on timer data)
					// Gotta have the methods attached to the objects
					for (var key in hardRaidStorage)
					{
						// If we're missing methods, add them
						if (typeof hardRaidStorage[key].raidLink.getRaid != "function")
						{
							Object.extend(hardRaidStorage[key].raidLink, RaidLink.prototype);		
						}
					}
					Timer.stop("store > extending raid links");
					
					// Update the cache
					RaidManager.raidStorage = hardRaidStorage;
					
					// If we found a reason to update all versions of this link
					if (shouldUpdateAllLinks)
					{
						// Update the posted links
						DC_LoaTS_Helper.updatePostedLinks(raidLink);
					}
				}
				else
				{
					console.warn("Did not store because link was invalid or storage unavailable");
				}
				
				Timer.stop("store");
			},
			
			// Store a list of raid links and the state of the links
			// RaidManager.raidStorage is a write-through cache, and the storage is volatile
			// So we have to look up the storage every time we store. This keeps us in sync with
			// other windows of the same browser running the game simultaneously
			/*public static void*/
			storeBulk: function(raidLinks, state)
			{
				Timer.start("store bulk");

				// Load up the storage object
				Timer.start("store > loading hardRaidStorage");
				var hardRaidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));
				Timer.stop("store > loading hardRaidStorage");
				
				// Declare a bunch of vars. Don't forget there's no such thing as block scope
				var raidLink, raidData, currentState, newState, containedInLocalDB, shouldUpdateAllLinks;
				
				// Capture all the valid links we're actually going to store
				var outboundLinks = [];
				
				for (var i = 0; i < raidLinks.length; i++) {
					
					raidLink = raidLinks[i];
					state = undefined;
					
					// Valid link?
					if (raidLink.isValid()) {
						
						// Remember the valid ones
						outboundLinks.push(raidLink);
					
						// Attempt to load the passed in raid link
						raidData = hardRaidStorage[raidLink.getUniqueKey()];
						
						// Lookup the current state
					    containedInLocalDB = true;
					    currentState = null;
						if (raidData)
						{
							// If there is a stateId, use that first
							if (raidData.stateId)
							{
								currentState = RaidManager.STATE.valueOf(raidData.stateId);
							}
							// If there is an old-style state, use that second
							else if (raidData.state)
							{
								currentState = RaidManager.STATE.valueOf(raidData.state.text);
							}
						}
						
						// If we couldn't find the current state, set it to UNSEEN
						if (!currentState)
						{
							currentState = RaidManager.STATE.UNSEEN;
							containedInLocalDB = false;
						}
						
						// Set the new state. It's either going to be the new parameter state or the existing state
						newState = state || currentState;
						
						// Keep track of whether or not this link needs to be updated elsewhere
						shouldUpdateAllLinks = false;
						
						// If we've never seen this link before
						if (!raidData)
						{
							// Create a new storage container for it, and wrap it
							raidData = {raidLink: raidLink, stateId: newState.id, firstSeen: new Date()/1}
							
							// Place this object into the storage
							hardRaidStorage[raidLink.getUniqueKey()] = raidData;						
						}
						// Two unseens upgrade to seen if the link was already in the DB
						else if (containedInLocalDB
								 &&
									RaidManager.STATE.equals(newState, RaidManager.STATE.UNSEEN)
									&& 
									RaidManager.STATE.equals(currentState, RaidManager.STATE.UNSEEN)
								 )
						{
						        // Set the new state
						        raidData.stateId = RaidManager.STATE.SEEN.id;
						       
						        // Changed state
						        shouldUpdateAllLinks = true;
						}
						// If we have seen this link before, change the links state if necessary
						else if (!RaidManager.STATE.equals(currentState, newState))
						{
							// Set the new state
							raidData.stateId = newState.id;
							
							// Since we changed state, need to update all those links
							shouldUpdateAllLinks = true;
						}
						else
						{
							// Just double check to make sure the state id has been set
							// Helps convert old states to new ones
							raidData.stateId = currentState.id;
						}
												
						// Update the lastSeen time of the link
						raidData.lastSeen = new Date()/1;
						
						// If we should report dead raids and this one is dead and it hasn't been reported yet
						if (DC_LoaTS_Helper.getPref("ReportDeadRaids", true) && RaidManager.STATE.equals(newState, RaidManager.STATE.COMPLETED) && !raidData.reported) {
							raidData.reported = true;
							DC_LoaTS_Helper.reportDead(raidLink);
						}
					}
				} // End for iterating over the links
				
				Timer.start("store > storing hardRaidStorage");
				// Store the storage data back into the browser storage
				GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(hardRaidStorage));
				Timer.stop("store > storing hardRaidStorage");
				
				Timer.start("store > extending raid links");
				//TODO Work around this (update: not really that big of a deal based on timer data)
				// Must have the methods attached to the objects
				for (var key in hardRaidStorage)
				{
					// If we're missing methods, add them
					if (typeof hardRaidStorage[key].raidLink.getRaid !== "function")
					{
						Object.extend(hardRaidStorage[key].raidLink, RaidLink.prototype);		
					}
				}
				Timer.stop("store > extending raid links");
				
				// Update the cache
				RaidManager.raidStorage = hardRaidStorage;
				
				// Update the posted links. 
				DC_LoaTS_Helper.updatePostedLinks();
				
				Timer.stop("store bulk");
				
				return outboundLinks;
			},
			
			// Lookup RaidData for a given link
			/*public static RaidData*/
			fetch: function(raidLink)
			{
				Timer.start("fetch");
				
				// Declare the return var
				var raidData;
				
				if (raidLink.isValid())
				{
					// Attempt to load the passed in raid link
					raidData = RaidManager.raidStorage[raidLink.getUniqueKey()];
										
					// If the link is in storage
					if (raidData && typeof raidData.raidLink.getRaid !== "function")
					{
						// Add in the functions that you expect to see on those objects
						Object.extend(raidData.raidLink, RaidLink.prototype);
					}
				}
				
				Timer.stop("fetch");
				
				// Return what we found or undefined
				return raidData;
			},
			
			// Returns the raid storage
			/*public static Object*/
			fetchStorage: function()
			{
				// Return the whole thing
				return RaidManager.raidStorage;
			},
			
			// Returns the all stored raid links
			/*public static Array*/
			fetchAll: function()
			{
				// Holder for raid links
				var raidLinks = new Array();
				
				// For everything in storage
				for (var key in RaidManager.raidStorage)
				{
					// Pull the raid data
					var raidData = RaidManager.raidStorage[key];
					
					// It should exist, but just in case
					if (typeof raidData != "undefined")
					{
						// Collect the links into the array
						raidLinks.push(raidData.raidLink);
					}
					
				}
				
				// Return all the links
				return raidLinks;
			},
			
			// Returns the state of a link, or UNSEEN if the link hasn't been stored
			/*public static STATE*/
			fetchState: function(raidLink)
			{
				// Attempt to load the raid link
				var raidData = RaidManager.fetch(raidLink);
				
				// If the raid link has been seen before
				if (typeof raidData !== "undefined")
				{
					if (typeof raidData.stateId !== "undefined")
					{
						// Return its state
						return RaidManager.STATE.valueOf(raidData.stateId);
					}
					else if (typeof raidData.state !== "undefined")
					{
						// Return its state
						return RaidManager.STATE.valueOf(raidData.state.text);
					}
				}
				
				// Since we haven't seen it, return UNSEEN
				return RaidManager.STATE.UNSEEN;
			},
			
			// Parameterized command line raid lookup
			/*public static Array*/
			fetchByFilter: function(filterParam)
			{
				Timer.start("fetchByFilter");
				try 
				{
					var raidFilter;
					
					// If we got text and not a RaidFilter
					if (typeof filterParam == "string")
					{
						// Parse the command into a RaidFilter
						raidFilter = new RaidMultiFilter(filterParam);
					}
					// We got something other than text. Assume it's a RaidFilter
					else if (filterParam instanceof RaidFilter || filterParam instanceof RaidMultiFilter)
					{
						// filterParam was already a raidFilter
						raidFilter = filterParam;
					}
					else
					{
						console.warn("Could not fetch by filter " + filterParam + ". Parameter must be a String or RaidFilter");
						return;
					}
					
					// If the command makes a valid filter
					if (raidFilter.isValid())
					{
						// Collect all matching raid links
						var raidLinks = new Array();
						
						// If there was no name or difficulty
						if (raidFilter.isEmpty())
						{
							// Get all raid links
							raidLinks = RaidManager.fetchAll();
						}
						// If we found a raid name, difficulty, or state 
						else 
						{
							// Get all raids
							var raidStorage = RaidManager.fetchStorage();
							
							// Count of raids seen
							var raidCount = 0;
							
							// Count of raids seen
							var resultsPage = 1;
							
							// Start time of the run
							var commandStartTime = (new Date() / 1);
							
							// Iterate over all raids
							for (var key in raidStorage)
							{
								// Get the raid data from storage
								var raidData = raidStorage[key];
								
								// Get the current raidLink
								var raidLink = raidData.raidLink;
								
								// Get the state of the link
								var currentState;
								if (typeof raidData.stateId != "undefined")
								{
									currentState = RaidManager.STATE.valueOf(raidData.stateId);
								}
								else if (typeof raidData.state != "undefined" && typeof raidData.state.text != "undefined")
								{
									currentState = RaidManager.STATE.valueOf(raidData.state.text);
								}
								
								if (typeof currentState == "undefined")
								{
									console.warn("Could not locate a state for " + raidLink.getSimpleText() + ". This may cause unexpected matching behavior.");
								}
								
								try
								{
									// If this link matches the filter
									if (raidFilter.matches(
										{
											age: commandStartTime - raidData.firstSeen,
											difficulty: raidLink.difficulty,
											fs: raidLink.getRaid().getFairShare(raidLink.difficulty),
											os: raidLink.getRaid().getOptimalShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: raidCount,
											size: raidLink.getRaid().size,
											zone: raidLink.getRaid().zone
										}
										))
									{
										//TODO: Improved Sorting
										// If we don't have a defined page, or we're on the right page, or we don't care about the count
										if (typeof raidFilter.page == "undefined" || resultsPage == raidFilter.page || typeof raidFilter.count == "undefined")
										{
											// Put seen links at the end
											if (RaidManager.STATE.equals(currentState, RaidManager.STATE.SEEN))
											{
												raidLinks.push(raidLink);
											}
											// Put visited and other links up top
											else
											{
												raidLinks.unshift(raidLink);
											}
										}
										
										// Keep track of how many raids match the query so we can deal with pagination
										raidCount++;
										if (raidFilter.count != "undefined" && raidCount % raidFilter.count == 0) {resultsPage++;raidCount=0;}
										
										// Once we've collected enough links, bail
										// If count is not set, we'll only break when we've iterated over all raids
										if (raidLinks.length == raidFilter.count)
										{
											break;
										}
									}
								}
								catch(ex)
								{
									console.warn(ex);
									console.warn("Failure while trying to match ");
									console.warn(
										{
											age: commandStartTime - raidData.firstSeen,
											difficulty: raidLink.difficulty,
											fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: raidCount
										}
									);
								}
							}
						}
						
						Timer.stop("fetchByFilter");
	
						// Return all found links
						return raidLinks;
					}
				}
				catch (ex)
				{
					console.warn("Failed to lookup raids by ");
					console.warn(filterParam);
					console.warn(ex);
				}
				Timer.stop("fetchByFilter");
			},
			
			markByFilter: function(filter, state) {
				Timer.start("markByFilter");
				
				if (typeof filter === "string") {
					filter = new RaidMultiFilter(filter);
				}
				
				if (typeof state === "string") {
					state = RaidManager.STATE.valueOf(state.toUpperCase());
				}
				
				// Count of raids seen
				var raidCount = 0;
				
				// If the command makes a valid filter
				if (filter.isValid())
				{
					// Get all raids
					Timer.start("markByFilter > loading hardRaidStorage");
					// Load up the storage object
					var raidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));
					Timer.stop("markByFilter > loading hardRaidStorage");
					
					// Count of raids seen
					var resultsPage = 1;
					
					// Start time of the run
					var commandStartTime = (new Date() / 1);
					
					// Iterate over all raids
					for (var key in raidStorage)
					{
						// Get the raid data from storage
						var raidData = raidStorage[key];
						
						// Get the link from the data
						var raidLink = raidData.raidLink;
						
						// Convert to RaidLink
						Object.extend(raidLink, RaidLink.prototype);
						
						// Get the state of the link
						var currentState;
						if (typeof raidData.stateId != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.stateId);
						}
						else if (typeof raidData.state != "undefined" && typeof raidData.state.text != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.state.text);
						}
						
						if (typeof currentState == "undefined")
						{
							console.warn("Could not locate a state for " + raidLink.getSimpleText() + ". This may cause unexpected matching behavior.");
						}
						
						try
						{
							// If this link matches the filter
							if (filter.matches(
								{
									age: commandStartTime - raidData.firstSeen,
									difficulty: raidLink.difficulty,
                                    fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
                                    os:  raidLink.getRaid().getOptimalShare(raidLink.difficulty),
									name: raidLink.getRaid().getSearchableName(),
									state: currentState,
									count: raidCount,
									size: raidLink.getRaid().size,
									zone: raidLink.getRaid().zone
								}
								))
							{
								raidData.stateId = state.id;
								
								// Keep track of how many raids match the query so we can deal with pagination
								raidCount++;
								if (filter.count != "undefined" && raidCount % filter.count == 0) {resultsPage++;raidCount=0;}
								
								// Once we've changed enough links, bail
								// If count is not set, we'll only break when we've iterated over all raids
								if (raidCount == filter.count)
								{
									break;
								}
							}
						}
						catch(ex)
						{
							console.warn(ex);
							console.warn("Failure while trying to match ");
							console.warn(
								{
									age: commandStartTime - raidData.firstSeen,
									difficulty: raidLink.difficulty,
									fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
									name: raidLink.getRaid().getSearchableName(),
									state: currentState,
									count: raidCount
								}
							);
						}
					}
					
					Timer.start("markByFilter > storing hardRaidStorage");
					// Store the storage data back into the browser storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(raidStorage));
					Timer.stop("markByFilter > storing hardRaidStorage");
				}
				
				Timer.stop("markByFilter");
				
				return raidCount;
			}
		}

