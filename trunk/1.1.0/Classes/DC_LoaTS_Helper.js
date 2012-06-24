		/************************************/
		/****** DC_LoaTS_Helper Class *******/
		/************************************/

		// Manager and runner class for this whole thing
		// This is a PrototypeJS class. Kongregate uses the Prototype libraries, so we don't
		// have to link them ourselves in this script
	    window.DC_LoaTS_Helper = Class.create({
	    		    	
	    	// Constructor
			initialize: function() {
				
				// Initialize the link storage
				RaidManager.init();
				
				// Whether or not to auto update
				var autoUpdate = GM_getValue(DC_LoaTS_Properties.storage.autoUpdate);
				
				// If we don't have a set value for auto update
				if (typeof autoUpdate == "undefined")
				{
					// Default to true
					autoUpdate = true;
					GM_getValue(DC_LoaTS_Properties.storage.autoUpdate, true);
				}
				
				// If we're auto update checking
				if (autoUpdate)
				{
					// Check for updates
					DC_LoaTS_Helper.checkForUpdates();
				}
				
				// Get the raid link for the current page
				var currentPageLink = new RaidLink(window.location.href);
				
				// Check to see if this is a raid link
				if (currentPageLink.isValid())
				{
					// Store this page as visited
					RaidManager.store(currentPageLink, RaidManager.STATE.VISITED);
				}
				
				// Show the raid toolbar
				RaidToolbar.show();
				
				
				// ChatDialogue is the Kongregate ChatDialogue class that is part of the Kongregate Holodeck
				// See: http://www.kongregate.com/javascripts/holodeck/chat_dialogue.js for readable source
				// We're going to take the normal function that displays a chat message and move it so that
				// we can intercept chat messages and reformat them.
				ChatDialogue.prototype.DC_LoaTS_displayUnsanitizedMessage = ChatDialogue.prototype.displayUnsanitizedMessage;
							
				// Define the NEW function that will display chat messages (we call the old function at the end
				// this is just a reformatter for the better LoaTS links)
				// params:
				// user - user name of the user who sent the message
				// message - message text
				// attributes - an object that usually is undefined, but somtimes contains {class: "CSSclassname"} among others
				// options - Mostly for use with private messages
				ChatDialogue.prototype.displayUnsanitizedMessage = function(user, msg, attributes, options)
				{
					Timer.start("Process Message");
					// Be careful not to reprocess messages that we ourselves sent
					if (user.toLowerCase() != "raidbot")
					{
						// Just in case we need it
						var originalMsg = msg;
						
						// Try to create a RaidLink from this message
						var raidLink = new RaidLink(msg);
						
						// Make sure we haven't already put a raid link in here and the link we found was valid
						if (msg.indexOf("<span class=\"raidMessage\"") == -1 && raidLink.isValid())
						{
							// Retrieve the message format
							var messageFormat = DC_LoaTS_Helper.getMessageFormat();
							
							// Retrieve the anchor tag format
							var linkFormat = DC_LoaTS_Helper.getLinkFormat();
							
							// Mark the link visited if the current user posted
							if (user == holodeck._active_user._attributes._object.username)
							{
								// Store this link as visted
								RaidManager.store(raidLink, RaidManager.STATE.VISITED);
							}
							else
							{
								// Store this link as-is and let raid manager decide its state
								RaidManager.store(raidLink);
							}
							
							// Get the new message after formatting is applied
							var newMessage = raidLink.getFormattedRaidLink(messageFormat, linkFormat).trim();
							
							// We don't want to totally blow away the message, though, because people do write text in there some times
							msg = msg.replace(/<a(?:(?!<a class="reply_link).)*<\/a>/i, newMessage);
							
							// This means our replace didn't catch it, must be IE link
							if (msg == originalMsg)
							{
								//TODO: Missed this case
								//http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&amp;kv_difficulty=4&amp;kv_hash=Bil9M7W0s5&amp;kv_raid_boss=centurian_sentinel&amp;kv_raid_id=2969908","Legacy\u00a0of\u00a0a\u00a0T……
								//http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty=4&kv_hash=Nw3p60d02T&kv_raid_boss=kalaxian_cult_mistress&kv_raid_id=3293614

								//s["http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty=4&kv_hash=4cc5r5FTXh&kv_raid_boss=kalaxian_cult_mistress&kv_raid_id=3315012","Legacy of a Thousand Sun…
								
								//s["http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty=4&kv_hash=VRoC7Po8CD&kv_raid_boss=kalaxian_cult_mistress&kv_raid_id=3324329","Legacy of a Thousand Sun…


								msg = msg.replace(RaidLink.backupLinkReplacementPattern, newMessage);
							}
							
							// If still didn't get it, note the problem
							if (msg == originalMsg)
							{
								console.warn("Failed to replace raid link in chat text");
								console.warn(raidLink);
								console.warn($A(arguments));
							}
							
							// Extra debugging bit for a very specific weird behavior
							if (typeof raidLink.getRaid() == "undefined" || typeof raidLink.getRaid().fullName == "undefined" || raidLink.getRaid().fullName === "undefined")
							{
								console.warn("Bad Raid link");
								console.warn(raidLink);
								console.warn($A(arguments));
							}
						}
					}
					
					// Make sure to run the normal version of this function because
					// it does all the heavy lifting for actually displaying the right string
					// and since we can't control what other scripts and addons have also replaced it
					this.DC_LoaTS_displayUnsanitizedMessage(user, msg, attributes, options);
					Timer.stop("Process Message");
				}
								
				// Take all the chat commands and register them with Kongregate
				for (var commandName in DC_LoaTS_Helper.chatCommands)
				{
					// Get the command
					var command = DC_LoaTS_Helper.chatCommands[commandName];
					
					// If there's really a command for this name
					if (typeof command != "undefined")
					{
						// Create a command factory for this command
						var commandFactory = new RaidCommandFactory(command, "chat");
						
						// Attach the command factory to the holodeck callback
						holodeck.addChatCommand(commandName, commandFactory.createAndExecuteCommand.bind(commandFactory));
					}
				}
				
				// We want to intercept whispers to the raid bot and alias commands
				// What we're going to do here is snag any attempt to execute a command
				// before that command is actually run. Then, we can either capture it
				// and keep it from running at all, change it to run how we want (aliases),
				// or send the command on as intended (like non-raidbot whispers)
				holodeck.DC_LoaTS_processChatCommand = holodeck.processChatCommand;
				holodeck.processChatCommand = function(str)
				{
					// Assume it's not /w RaidBot
					var raidBotWhisper = false;
					
					// If this is a RaidBot whisper, or someone failed to /w
					if (str.substring(0,10).toLowerCase() == "/w raidbot"
						||
						str.substring(0,8).toLowerCase() == "/raidbot"
					   )
					{
						// Grab the command
						var command = str.substring(11).trim();
						
						// If there was no command or the command was help
						if (command.length == 0 || command.toLowerCase() == "help")
						{
							// Print out the about script screen
							return DC_LoaTS_Helper.printScriptHelp(holodeck, command);
						}
						// If this has a real command in it
						else
						{
							// Make sure it started with a /
							if (command.charAt(0) != '/')
							{
								command = "/" + command;
							}
							
							// Process the command as if it was a normal command
							str = command;
						}
						
						// This supressed the command going to chat, even on failure
						// and even if a real command is not found by that name
						raidBotWhisper = true;
					}
					
					//TODO: This process could be optimized a bit when the user starts out using the official command name
					// Iterate over the commands to find their aliases
					for (var commandName in DC_LoaTS_Helper.chatCommands)
					{
						DCDebug(commandName);
						// If the regular command name is here, just use that
						if (new RegExp("^\/" + commandName + "\\b", "i").test(str))
						{
							// Stop trying to find aliases
							break;
						}
						// Not this real command name. Check its aliases.
						else
						{
							// Grab the aliases for this command
							var aliases = DC_LoaTS_Helper.chatCommands[commandName].aliases;
							
							// If there are actually any aliases
							if (typeof aliases != "undefined")
							{
								// For each alias
								for (var i = 0; i < aliases.length; i++)
								{
									// Get this alias
									var alias = aliases[i];
									
									// If we found an alias
									if (new RegExp("^\/" + alias + "\\b", "i").test(str))
									{
										// Redirect to the official command
										str = str.replace(new RegExp(alias, "i"), commandName);
									}
								}
							}
						}
					}
					
					// Capture the resulting state of the chat command
					var chatCommandResult = holodeck.DC_LoaTS_processChatCommand(str);
					DCDebug("Chat Command Result for " + str + ": ");
					DCDebug(chatCommandResult);
					
					// If it was a /w RaidBot but we didn't find a command
					if (raidBotWhisper && chatCommandResult)
					{
						// Let the user know the command failed
						holodeck.activeDialogue().raidBotMessage("Did not understand command: <code>" + str + "</code>");
					}
					
					// Only pass the message along if it wasn't a /w RaidBot and it's not a command
					return !raidBotWhisper && chatCommandResult;
				}
		    } // End initialize
	    });	
	    
	    // Retrieve the message format
	    DC_LoaTS_Helper.getMessageFormat = function()
	    {
	    	// Retrieve the message format
			var messageFormat = GM_getValue(DC_LoaTS_Properties.storage.messageFormat);

			// Fall back to default messageFormat if necessary
			if (typeof messageFormat == "undefined" || messageFormat.trim().length == 0)
			{
				messageFormat = RaidLink.defaultMessageFormat;
				GM_setValue(DC_LoaTS_Properties.storage.messageFormat, messageFormat);
			}
			return messageFormat;	
	    }
	    
	    // Set the message format
	    DC_LoaTS_Helper.setMessageFormat = function(messageFormat)
	    {
			// Fall back to default messageFormat if necessary
			if (typeof messageFormat == "undefined" || messageFormat.trim().length == 0)
			{
				messageFormat = RaidLink.defaultMessageFormat;
			}
			
			// Set the message format
			GM_setValue(DC_LoaTS_Properties.storage.messageFormat, messageFormat);
	    }
	    
	    // Retrieve the link format
	    DC_LoaTS_Helper.getLinkFormat = function()
	    {
			// Retrieve the boolean of whether or not we're using a custom link format
			var customLinkFormatBool = GM_getValue(DC_LoaTS_Properties.storage.customLinkFormatBool);
			
			// If we are using a custom link format
			if (customLinkFormatBool == true)
			{
				// Retrieve the custom anchor tag format
				var linkFormat = GM_getValue(DC_LoaTS_Properties.storage.linkFormat);
				
				// Fall back to default linkFormat if necessary or update old default
				if (typeof linkFormat == "undefined" || linkFormat.trim().length == 0 || linkFormat.trim() == RaidLink.defaultLinkFormat_v1)
				{
					linkFormat = RaidLink.defaultLinkFormat_v2;
					GM_setValue(DC_LoaTS_Properties.storage.linkFormat, linkFormat);
				}
			}
			else
			{
				if (typeof customLinkFormatBool == "undefined")
				{
					GM_setValue(DC_LoaTS_Properties.storage.customLinkFormatBool, false);
				}
				
				linkFormat = RaidLink.defaultLinkFormat_v2;
			}
			return linkFormat;
	    }
	    
	    // Retrieve a preference value from storage
	    DC_LoaTS_Helper.getPref = function(prefName)
	    {
	    	// Fetch the json
	    	var json = GM_getValue(DC_LoaTS_Properties.storage.behaviorPrefs);
	    	
	    	// Make sure there's JSON
	    	if (typeof json == "undefined" || json.length == 0)
	    	{
				json = "{}";
	    	}
	    	
	    	var ret;
	    	try
	    	{
	    		var prefs = JSON.parse(json);
	    		ret = prefs[prefName];
	    	}
	    	catch(ex)
	    	{
	    		console.warn("Could not parse prefs to find " + prefName);
	    		console.warn(ex);
	    	}
	    	
	    	return ret;
	    }
	    
	    // Store a preference value into storage
	    DC_LoaTS_Helper.setPref = function(prefName, value)
	    {
	    	// Fetch the json
	    	var json = GM_getValue(DC_LoaTS_Properties.storage.behaviorPrefs);
	    	
	    	// Make sure there's JSON
	    	if (typeof json == "undefined" || json.length == 0)
	    	{
				json = "{}";
	    	}
	    	
	    	// Store value
	    	try
	    	{
	    		var prefs = JSON.parse(json);
	    		prefs[prefName] = value;
	    		GM_setValue(DC_LoaTS_Properties.storage.behaviorPrefs, JSON.stringify(prefs));
	    	}
	    	catch(ex)
	    	{
	    		console.warn("Could not parse prefs to store " + prefName + ": " + value);
	    		console.warn(ex);
	    	}
	    }
	    
	    // Find all raid types matching a given filter
	    DC_LoaTS_Helper.getRaidTypes = function(raidFilter)
	    {
	    	// We're going to return an array of raid types that match
	    	var matchedTypes = [];
	    	
			// Iterate over all raids
			for (var raidId in DC_LoaTS_Helper.raids)
			{
				// Get the current raid
				var raid = DC_LoaTS_Helper.raids[raidId];
				
				// If the user's text matches this raid name
				if (raidFilter.matches({name: raid.getSearchableName()}))
				{
					// Capture this raid to return
					matchedTypes.push(raid);
				}
			}
			
			return matchedTypes;
	    }
		
	    // Print the description of the script
	    DC_LoaTS_Helper.printScriptHelp = function(deck, text)
	    {
   			var helpText = "<b>Kongregate Legacy of a Thousand Suns Raid Link Helper for Chat</b>\n";
			helpText += "by <a href=\"" + DC_LoaTS_Properties.authorURL + "\">doomcat</a>\n";
			helpText += "\n";
			helpText += "<b>Script homepage:</b> <a href=\"" + DC_LoaTS_Properties.scriptURL + "\" target='_blank'>" + DC_LoaTS_Properties.scriptURL + "</a>\n";
			helpText += "<b>Script Docs:</b> <a href=\"" + DC_LoaTS_Properties.docsURL + "\" target='_blank'>" + DC_LoaTS_Properties.docsURL + "</a>\n";
			helpText += "<b>Script Chatzy:</b> <a href=\"" + DC_LoaTS_Properties.chatzyURL + "\" target='_blank'>" + DC_LoaTS_Properties.chatzyURL + "</a>\n";
			helpText += "\n";
			helpText += "<span class=\"DC_LoaTS_versionWrapper\">";
			// If we've checked for version before
			if (typeof DC_LoaTS_Helper.needUpdateState != "undefined")
			{
				// If it's time to update
				if (DC_LoaTS_Helper.needUpdateState == "old")
				{
					helpText += DC_LoaTS_Helper.needUpdateText + "\n";
					helpText += "\n";
					helpText += "\n";
					helpText += "<span class='clearfix'>";
					helpText += "<span style='float:left; padding-top: 5px;'>Update now?</span>";
					helpText += "<span style='float:right;'><a class='DC_LoaTS_updateLink' href='http://userscripts.org/scripts/source/124753.user.js' target='_blank'>Update</a></span>";
				}
				// If the user has a newer than public version
				else if (DC_LoaTS_Helper.needUpdateState == "new")
				{
					helpText += DC_LoaTS_Helper.needUpdateText + "\n";
					helpText += "\n";
				}
				// Either current or some kind of failure
				else
				{
					helpText += "<b>Version:</b> " + DC_LoaTS_Helper.needUpdateText + "\n";
					helpText += "\n";
					helpText += "\n";
					helpText += "<span class='clearfix'>";
					helpText += "<span style='float:left; padding-top: 5px;'>Check for updates?</span>";
					helpText += "<span style='float:right;'><a class='DC_LoaTS_updateLink DC_LoaTS_updateNotRun' onclick='DC_LoaTS_Helper.checkForUpdates(); return false' href='#' target='_blank'>Check now</a></span>";
				}
				
			}
			// We don't really know what the current version is
			else
			{
					
				helpText += "<b>Version:</b> " + DC_LoaTS_Properties.version + "\n";
				helpText += "\n";
				helpText += "\n";
				helpText += "<span class='clearfix'>";
				helpText += "<span style='float:left; padding-top: 5px;'>Check for updates?</span>";
				helpText += "<span style='float:right;'><a class='DC_LoaTS_updateLink DC_LoaTS_updateNotRun' onclick='DC_LoaTS_Helper.checkForUpdates(); return false' href='#' target='_blank'>Check now</a></span>";
			}
			
			helpText += "</span>";
			helpText += "\n";
			helpText += "\n";
			helpText += "</span>";
			helpText += "\n";
			helpText += "<b>Commands:</b>\n";
			helpText += "\n";
			
			for (var commandName in DC_LoaTS_Helper.chatCommands)
			{
				var command = DC_LoaTS_Helper.chatCommands[commandName];
				if (typeof command.doNotEnumerateInHelp == "undefined" || command.doNotEnumerateInHelp === false)
				{
					if (typeof command.getParamText != "undefined")
					{
						helpText += "<code>/" + commandName + " " + command.getParamText() + "</code>\n";
					}
				}
			}
			
//			helpText += "<code>/raid raidname [difficulty]</code>\n";
//			helpText += "<code>/seenraids [raidname] [difficulty] [{state: stateName}]</code>\n";
//			helpText += "<code>/clearraids [raidname] [difficulty] [{state: stateName}]</code>\n";
//			helpText += "<code>/reload</code>\n";
//			helpText += "<code>/raidformat [newformat]</code>\n";
//			helpText += "<code>/loadraid url</code>\n";
//			helpText += "<code>/autoupdate [toggle]</code>\n";
			helpText += "\n";
			helpText += "All commands can do <code>/commandname help</code> to learn more about them. Brackets <code>[]</code> indicate optional parameters; don't actually put brackets in your commands, please.\n";
			deck.activeDialogue().raidBotMessage(helpText);
			
			
			return false;
	    }	
	DC_LoaTS_Helper.chatCommands = {};

