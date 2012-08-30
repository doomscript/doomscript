
// ==UserScript==
// @name           Kongregate Legacy of a Thousand Suns Raid Link Helper
// @namespace      tag://kongregate
// @description    Improves the text of raid links and stuff
// @author         doomcat
// @version        1.1.1
// @date           02.01.2012
// @include        http://www.kongregate.com/games/*/*
// ==/UserScript== 

/**********************************************\
|** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **|
|** !!!!!!!!!! NOTE TO DEVELOPERS !!!!!!!!!! **|
|** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **|
|** !!!!!! If you fork this script,   !!!!!! **|
|** !!!!!! please change raidStorage  !!!!!! **|
|** !!!!!! in  DC_LoaTS_Properties    !!!!!! **|
|** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **|
\**********************************************/


/**
Change Log:

2012.02.01 - 1.0.0
Initial Version

2012.02.03 - 1.0.1
Quick add of a single missing id

2012.02.06 - 1.0.2
Code Cleanup
Added a bunch of comments for non-code people to convince themselves it isn't a virus
As far as I've heard, it works as designed in Chrome and FF on Mac and Win
Added Additional Alliance raid ids.

2012.02.06 - 1.0.3
All Public raid ids are in as far as I know, including the new Vince Vortex. Still missing some alliance ids.
Should now work in Opera.

2012.02.07 - 1.0.4
Added in FairShare calculation for raid

2012.02.09 - 1.0.5
Added in /raid command

2012.02.14 - 1.0.6
Switched /raid command to report FS*2 instead of *3. Added additional alliance raid ids.

2012.02.16 - 1.0.7
Merged in code from SReject's branch http://userscripts.org/scripts/review/125847
SReject's code adds the ability to click raid links and have them load in the same window, no refresh
Based on SReject's code, added /loadraid command
Moderately sized internal code refactors

2012.02.21 - 1.0.8
Added in /raidformat command
Added in /reload command
Fixed some trouble with /loadraid
All commands can now do /command help to learn more about the command
Minor refactors to improve code versatility

2012.02.22 - 1.0.9
Mistaken name on Mercury Raid
Added debugging for bizarre error that can happen only occasionally. 
Now remembers which raids were posted
Target damage is now possible to add to raid links as {target}
Added /seenraids command
Added /clearraids command
Added /raidformat reset
Replaced FS*2 with Target Damage in /raid desriptions

2012.02.22 - 1.0.10
Fixed bug that links from /seenraids refreshed the whole page
Added command /raidhelp
Added /w RaidBot help and /w RaidBot command
Added ability to do regex in /seenraids name
/seenraids will put visited raids to the top of the list

2012.02.27 - 1.0.11
Lots of formatting tweaks in help texts
Commented RaidManager code
Added /clearraids name difficulty {state: stateName}
Added /seenraids name difficulty {state: stateName}
Added update button to /raidhelp aka /w RaidBot help
Automatically checks for new versions. Will show in banner at top.
Finally compiled all known raid ids into script

2012.02.29 - 1.0.12
Fixed collision of hashes - apparently they aren't unique
Fixed typo in /seenraids and /clearraids where all raids were being shown incorrectly
Improved automatic update to popdown include notification bar
Added /autoupdate command
Added /loadraids as alias to /loadraid
Now links you load will update all throughout chat

2012.03.03 - 1.0.13
Fixed slow down of raids as posted
Improved memory usage in long term seen storage
Improved internal processing of raids
Added simple additional filters {age}, {count}, {page}

2012.03.08 - 1.0.14
Fixed a couple of minor reported bugs
Significantly improved speed of /seenraids
When changing the raid format, chat will update all other links in the chat, too
Removed backward compatibilty of old hash indexed raids since those should have all expired by now

2012.04.23 - 1.1.0
-- First Alpha Release: 2012-04-23
First parts of the omnibox UI added
First parts of the raid menu UI added
Added {diff} as a raidformat to get N, H, L, and NM instead of full text difficulties
Added {health}, {time}, {optimal} (alias of target), {ofs} (alias of target), {short-name}, 
	{shorter-name}, {zone}, {cache-state-nice}, and {cache-state-short} to Raid Format options
Completely reworked many parts of the internal structure of the code to make alterations by others easier
Locked script to just the Kongregate game page. Script no longer activates on other games.
Added Zone, Time Limit, Official Short Name, and Unofficial Short name to raids.
Corrected some minor errors in raid information, mainly alliance and world raid.
Attempted to better comment internal code for future extension by others
Raid links are now aged off at each raids length instead of blanket 200 hours.
Fixed health and FS for non-standard health pattern raids (currently Wahsh and Pox)
Added "/linkstate url state" command to force change a link's state, as in /linkstate http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_raid_boss=telemachus&kv_difficulty=4&kv_raid_id=2769083&kv_hash=9Bo4uUiWIM visited to set that tele to visited
Added "/wiki searchTerm" to open a page to the wiki like /wiki Snuuth Obliterator
-- Second Alpha Release: 2012-04-26
Shift-clicking a link now cycles through all states for that link
Migrated remaining commands over to new command format
/command help should now contain clickable links for examples
/clearraids without parameters will no longer clear all raids. Use /clearraids all
Added a template command in the new command style in order for others to create custom /commands
Moved {visited} format to use standard text
Added {visited-short} format
Slight rework and improvement to custom command creation
Corrected bug where visited state was getting overwritten by unseen
Omnibox should now appropriately respond (at least basically) to all commands
Pox optimum damage set to 20 epics
Fixed missing aliases in help text
Added first version of /farmvalue command. Needs work to be solid.
-- Third Alpha Release: 2012-05-22
Pox FS and Target were still broken. They should really be fixed for real now.
Added simple /time command to display server time. Works nicely in the omnibox.
Added a catch for just incase you /raidbot instead of /w raidbot. They both work the same way.
Added an attempt to recover from corrupted raid link storage. Quarantines old storage for examination and clears current bad storage
Made RaidMenu movable
Added Right-click visited option to preferences menu
Added /farmvalue command for simple hard-coded dump of info from spreadsheet
Added very simple implementation of live search in Raids tab
Fixed wiki commands making double entries in the omnibox autocomplete
-- Fourth Alpha Release: 2012-06-13
Altered RaidLink constructor parameter order - now is id, hash, diff, boss. No longer need all 4, just the first 2
RaidMenu tabs kind of respect tabPosition now, depending on browser. Will implement real solution later.
In some browsers, the script appeared to load a number of times only to fail. Most of these should no longer run.
Added first version of raid format into the raid menu
Added a simple /update command for those that get confused between scripts. Will eventually like to have the command do more.
Files are now in an Assembla SVN repo: http://subversion.assembla.com/svn/doomscript/
Now using Trac for bug tracking: http://trac.assembla.com/doomscript
Todos all moved to ticketing system.
Added Z10 raids, first pasee
-- Fifth Alpha Release: 2012-06-25
Removed kv_action_type=raidhelp from the required parameters of the link due to changes in SReject's spammer
Added game specific icons in place of generic LoTS icon
Can now /raid raidName 0 to get base info about a raid that doesn't change with health
Fixed bug with command aliases being case sensitive. /SEENRAID colo should now work.
Added /clearchat command
Added /raidstyle command
Kong added some padding to their text boxes that has now been removed from the Omnibox

2012.08.01 - 1.1.0 Stable
Too much to even list. See above and tickets.


2012.08.29 - 1.1.1 
Updated Skorzeny and Temple info
Updated to add Gut-Phager raid
*/

// Wrapper function for the whole thing. This gets extracted into the HTML of the page.
function main()
{
	// Properties for this script
	window.DC_LoaTS_Properties = {
		// Script info
    	version: "1.1.1",
    	
    	authorURL: "http://www.kongregate.com/accounts/doomcat",
    	updateURL: "http://www.kongregate.com/accounts/doomcat.chat",
    	scriptURL: "http://userscripts.org/scripts/show/124753",
    	scriptDownloadURL: "http://userscripts.org/scripts/source/124753.user.js",
    	docsURL: "http://www.tinyurl.com/doomscript-docs",
    	chatzyURL: "http://us5.chatzy.com/46964896557502",
    	
    	farmSpreadsheetURL: "https://docs.google.com/spreadsheet/ccc?key=0AoPyAHGDsRjhdGYzalZZdTBpYk1DS1M3TjVvYWRwcGc&hl=en_US#gid=4",
    	
    	debugMode: false,
    	
    	// GreaseMonkey Storage Keys
    	storage: {
	    	// Auto Update
	    	autoUpdate: "DC_LoaTS_autoUpdate",
	    	
	    	// Format of messages in chat
	    	messageFormat: "DC_LoaTS_messageFormat",

	    	// Format of links in chat
	    	linkFormat: "DC_LoaTS_linkFormat",
	    	
	    	// Format of links in chat
	    	customLinkFormatBool: "DC_LoaTS_customLinkFormatBool",
	    	
	    	// Overall container for raid link storage
	    	raidStorage: "RaidManager_doomcat_v1",
	    	
	    	// RaidType Specific preferences
	    	raidPrefs: "DC_LoaTS_raidPreferences",
	    	
	    	// General script behaviour preferences
	    	behaviorPrefs: "DC_LoaTS_behaviorPreferences",
	    	
	    	// Quarantine addendum
	    	quarantine: "_quarantine"
    	}
	};

	
	// Class declaring function for Opera compatibility
	function declareClasses()
	{
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
							
							// Make sure attributes exists
							if (typeof attributes === "undefined")
							{
								attributes = {};
							}
							
							// Make sure attributes.class exists
							if (typeof attributes["class"] === "undefined")
							{
								attributes["class"] = "";
							}
							
							// Get the className of the link
							var className = raidLink.getMatchedStyles().className;
							if (typeof className !== "undefined")
							{
								attributes["class"] += className;
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
				};
								
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
				}; // End Replacement displayUnsanitizedMessage
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
			
			// Iterate over all commands and display their summaries
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
			
			helpText += "\n";
			helpText += "All commands can do <code>/commandname help</code> to learn more about them. Brackets <code>[]</code> indicate optional parameters; don't actually put brackets in your commands, please.\n";
			deck.activeDialogue().raidBotMessage(helpText);
			
			
			return false;
	    }
	    
	DC_LoaTS_Helper.chatCommands = {};
	DC_LoaTS_Helper.raidStyles = {};

		/************************************/
		/********* RaidButton Class *********/
		/************************************/
		
		window.RaidButton = Class.create({
			initialize: function(name, className, callback)
			{
				this.name = name;
				this.callback = callback;
				this.node = new Element("li");
				this.anchor = new Element("a", {"class": "DC_LoaTS_button " + className});
				this.anchor.observe("click", function(clickEvent)
				{
					this.execute(clickEvent);
				}.bindAsEventListener(this));
				
				this.node.insert({bottom: this.anchor});
			},
			
			execute: function(clickEvent)
			{
				this.callback(clickEvent);
			}
			
		});

		/************************************/
		/********* RaidCommand Class ********/
		/************************************/
		
		// Mainly located by the omnibox iterating over all commands checking to see what matches
		// and each of these being hard assigned to their names for the chat commands
		
		window.RaidCommand = Class.create({
			initialize: function(context, commandText)
			{
				this.context = context;
				this.isHelp = false;
				
				if (typeof commandText != "undefined")
				{
					this.processText(commandText);
				}
			},
			
			processText: function (commandText)
			{
				this.commandText = commandText;
				this.processedText = this.commandText;
				
				DCDebug("processing text: " + this.processedText);
				if (this.processedText.charAt(0) == '/')
				{
					this.processedText = this.processedText.substring(1);
				}
				
				DCDebug("Checking " + this.processedText.toLowerCase() + " for " + this.getName() + " result: "  + this.processedText.toLowerCase().indexOf(this.getName()));
				
				// If the command was explicitly provided, we need to strip it
				if (this.processedText.toLowerCase().indexOf(this.getName()) == 0)
				{
					this.processedText = this.processedText.substring(this.getName().length);
				}
				else 
				{
					for (var i = 0; i < this.aliases.length; i++)
					{
						var alias = this.aliases[i];
						if (this.processedText.toLowerCase().indexOf(alias) == 0)
						{
							this.processedText = this.processedText.substring(alias.length);
						}
					}
				}
				
				// Now processed text should just be the params. Need to trim the whitespace
				this.processedText = this.processedText.trim();
				
				// Reassemble the normalized commandText				
				this.commandText = "/" + this.getName() + " " + this.processedText;
				
//				DCDebug("command text: \"" + this.commandText + "\"");
//				DCDebug("processed text: \"" + this.processedText + "\"");
				
				// Check for help
				if (this.processedText.toLowerCase() == "help")
				{
//					DCDebug("This command is for help.");
					this.isHelp = true;
				}
				// Not a help command
				else
				{
//					DCDebug("Parsing Class:");
//					DCDebug(this.parsingClass);
					// With the params, get the parser
					if (typeof this.parsingClass != "undefined")
					{
						this.parser = new this.parsingClass(this.processedText);
//						DCDebug("Parser:");
//						DCDebug(this.parser);
					}
				}
			},
			
			// Get the param text for help
			getParamText: function()
			{
				return this.constructor.getParamText();
			},
			
			// Get all the names for this command, including both it's actual name and aliases
			getNames: function()
			{
				return [this.getName()].concat(this.aliases);
			},
			
			// Get the name of this command
			getName: function()
			{
				return this.constructor.commandName;
			},
			
			// Get the help text for the command
			getHelpText: function()
			{
				// Default help text to say there isn't help text
				var helpText = "This command does not have any additional help.";
				
				// If the subclass has help text
				if (typeof this.buildHelpText != "undefined")
				{
					// Grab it and set it to be our returned help text
					helpText = this.buildHelpText();
				}
				
				// Append any aliases this command has
				helpText += "\n"
				helpText += "<b>Aliases:</b> " + this.getAliasesText() + "\n";

				return helpText;
			},
			
			// See if the assigned parser has valid params
			//FIXME - Does not work and/or is not used
			isValid: function()
			{
				var valid = true;
				if (typeof this.parsingClass != "undefined")
				{
					var parser = new this.parsingClass(params);
					valid = parser.isValid();
				}
			
				return valid;
			},
			
			// Get the text for all the aliases of this command. Aliases are wrapped in <code></code>tags
			getAliasesText: function()
			{
				var aliasesText = "";
				
				// If there are any aliases
				if (typeof this.aliases != "undefined" && this.aliases.length > 0)
				{
					// Add all the aliases in
					for (var i = 0; i < this.aliases.length; i++)
					{
						// Format the alias
						aliasesText += "<code>/" + this.aliases[i] + "<code>";
						
						// Add commas as necessary
						if (i < this.aliases.length - 1)
						{
							aliasesText += ", ";
						}
					}
				}
				// No aliases
				else
				{
					aliasesText = "None.";
				}
				
				return aliasesText;
			},
			
			// Get a text link to this command
			getCommandLink: function(params, displayText)
			{
				return DC_LoaTS_Helper.getCommandLink("/" + this.getName() + " " + params, displayText);
			},
			
			// Get the drop down menu options for this command
			getOptions: function()
			{
				var commandOptions = {
					
					initialText: {
						text: this.commandName,
						callback: function()
						{
							console.log("mainOption " + this.commandName);
						}
					},
					
					secondOption: {
						text: "Option #2",
						callback: function()
						{
							console.log("secondOption " + this.commandName);
						}
					}
					
				};
				
				return commandOptions;
			},
			
			// Gets the full HTML line for this command's options
			getOptionLine: function(oldLine)
			{
				var commandOptions = this.getOptions();
				
				var line;
				// If we're operating on an existing line
				if (typeof oldLine != "undefined")
				{
					// Put new stuff back into this line
					line = oldLine;
					
					// Clear everything old from this line
					line.childElements().invoke("remove");
				}
				// If there is no existing line
				else
				{
					// Make a new line
					line = new Element("li");
				}
				
				var subOptions = new Element("div", {style: "float: right;"});
				
				var config = commandOptions.config || {};
				
				for (var optionName in commandOptions)
				{
					// Configuration is obviously not a real option
					if (optionName.toLowerCase() == "config")
					{
						continue;
					}
					
					var option = commandOptions[optionName];
										
					var textHolder;
					if (typeof option.callback != "undefined" || typeof option.linkParams != "undefined" || false !== option.executable)
					{	
						
						var linkParams = {"href": "#", "class": "DC_LoaTS_omniboxOption DC_LoaTS_" + optionName.toLowerCase()};
						if (typeof option.linkParams != "undefined")
						{
							for (var paramName in option.linkParams)
							{
								linkParams[paramName] = option.linkParams[paramName];
							}
						}
						
						textHolder = new Element("a", linkParams);
												
						
						textHolder.onclick = function(option)
											 {
					 							if (typeof option.callback != "undefined")
					 							{
													option.callback.apply(this);
					 							}
											 	this.execute(option.doNotCallHandler); 
											 	return (typeof option.followLink != "undefined")?option.followLink:false;
											 }.bind(this, option);
					}
					else
					{
						textHolder = new Element("div", {"class": "DC_LoaTS_" + optionName.toLowerCase()});
					}
					
					if (typeof option.text != "undefined")
					{
						textHolder.update(option.text);
					}
					
					if (optionName == "initialText")
					{
						line.insert({bottom: textHolder});
					}
					else 
					{
						subOptions.insert({bottom: textHolder});
					}
				}
				
				if (subOptions.children.length > 0)
				{
					line.insert({bottom: subOptions});
				}
				else
				{
					line.children[0].setStyle({"float":"none"});
				}
//				
//				var children = $A(line.immediateDescendants());
//				var currentTallest = 0;
//				
//				for (i = 0; i < children.length; i++)
//				{
//			        if (children[i].getHeight() > currentTallest)
//			        {
//		                currentTallest = children[i].getHeight();
//			        }
//				}
//				
//				for (i = 0; i < children.length; i++)
//				{
//			        children[i].setStyle({ height: (currentTallest + 'px') });
//				}
//				
//				
				if (typeof config.refreshEvery == "number" && typeof this.omniboxOptionRefreshInterval == "undefined")
				{
					this.omniboxOptionRefreshInterval = setInterval(this.getOptionLine.bind(this, line), config.refreshEvery);
				}
				
				return line;
			},
			
			// Run this command
			execute: function(doNotCallHandler)
			{
				var ret = {};
				
				// Check for help
				if (this.isHelp == true)
				{
					DCDebug("Executing help for " + this.commandName);
					if (this.context == "chat" || true) //TODO: Remove || true
					{
						holodeck.activeDialogue().raidBotMessage(this.getHelpText());
					}
					else if (this.context == "omnibox")
					{
						console.log("Display help for " + this.commandName);
					}
					else
					{
						console.warn("Could not find help for command " + this.commandText + " in context " + this.context);
					}
				}
				// Not a help command
				else if (typeof doNotCallHandler === "undefined" || !doNotCallHandler)
				{
					DCDebug("Executing non-help for " + this.commandName + " doNotCallHandler: " + doNotCallHandler)
					if (typeof this.parser === "undefined" || (typeof this.parser.isValid === "function" && this.parser.isValid()))
					{
						ret = this.handler(holodeck, this.parser, this.processedText, this.commandText, this.context);
						
						if (typeof ret.statusMessage != "undefined")
						{
							if (this.context == "chat" || true) //TODO: Remove || true 
							{
								holodeck.activeDialogue().raidBotMessage(ret.statusMessage);
							}
							else if (this.context == "omnibox")
							{
								console.log("Display status message: " + ret.statusMessage);
							}
							else
							{
								console.warn("Could not display message " + ret.statusMessage + " for command " + this.commandText + " in context " + this.context);
							}
						}
						
						DCDebug("Command " + this.commandText + (ret.success===true?" Succeeded":" Failed"));
					}
					else
					{
						console.warn("Could not parse text " + this.commandText + " as command " + this.commandName + " in context " + this.context);
					}
				}
				
				ret.sendToChat = this.sendToChat && this.context == "chat";
				
				// Regardless of execution, we need to hide the command options
				RaidToolbar.hideCommandOptions();
				
				// Clear the omnibox, needs work
//				RaidToolbar.resetOmnibox();
				
				return ret;
			},
			
			// Called when the option is no longer in the suggested box
			onRemovedFromOmnibox: function()
			{
				DCDebug("Deactivating " + this.commandName);
				if (typeof this.omniboxOptionRefreshInterval != "undefined")
				{
					clearInterval(this.omniboxOptionRefreshInterval);
					delete this.omniboxOptionRefreshInterval;
				}
			}
		});
		
		RaidCommand.create = function(classObject)
		{
			var commandClass = Class.create(RaidCommand, classObject);
			//TODO: Need to clean this up
			commandClass.commandName = classObject.commandName;
			commandClass.aliases = classObject.aliases;
			commandClass.paramText = classObject.paramText;
			commandClass.parsingClass = classObject.parsingClass;
			//TODO Implement OO framework at some point
			if (typeof commandClass.parsingClass !== "undefined" && typeof commandClass.parsingClass.prototype.isValid !== "function")
			{
				console.warn(commandClass.commandName + " Command Creation Error: Parser must have isValid method!");
			}
			commandClass.doNotEnumerateInHelp = classObject.doNotEnumerateInHelp;
			commandClass.getParamText = function()
			{
				// Assume empty
				var params = "";
				
				// If the command provided text, use that
				if (typeof this.paramText != "undefined")
				{
					params = this.paramText;
				}
				// If the parser can provide us param text, that's great, too
				else if (typeof this.parsingClass != "undefined" && typeof this.parsingClass.paramText == "string")
				{
					params = this.parsingClass.paramText;
				}
				else
				{
					DCDebug("No param text for " + this.commandName);
				}
				
				return params;
			}.bind(commandClass);
			
			
			
			DC_LoaTS_Helper.chatCommands[classObject.commandName] = commandClass;
		};
		
		/************************************/
		/****** RaidCommandFactory Class ****/
		/************************************/

		window.RaidCommandFactory = Class.create({
			
			/*public constructor*/ initialize: function(raidCommandClass, context)
			{
				this.raidCommandClass = raidCommandClass;
				this.context = context;
			},
			
			/*public RaidCommand*/ createCommand: function(text)
			{
				return new this.raidCommandClass(this.context, text);
			},
			
			// Returning true will send the message on to Kongregate chat
			// Returning false will stop the message from being sent
			/*public boolean*/ createAndExecuteCommand: function(deck, text)
			{
				var command = this.createCommand(text);
				DCDebug("Created Command " + this.raidCommandClass.commandName);
				var commandRet = command.execute();
				
				// If the commandRet has sendToChat set to true, the command text typed by the user,
				// 		(Not the command output text) will forward on to chat
				// otherwise, we default to absorbing the command locally
				return commandRet.sendToChat || false;
			}
			
			
		});
		
		/************************************/
		/********* RaidFilter Class *********/
		/************************************/
		
		// This class represents a filter on a raid search
		window.RaidFilter = Class.create({
			
			// Constructor
			initialize: function(filterText)
			{
				Timer.start("RaidFilter init");
				try
				{
					// Declare some vars for later
					this.name;
					this.difficulty;
					this.state;
					this.inverseState = false;
					this.age;
					this.count;
					this.page;
					this.fs;
					this.valid = true;
	
					// Capture original filterText
					this.filterText = filterText;
					
					// Pattern to pick apart the command for the name and id
					//TODO: /((?:[^{}\d]|[5-9]|\d*\.\d*)+)?\s*([0-4](?:\s*\|\s*[0-4]){0,4})?/
					var commandPattern = /([^0-4{}]+)? ?([0-4])? ?/;
	
					// Attempt to find the matches
					var match = commandPattern.exec(filterText);
					
					// If there were some matches
					if (match != null)
					{
						// If the raid command had a name
						if (typeof match[1] != "undefined")
						{
							this.name = match[1].trim();
						}
						
						// If the raid command had a difficulty
						if (typeof match[2] != "undefined")
						{
							this.difficulty = parseInt(match[2]);
						}
						
					}
					
					// Pattern to match everything that's currently in {filterType: paramValue} form
					var extraFiltersPattern = /(?:{(\w+)[:=]([^{}]+)} ?)/g;
					
					// For every additional parameter type
					while ((match = extraFiltersPattern.exec(filterText)) != null)
					{
						// Name of the param
						var filterType = match[1].trim().toLowerCase();
						
						// Value of the param
						var paramValue = match[2].trim();
						
						// Trace statement
						var traceStatement = "<code>{" + filterType + ":" + paramValue + "}</code> in <code>" + filterText + "</code>";
						
						// Based on the param type, parse the param value
						switch (filterType)
						{
							case "age":
								// Get the pieces of the age
								var match = RaidFilter.numberExpressionPattern.exec(paramValue);
								
								// If there were pieces to get
								if (match != null)
								{
									var condition = match[1];
									var num = parseInt(match[2]);
									
									// If the number wasn't really a number
									if (isNaN(num))
									{
										// Go to the next one.
										continue;
									}
									var period = match[3];
									
									// If there was a period
									if (typeof period != "undefined")
									{
										switch (period.toLowerCase())
										{
											case "d":
												// 24 hours in a day
												num *= 24;
											case "h":
												// 60 minutes in an hour
												num *= 60;
											case "m":
												// 60 seconds in a minute
												num *= 60;
											case "s":
												// 1000 ms in a second
												num *= 1000;
												break;
											case "ms":
												break;
											default:
												holodeck.activeDialogue().raidBotMessage("Did not understand unit of time <code>" + period + "</code>  for " + traceStatement);
												this.valid = false;
										}
									}
									// else no period, assume ms
									
									// Sanitize the condition. Default to <=
									condition = this.sanitizeConditional(condition, "<=");
									
									if (condition == "undefined")
									{
										holodeck.activeDialogue().raidBotMessage("Did not understand condition <code>" + condition + "</code>  for " + traceStatement);
										this.valid = false;
									}
								}
								else
								{
									// Notify the user that we don't know what that age is
									holodeck.activeDialogue().raidBotMessage("Did not understand " + filterType + " expression <code>" + paramValue + "</code> for " + traceStatement);
									this.valid = false;
								}
								this.age = condition + num;
								break;
							case "count":
								// If the number wasn't really a number
								if (isNaN(parseInt(paramValue)))
								{
									// Go to the next one.
									continue;
								}
								
								this.count = parseInt(paramValue);
								break;
							case "page":
								// If the number wasn't really a number
								if (isNaN(parseInt(paramValue)))
								{
									// Go to the next one.
									continue;
								}
								
								this.page = parseInt(paramValue);
								break;
							case "fs":
								var match = RaidFilter.numberExpressionPattern.exec(paramValue);
								
								if (match != null)
								{
									var condition = match[1];
									var num = parseInt(match[2]);
									
									// If the number wasn't really a number
									if (isNaN(num))
									{
										// Go to the next one.
										continue;
									}
									
									var magnitude = match[3];
									
									// If there was a magnitude
									if (typeof magnitude != "undefined")
									{
										switch (magnitude.toLowerCase())
										{
											case "t":
												num *= 1000;
											case "b":
												num *= 1000;
											case "m":
												num *= 1000;
											case "k":
												num *= 1000;
												break;
											default:
												holodeck.activeDialogue().raidBotMessage("Did not understand magnitude <code>" + magnitude + "</code>  for " + traceStatement);
												this.valid = false;
										}
									}
									// else no magnitude, assume fully written out damage
									
									// Sanitize the condition. Default to ==
									condition = this.sanitizeConditional(condition, "==");
									
									if (condition == "undefined")
									{
										holodeck.activeDialogue().raidBotMessage("Did not understand condition <code>" + condition + "</code>  for " + traceStatement);
										this.valid = false;
									}
								}
								else
								{
									// Notify the user that we don't know what that fs is
									holodeck.activeDialogue().raidBotMessage("Did not understand " + filterType + " expression " + traceStatement);
									this.valid = false;
								}
								this.fs = condition + num;
								break;
							case "state":
								var tmpStateText = paramValue;
							
								// Are we doing invese state?
								if (tmpStateText.charAt(0) == '!')
								{
									this.inverseState = true;
									tmpStateText = tmpStateText.substring(1);
								}
								
								// Lookup the state enum from the text
								this.state = RaidManager.STATE.valueOf(tmpStateText);
								
								// If the text didn't match any known state
								if (typeof this.state == "undefined")
								{
									// Notify the user that we don't know what that state is
									holodeck.activeDialogue().raidBotMessage("Did not understand state for "  + traceStatement);
									
									// No longer valid
									this.valid = false;
								}
								break;
							default:
								console.warn("Did not understand filter param " + match[1] + ":" + match[2]);
						}
					}
				}
				catch(ex)
				{
					console.warn("Failed to initialize RaidFilter with text " + filterText);
				}
				Timer.stop("RaidFilter init");
			},
			
			// Takes in a condition and sanitizes it for use in the filter
			sanitizeConditional: function(condition, defaultTo)
			{
				if (typeof condition != "undefined")
				{
					switch (condition)
					{
						case "=": 
							condition = "==";
							break;
						case "!":
							condition = "!=";
							break;
						case "<=":
						case ">=":
						case "==":
						case "!=":
						case "<":
						case ">":
							break;
						default:
							// Print warning to console
							console.warn("Could not parse condition: " + condition);
							
							// Return undefined since there was a problem
							return;
					}
				}
				// If there was no condition passed in
				else
				{
					// Set it to the default
					condition = defaultTo;
				}
				
				// Return the correct condition
				return condition;
			},
			
			// Based on this filter, does a given property match the filter
			matches: function(params)
			{				
				// Init matched to true
				var matched = true;
				
				// Iterate over all the params
				for (var field in params)
				{
					// Grab the value of the field
					var value = params[field];
					
					// If the field is not part of the filter or was undefined in the params
					if (typeof value != "undefined" && typeof this[field] != "undefined")
					{
						switch(field.toLowerCase())
						{
							case "name":
								// If the user's text matches this raid name
								matched = matched && new RegExp(this.name, "i").test(value);
								break;
							case "difficulty":
								// If the user's difficulty matches the raid
								matched = matched && this.difficulty == value
								break;
							case "state":
								// If the state matches and shouldn't be inverted
								// Or of the state doesn't match and should be inverted
								matched = matched && ((RaidManager.STATE.equals(value, this.state) && !this.inverseState)
										|| 
										(!RaidManager.STATE.equals(value, this.state) && this.inverseState));
								break;
							case "age":
								// Check against the age condition
								matched = matched && eval(value + this.age);
								break;
							case "fs":
								// Check against the fs condition
								matched = matched && eval(value + this.fs);
								break;
							case "count":
								// Check against the count condition
								matched = matched && value < this.count;
								break;
							default:
								// Didn't find the field
								console.warn("Couldn't match RaidFilter property to " + field);
								matched = false;
								break;
						}
					}
				}
				
				return matched;
			},
			
			// Gets a key to define this filter
			getKey: function()
			{
				return 	((typeof this.name 			!= "undefined")?"n=" + this.name + ";":"") + 
						((typeof this.difficulty 	!= "undefined")?"d=" + this.difficulty + ";":"") +
						((typeof this.state 		!= "undefined")?"s=" + this.state + ";":"") +
						((typeof this.inverseState 	!= "undefined")?"i=" + this.inverseState + ";":"") +
						((typeof this.age 			!= "undefined")?"a=" + this.age + ";":"") +
						((typeof this.count 		!= "undefined")?"c=" + this.count + ";":"") +
						((typeof this.page 			!= "undefined")?"p=" + this.page + ";":"") +
						((typeof this.fs 			!= "undefined")?"f=" + this.fs + ";":"");
			},
			
			// If it has a name and optionally a difficulty and nothing else, it's simple
			isSimple: function()
			{
				return typeof this.name != "undefined" && 
					 (typeof this.state			== "undefined" &&
					  typeof this.inverseState 	== "undefined" &&
					  typeof this.age			== "undefined" &&
					  typeof this.count			== "undefined" &&
					  typeof this.page			== "undefined" &&
					  typeof this.fs			== "undefined");
			},
			
			isEmpty: function()
			{
				return 	(typeof this.name 			== "undefined") &&
						(typeof this.difficulty 	== "undefined") &&
						(typeof this.state 			== "undefined") &&
						(typeof this.inverseState 	== "undefined") &&
						(typeof this.age 			== "undefined") &&
						(typeof this.count 			== "undefined") &&
						(typeof this.page 			== "undefined") &&
						(typeof this.fs 			== "undefined");
	
			},
			
			isValid: function()
			{
				return this.valid;
			},
			
			getDifficultyText: function()
			{
				return RaidType.difficulty[this.difficulty];
			},
			
			toString: function()
			{
				return 	(((typeof this.name 			!= "undefined")? this.name + " ":"") +
						 ((typeof this.difficulty 		!= "undefined")? this.difficulty + " ":"") +
						 ((typeof this.state 			!= "undefined")? "{state: " + 
						 
						 ((typeof this.inverseState 	!= "undefined" && this.inverseState == true)? "!":"")
						 + this.state.text + "}"+ " ":"") +
						 ((typeof this.fs 				!= "undefined")? "{fs: " + this.fs + "} ":"") + 
						 ((typeof this.age 				!= "undefined")? "{age: " + this.age + "ms} ":"") +
						 ((typeof this.count 			!= "undefined")? "{count: " + this.count + "} ":"") +
						 ((typeof this.page 			!= "undefined")? "{page: " + this.page + "} ":"")).trim();
			}
		});
		
		// Parameter text for this parser
		RaidFilter.paramText = "[raidName] [raidDifficulty] [{state: stateParam}] [{fs: fsParam}] [{age: ageParam}] [{count: countParam} [{page: pageParam}]]";
		
		// Regex to parse number expressions
		RaidFilter.numberExpressionPattern = /(<=?|>=?|==?|!=?)?\s*(\d+)\s*(\w\w?)?/;
		
		/************************************/
		/**** RaidFilterStyleParser Class ***/
		/************************************/
		
		// Class to parse raid link and style parameters
		window.RaidFilterStyleParser = Class.create({
			initialize: function(params)
			{
				// Split the params at the + that divides the filter from the style
				var parts = params.split("\+");
				console.log(parts)
				
				// Parse the first part as a raid filter
				if (parts.length >= 1)
				{
					this.raidFilter = new RaidFilter(parts[0].trim()); 
				}
				
				// The second part as the link style
				if (parts.length >= 2)
				{
					this.linkStyle = new RaidStyle(parts[1].trim());
				}
				
				// The third part as the message style
				if (parts.length >= 3)
				{
					this.messageStyle = new RaidStyle(parts[2].trim());
				}
				
				// The fourth part as the image style
				if (parts.length >= 4)
				{
					this.imageStyle = new RaidStyle(parts[3].trim());
				}
			},
			
			// Whether or not a link style exists for this parser
			hasLinkStyle: function()
			{
				return typeof this.linkStyle !== "undefined" && !this.linkStyle.isEmpty();
			},
			
			// Whether or not a message style exists for this parser
			hasMessageStyle: function()
			{
				return typeof this.messageStyle !== "undefined" && !this.messageStyle.isEmpty();
			},
			
			// Whether or not an image style exists for this parser
			hasImageStyle: function()
			{
				return typeof this.imageStyle !== "undefined" && !this.imageStyle.isEmpty();
			},
			
			// String describing this parser
			toString: function()
			{
				var ret;
				if (this.isValid())
				{
					ret = "Raids Matching <code>" + this.raidFilter.toString() + "</code> will have ";
					
					if (this.hasLinkStyle())
					{
						ret += "\nLink Style: <code>" + this.linkStyle.toString() + "</code>";
					}
					
					if (this.hasMessageStyle())
					{
						ret += "\nMessage Style: <code>" + this.messageStyle.toString() + "</code>";
					}
					
					if (this.hasImageStyle())
					{
						ret += "\nImage Style: <code>" + this.imageStyle.toString() + "</code>";
					}
				}
				else
				{
					ret = "Invalid Raid Filter Style Parser. Filter: " + (this.raidFilter?this.raidFilter.toString():"Not defined.");
				}
				
				return ret;
			},
			
			// Inject the styles from this parser into the page
			injectStyles: function()
			{
				// Create a class name for this set of styles
				this.className = "DCLH-RFSP-" + RaidFilterStyleParser._lastInjectedStyleId++;
				var rulesText = "";
				
				if (this.hasMessageStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + "{" + this.messageStyle.toString() + "}";
				}
				
				if (this.hasLinkStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + " a {" + this.linkStyle.toString() + "}";
				}
				
				if (this.hasImageStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + " img {" + this.imageStyle.toString() + "}";
				}
				
				
				// Locate/Create nodes
				var head = document.getElementsByTagName('head')[0],
				    style = document.createElement('style'),
				    rules = document.createTextNode(rulesText);
				
				// Style tag type
				style.type = 'text/css';
				
				// Browser dependencies
				if(style.styleSheet)
				{
				    style.styleSheet.cssText = rules.nodeValue;
				}
				else
				{
					style.appendChild(rules);
				}
				
				// Drop in the style node
				head.appendChild(style);
			},
			
			// Check validity of the parser
			isValid: function()
			{
				return typeof this.raidFilter !== "undefined" && this.raidFilter.isValid();
			}
		});
		
		RaidFilterStyleParser._lastInjectedStyleId = 0;

		/************************************/
		/********** RaidLink Class **********/
		/************************************/
		
		// Represents and parses actual raid link
		// Constructor is either
		// new RaidLink(str)
		//	params:
		//		str - Any string containing a raid link. The rest of the string will be ignored.
		//
		// OR
		//
		// new RaidLink(id, hash, difficulty, raidTypeId)
		//	params:
		//		id - kv_raid_id - the unique id for this raid instance
		//		hash - kv_hash - the string hash for the raid
		//		difficulty - kv_difficulty - a number from 1 to 4 where 1 is normal, 4 is nightmare
		//		raidTypeId - kv_raid_boss - the unique key for the raid type
		window.RaidLink = Class.create({
			initialize: function()
			{
				Timer.start("RaidLink init");
				// Capture variable args
				var args = $A(arguments);
				
				// If there's only one arg, must be link text
				if (args.length == 1)
				{
					// Only 1 arg means that it must be a link URL
					var linkURL = args[0];
					
					if (typeof linkURL != "undefined")
					{
						// Execute our regular expression (defined below) against the message
						// This checks to see if the message contained a LoaTS raid link
						var match = RaidLink.linkPattern.exec(linkURL);
						
						// If there was a raid link
						if (match != null)
						{
							// Get Param String
							var paramString = match[0];
							
							// Remove junk
							paramString = paramString.replace(/amp;/gi, "");
							
							// Separate params 
							var params = paramString.split("\?")[1].split("&");
														
							// Put the params together again into this object
							var paramObj = {kv_raid_id: "", kv_hash: ""};
							
							try 
							{
								for (var i = 0; i < 5; i++)
								{
									// If the param wasn't empty
									if (typeof params[i] == "string" &&  params[i] != "")
									{
										// Find the KV pairs
										var paramKV = params[i].split("=");
										
										// If there was something to split
										if (typeof paramKV[1] == "string")
										{
											// Split off any extra junk
											paramKV[1] = paramKV[1].split(/["'] /)[0].replace(/[^\w]/, "");
											
											// Assign the KV pairs
											paramObj[paramKV[0]] = paramKV[1];
										}
									}
								}
							}
							catch(ex)
							{
								console.warn(ex);
							}
													
							// Extract the difficulty
							this.difficulty = paramObj.kv_difficulty;
							
							// Extract the hash
							this.hash = paramObj.kv_hash;
							
							// Extract the raid boss (RaidType.id)
							this.raidTypeId = paramObj.kv_raid_boss;
							
							// Extract the raid id
							this.id = paramObj.kv_raid_id.replace(/\D/g, "");
						}
					}
					else
					{
						console.warn("Attempted make a raid link from an undefined URL");
					}
				}
				// If we got the 4 separate parts rather than a whole link
				else if (args.length > 1)
				{
					// Extract the raid id
					this.id = args[0];

					// Extract the hash
					this.hash = args[1];
					
					// Extract the difficulty
					this.difficulty = args[2];
					
					// Extract the raid boss (RaidType.id)
					this.raidTypeId = args[3];
				}
				else
				{
					console.error("Invalid parameters trying to create a RaidLink. ");
					console.error(args);
				}
								
				Timer.stop("RaidLink init");
			},
			
			getUniqueKey: function()
			{
				return this.id + "_" + this.hash;
			},
			
			getRaid: function()
			{
				// If this link wasn't fully filled out
				if (typeof this.raidTypeId == "undefined" || typeof this.difficulty == "undefined")
				{
					// Look up the same link in the storage
					var savedLink = RaidManager.fetch(this);
					
					// If there's a previous version of the link
					if (typeof savedLink != "undefined")
					{
						// Capture the save params into this link
						this.raidTypeId = savedLink.raidTypeId;
						this.difficulty = savedLink.difficulty;
					}
				}
				
				// Look up the raid type
				var raid = DC_LoaTS_Helper.raids[this.raidTypeId];
				
				// Return the raid type, or if we found nothing, a new empty raid type
				return (typeof raid != "undefined")?raid:new RaidType(this.raidTypeId);
			},
			
			getMatchedStyles: function()
			{
				// Possible styles to find and apply
				var styleRet = {};
				
				// Attempt to apply styles
				try 
				{
					// Iterate over all the styles
					for (var key in DC_LoaTS_Helper.raidStyles)
					{
						// Get the style manager for the style
						var styleManagers = DC_LoaTS_Helper.raidStyles[key];
						
						// Grab the higher level info about the raid link
						var raidData = RaidManager.fetch(this);
						
						for (var i = 0; i < styleManagers.length; i++)
						{
							// Get the current style manager
							var styleManager = styleManagers[i];
							
							// If this link matches the filter
							if (styleManager.raidFilter.matches(
										{
											age: (new Date()/1) - raidData.firstSeen,
											difficulty: this.difficulty,
											fs:  this.getRaid().getFairShare(this.difficulty),
											name: this.getRaid().getSearchableName(),
											state: RaidManager.fetchState(this)
										})
							)
							{
								for (var property in styleManager)
								{
									if ((property.indexOf("Style") > 0 || property.indexOf("className") > -1) && typeof styleManager[property] !== "undefined")
									{
										if (typeof styleRet[property] === "undefined")
										{
											styleRet[property] = "";
										}
										
										styleRet[property] += " " + styleManager[property];
									}
								}
							}
						}
					}
				}
				catch(ex)
				{
					console.warn("Error while finding styles for link:");
					console.warn(this);
					console.warn(ex);
				}
				
				return styleRet;
			},
			
			// Takes in a format returns a formatted text for this link
			getFormattedRaidLinkText: function(messageFormat)
			{
				try
				{
					if (this.isValid())
					{
						// Start with just an empty template
						var newMessage = messageFormat;
						
						// Grab the link state
						var linkState = RaidManager.fetchState(this);
						
						// Grab the raid type
						var raid = this.getRaid();
						
						// Fill in the basic data to the template
						newMessage = newMessage.replace(/{id}/gi, this.id);
						newMessage = newMessage.replace(/{line}/gi, "<br>");
						newMessage = newMessage.replace(/{size}/gi, raid.size);
						newMessage = newMessage.replace(/{stat}/gi, raid.stat);
						newMessage = newMessage.replace(/{health}/gi, raid.getHealthText(this.difficulty));
						newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
						newMessage = newMessage.replace(/{diff}/gi, RaidType.shortDifficulty[this.difficulty]);
						newMessage = newMessage.replace(/{zone}/gi, raid.zone);
						newMessage = newMessage.replace(/{name}/gi, raid.fullName);
						newMessage = newMessage.replace(/{short-name}/gi, raid.shortName);
						newMessage = newMessage.replace(/{shorter-name}/gi, raid.colloqName);
						newMessage = newMessage.replace(/{shortest-name}/gi, raid.shortestName);
						newMessage = newMessage.replace(/{time}/gi, raid.getTimeText());

						newMessage = newMessage.replace(/{fs}/gi, raid.getFairShareText(this.difficulty));
						newMessage = newMessage.replace(/{target}/gi, raid.getTargetDamageText(this.difficulty));
						newMessage = newMessage.replace(/{optimal}/gi, raid.getTargetDamageText(this.difficulty));
						newMessage = newMessage.replace(/{ofs}/gi, raid.getTargetDamageText(this.difficulty));
						newMessage = newMessage.replace(/{os}/gi, raid.getTargetDamageText(this.difficulty));
						
						newMessage = newMessage.replace(/{cache-state}/gi, linkState.text);
						newMessage = newMessage.replace(/{cache-state-nice}/gi, linkState.niceText);
						newMessage = newMessage.replace(/{cache-state-short}/gi, linkState.shortText);
						newMessage = newMessage.replace(/{visited}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.niceText:"");
						newMessage = newMessage.replace(/{visited-short}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.shortText:"");
						
						if (typeof linkState == "undefined" || linkState.text == "undefined")
						{
							console.warn("Bad Link State");
							console.warn(linkState);
							console.warn(this);
						}
						
						// FS has special properties, so parse it differently
						var fsMatch = /{fs([^}]*)}/.exec(newMessage);
						
						// How many times we matched an FS
						var fsMatchCount = 0;
						
						// If there were any FS calls
						while (fsMatch != null)
						{
							try
							{
								// Don't get in an infite loop
								if (fsMatchCount >= 5)
								{
									console.warn("Can only match 5 {fs} with math")
									holodeck.activeDialogue().raidBotMessage("Can only match 5 {fs} with math while formatting");
									break;
								}
								
								fsMatchCount++;
								
								// Replace FS and do the math
								newMessage = newMessage.replace(/{fs[^}]*}/, 
									DC_LoaTS_Helper.prettyFormatNumber(eval(raid.getFairShare(this.difficulty)+fsMatch[1])));
								
								// Find the next FS
								var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
							}
							catch (ex)
							{
								console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
								console.error(ex);
							}
						}
						
						return newMessage.trim();
					}
					else
					{
						console.warn("Tried to get formatted raid link text from invalid link");
						return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Unknown Raid (id: " + this.raidTypeId + ")"
					}
				}
				catch(ex)
				{
					console.warn("Error encountered in RaidLink.getFormattedRaidLinkText");
					console.warn(ex);
					return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Error Formatting Raid (id: " + this.raidTypeId + ")"
				}
			},
			
			// Gets the simplest text possible based on the storage messagen and link formats
			getSimpleText: function()
			{
				if (this.isValid())
				{
					// Retrieve the message format
					var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
					// Retrieve the anchor tag format
					var linkFormat = DC_LoaTS_Helper.getLinkFormat();
					
					// Start with just an empty template
					var newMessage = messageFormat;
					
					// Grab the link state
					var linkState = RaidManager.fetchState(this);
					
					// Grab the raid type
					var raid = this.getRaid();
					
					// Fill in the basic data to the template
					newMessage = newMessage.replace(/{id}/gi, this.id);
					newMessage = newMessage.replace(/{size}/gi, raid.size);
					newMessage = newMessage.replace(/{stat}/gi, raid.stat);
					newMessage = newMessage.replace(/{health}/gi, raid.getHealthText(this.difficulty));
					newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
					newMessage = newMessage.replace(/{diff}/gi, RaidType.shortDifficulty[this.difficulty]);
					newMessage = newMessage.replace(/{zone}/gi, raid.zone);
					newMessage = newMessage.replace(/{name}/gi, raid.fullName);
					newMessage = newMessage.replace(/{short-name}/gi, raid.shortName);
					newMessage = newMessage.replace(/{shorter-name}/gi, raid.colloqName);
					newMessage = newMessage.replace(/{shortest-name}/gi, raid.shortestName);
					newMessage = newMessage.replace(/{time}/gi, raid.getTimeText());

					newMessage = newMessage.replace(/{fs}/gi, raid.getFairShareText(this.difficulty));
					newMessage = newMessage.replace(/{target}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{optimal}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{ofs}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{os}/gi, raid.getTargetDamageText(this.difficulty));
					
					newMessage = newMessage.replace(/{cache-state}/gi, linkState.text);
					newMessage = newMessage.replace(/{cache-state-nice}/gi, linkState.niceText);
					newMessage = newMessage.replace(/{cache-state-short}/gi, linkState.shortText);
					newMessage = newMessage.replace(/{visited}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.niceText:"");
					newMessage = newMessage.replace(/{visited-short}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.shortText:"");
					
					// Remove fields we don't want
					newMessage = newMessage.replace(/{line}/gi, "");
					newMessage = newMessage.replace(/{image}/gi, "");
					newMessage = newMessage.replace(/<[^>]+>/gi, "");
					
					
					// FS has special properties, so parse it differently
					var fsMatch = /{fs([^}]*)}/.exec(newMessage);
					
					// How many times we matched an FS
					var fsMatchCount = 0;
					
					// If there were any FS calls
					while (fsMatch != null)
					{
						try
						{
							// Don't get in an infite loop
							if (fsMatchCount >= 5)
							{
								console.warn("Can only match 5 {fs} with math")
								holodeck.activeDialogue().raidBotMessage("Can only match 5 {fs} with math while formatting");
								break;
							}
							
							fsMatchCount++;
							
							// Replace FS and do the math
							newMessage = newMessage.replace(/{fs[^}]*}/, 
								DC_LoaTS_Helper.prettyFormatNumber(eval(raid.getFairShare(this.difficulty)+fsMatch[1])));
							
							// Find the next FS
							var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
						}
						catch (ex)
						{
							console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
							console.error(ex);
						}
					}
					
					return newMessage.trim();
				}
				else
				{
					console.warn("Tried to get simple raid link text from invalid link");
					return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Unknown Raid (id: " + this.raidTypeId + ")";
				}
							
			},

			// Takes in a message format and a link format and returns a ready to inject link
			getFormattedRaidLink: function(messageFormat, linkFormat)
			{
				Timer.start("getFormattedRaidLink");
				
				// If there was no message format, look it up
				if (typeof messageFormat == "undefined")
				{
					messageFormat = DC_LoaTS_Helper.getMessageFormat();
				}
				
				// If there was no link format, look it up
				if (typeof linkFormat == "undefined")
				{
					linkFormat = DC_LoaTS_Helper.getLinkFormat();
				}
				
				// Get the basics of the message
				var newMessage = this.getFormattedRaidLinkText(messageFormat).trim();
				
				try 
				{
					// Get the text of the message without the image
					var noImage = newMessage.replace(/{image}/gi, "").replace(/<[^>]+>/gi, "").trim();
					
					// Define the image tag
					var imageTag = this.getFormattedImageTag();
					
					// Index of the image tag
					var imageIndex = newMessage.indexOf("{image}");

					// If {image} is in the middle, just lump it in with the text
					if (imageIndex == -1 || (imageIndex > 0 && imageIndex < newMessage.length - "{image}".length))
					{
						newMessage = newMessage.replace(/{image}/gi, imageTag).trim();
						newMessage = linkFormat.replace(/{text}/gi, newMessage);
					}
					// If {image} is at the beginning or end, put it in it's own anchor, for aesthetics
					else
					{
						// At the beginning
						if (newMessage.indexOf("{image}") == 0)
						{
							newMessage = linkFormat.replace(/{text}/gi, imageTag).replace(/class=\"/, "class=\"game_icon_link ") + " " + linkFormat.replace(/{text}/gi, newMessage);
						}
						// At the end
						else
						{
							newMessage = linkFormat.replace(/{text}/gi, newMessage) + " " + linkFormat.replace(/{text}/gi, imageTag);
						}
						
						// Remove images from the message
						newMessage = newMessage.replace(/{image}/gi, "");
					}
					
					
					newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
					newMessage = newMessage.replace(/{text-no-image}/gi, noImage);
					newMessage = newMessage.replace(/{url}/gi, this.getURL());
					

					
					newMessage = "<span class=\"raidMessage\">" + newMessage + "</span>";


					// Get the styles for this link
//					var styles = this.getMatchedStyles();

//					newMessage = newMessage.replace(/{linkStyle}/gi, styles.linkStyle||"");
				}
				catch(ex)
				{
					console.warn("Error encountered in RaidLink.getFormattedRaidLink");
					console.warn(ex);
				}
				
				Timer.stop("getFormattedRaidLink");
				return newMessage;
			},
			
			// Get the raid name
			getName: function()
			{
				return this.getRaid().fullName;
			},
			
			// Get the difficulty text of the raid
			getDifficultyText: function()
			{
				return RaidType.difficulty[this.difficulty];
			},
			
			// Generate a url for this raid
			getURL: function()
			{
				var raidURL = "http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp";
				
				if (typeof this.raidTypeId != "undefined")
				{
					raidURL += "&kv_raid_boss=" + this.raidTypeId;	
				}
				if (typeof this.difficulty != "undefined")
				{
					raidURL += "&kv_difficulty=" + this.difficulty;
				}
				
				// It's easier to inspect the link if the easier to read bits are first
				raidURL += "&kv_raid_id=" + this.id + "&kv_hash=" + this.hash;
				
				return raidURL;
			},
			
			// Get the raid image url, or default to LoaTS icon
			getImageSRC: function()
			{
				// Assume default
				var imageSRC = RaidLink.defaultImageSRC;
				
				// If we have a raidTypeId
				if (typeof this.raidTypeId !== "undefined")
				{
					// Locate the offsite image
					imageSRC = "http://dawnofthedragons.cdngc.net/lots_live/images/bosses/post/" + this.raidTypeId + "_1.jpg";
				}
				
				return imageSRC;
			},
			
			// Get the fully formatted <img> tag for this raid
			getFormattedImageTag: function()
			{				
				// Get the image src
				var imageSRC = this.getImageSRC();
				
				// Fill in image SRC
				var imageTag = RaidLink.defaultImageFormat.replace("{imageSRC}", imageSRC);
				
				return imageTag;

			},
			
			// Generate a param array for this link
			getParamArray: function()
			{
				return [this.id, this.hash, this.difficulty, this.raidTypeId];
			},
			
			// Is this a valid link (to the best of our knowledge)
			isValid: function()
			{
				// All a link needs to be valid is an id and a hash
				return typeof this.id != "undefined" && typeof this.hash != "undefined" && this.id != "" && this.hash != "";
			}
			
		});
		
		// Parameter text for this parser
		RaidLink.paramText = "url";

		// Define the regular expression (regex) that tells us if a link is a raid link or not
		RaidLink.linkPattern = /(?:https?:\/\/www\.kongregate\.com)?(?:\/games\/)?(?:5thPlanetGames\/legacy-of-a-thousand-suns)?(?!\?4217\-op)\?([^,"]*)\b/i;

		// Define a regular expresson to catch busted links
		RaidLink.backupLinkReplacementPattern = /.?\[?"?http:\/\/.*?\?4217\-op","5thPlanetGames\/legacy\-of\-a\-thousand\-suns\?.*?(?:\u2026|\u8320|…|\.\.\.|\]|"|')*$/i;
		
		// Fallback image url if we can't get the provided one
		RaidLink.defaultImageFormat = '<img style="raidIcon" src="{imageSRC}" onerror="RaidLink.fixBrokenImage.apply(this);" />';
		
		// Fallback image url if we can't get the nice one
		RaidLink.defaultImageSRC = "http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op";
		
		// Fallback message format
		RaidLink.defaultMessageFormat = "{image} {visited} Raid: [{size}-{stat}-{difficulty}-{fs}-{os}] {short-name}";
		
		// Old link format
		RaidLink.defaultLinkFormat_v1 = "<a class=\"raidLink raidDiff{difficulty}\" onclick=\"return DC_LoaTS_Helper.raidLinkClick(event, '{url}');\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";
		
		// Fallback link format
		RaidLink.defaultLinkFormat_v2 = "<a style=\"{linkStyle}\" class=\"raidLink raidDiff{difficulty}\" onclick=\"return DC_LoaTS_Helper.raidLinkClick(event);\" onmousedown=\"return DC_LoaTS_Helper.raidLinkMouseDown(event);\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";
		
		// Fix broken images, an inline handler
		RaidLink.fixBrokenImage = function()
		{
			// Get the relevant raid link
			var raidLink = new RaidLink(this.parentNode.href);
			
			// First time failed, check for alternate fail names
			if (this.src == "http://dawnofthedragons.cdngc.net/lots_live/images/bosses/post/" + raidLink.raidTypeId + "_1.jpg" && this.src != RaidLink.defaultImageSRC)
			{
				switch(raidLink.raidTypeId)
				{
					case "dule_warmaster":
						this.src = "http://dawnofthedragons.cdngc.net/lots_live/images/bosses/post/dule_1.jpg";
						break;
					case "hultex_quibberath":
						this.src = "http://dawnofthedragons.cdngc.net/lots_live/images/bosses/post/hultex_1.jpg";
						break;
					case "warden_ramiro":
						this.src = "http://dawnofthedragons.cdngc.net/lots_live/images/bosses/post/ramiro_1.jpg";
						break;
					case "purple_lion":
						this.src = RaidLink.defaultImageSRC;
						break;
					case "kang":
						this.src = RaidLink.defaultImageSRC;
						break;
					case "tourniquet":
						this.src = RaidLink.defaultImageSRC;
						break;
					case "flora":
						this.src = RaidLink.defaultImageSRC;
						break;
					default:
						this.src = RaidLink.defaultImageSRC;
				}
			}
			// Second time failed, switch to default
			else if (this.src != RaidLink.defaultImageSRC)
			{
				this.src = RaidLink.defaultImageSRC;
			}
			// Default failed, no image
			else
			{
				this.src="";
			}
		};
		
		/************************************/
		/**** RaidLinkstateParser Class *****/
		/************************************/
		
		window.RaidLinkstateParser = Class.create({
			initialize: function(params)
			{
				var paramsParts = params.trim().replace(/\s+/g, " ").split(" ");
				if (paramsParts.length != 1 && paramsParts.length != 2)
				{
					ret.success = false;
					ret.statusMessage = "Could not understand <code>" + params + "</code>. Should have one or two parameters: url and optionally state.";
				}
				else
				{
					this.raidLink = new RaidLink(paramsParts[0]);
					this.state;
					var raidLinkIndex = 0;
					if (!this.raidLink.isValid())
					{
						if (paramsParts.length == 2)
						{
							this.raidLink = new RaidLink(paramsParts[1]);
							raidLinkIndex = 1;
						}
					}
					
					if (!this.raidLink.isValid())
					{
						ret.success = false;
						ret.statusMessage = "Could not parse raid link from <code>" + params + "</code>";
					}
					else
					{
						if (paramsParts.length == 2)
						{
							this.state = paramsParts[raidLinkIndex*-1+1];
						}
						
						DCDebug("LinkState: ");
						DCDebug("RaidLink for " + this.raidLink.getName());
						DCDebug("State Param: " + this.state);
					}
				}
			},
			
			getName: function()
			{
				return (typeof this.raidLink != "undefined")?this.raidLink.getName():"undefined";
			},
			
			getState: function()
			{
				return this.state;
			},
			
			isValid: function()
			{
				return this.raidLink != "undefined" && this.raidLink.isValid();
			}
		});
		
		// Parameter text for this parser
		RaidLinkstateParser.paramText = "url [newState]";

		
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
					// State we found
					var state;
					
					// If the parameter was a string
					if (typeof stateParam == "string")
					{
						// lowercase it just in case
						stateParam = stateParam.toLowerCase();
					}
					
					// Iterate over all valid states
					for (var stateKey in this)
					{
						// Ignore functions. Check for the state.id or state.text to equal the passed in value
						if (typeof this[stateKey] != "function"
							&& typeof this[stateKey] != "undefined" 
							&& (this[stateKey].id == stateParam || this[stateKey].text == stateParam)
						   )
						{
							// If we found a state that matches, capture it and break the loop
							state = this[stateKey];
							break;
						}
						else if (typeof this[stateKey] == "undefined")
						{
							console.warn("Invalid State:");
							console.warn(stateKey);
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
				Timer.stop("clear");
			},
			
			// Store a raid link and the state of the link
			// RaidManager.raidStorage is a write-through cache, and the storage is volatile
			// So we have to look up the storage every time we store. This keeps us in sync with
			// other windows of the same browser running the game simulataneously
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
					if (typeof currentState == "undefined")
					{
						currentState = RaidManager.STATE.UNSEEN;
						containedInLocalDB = false;
					}
					
					// If we weren't provided a state param, set it to UNSEEN
					if (typeof state == "undefined")
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
//								(	// DEPRECATED: Old state is stored with unseen text
//									(typeof raidData.state.text != "undefined" && raidData.state.text ==  RaidManager.STATE.UNSEEN.text)
//									||
//									// Old state is stored with just id
//									(typeof raidData.stateId != "undefined" && raidData.stateId == RaidManager.STATE.UNSEEN.id)
//								)
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
					
					// If there is an old style state, delete it
					// Our goal is to minimize local storage footprint to just the essentials
					if (typeof raidData.state != "undefined" )
					{
						// Preserve backwards compatibility at the cost of memory usage
//						delete raidData.state;
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
			
			// Lookup a given raid link
			/*public static RaidLink*/
			fetch: function(raidLink)
			{
				Timer.start("fetch");
				
				// Declare the return var
				var foundLink;
				
				if (raidLink.isValid() && typeof GM_getValue !== "undefined" && typeof GM_getValue !== "undefined")
				{
					// Load up the storage object
//					var raidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));

					// Attempt to load the passed in raid link
					var raidData = RaidManager.raidStorage[raidLink.getUniqueKey()];
										
					// If the link is in storage
					if (typeof raidData !== "undefined")
					{
						// Add in the functions that you expect to see on those objects
						Object.extend(raidData.raidLink, RaidLink.prototype);
					}
					
					// Set the correct raid data for return
					foundLink = raidData;
				}
				
				Timer.stop("fetch");
				
				// Return what we found or undefined
				return foundLink;
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
				if (typeof raidData != "undefined")
				{
					if (typeof raidData.stateId != "undefined")
					{
						// Return its state
						return RaidManager.STATE.valueOf(raidData.stateId);
					}
					else if (typeof raidData.state != "undefined")
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
						var raidFilter = new RaidFilter(filterParam);
					}
					// We got something other than text. Assume it's a RaidFilter
					else if (filterParam instanceof RaidFilter)
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
											fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: raidCount
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
			}
		}

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
					this.titleBarClose.src = "http://i.imm.io/nNJy.png";					
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
					titleBarCloseArea.setAttribute("onmouseover", "$('DC_LoaTS_raidMenuClose').src = 'http://i.imm.io/nStr.png';");
					titleBarCloseArea.setAttribute("onmouseout", "$('DC_LoaTS_raidMenuClose').src = 'http://i.imm.io/nNJy.png';");
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
					this.activatedTabs = [];
					
					// Activate tabs
					this._activateTabs();
				}
			},
			
			// Toggles the visibility of the raid menu
			/*public void*/
			toggle: function()
			{
				this.container.toggle();
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
						this.activatedTabs.push(new RaidMenu.tabClasses[tabPosition](this));
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
		
		// Toggle the visibility of the raid menu
		/*public static void*/
		RaidMenu.toggle = function()
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
			
			// Toggle its visibility
			raidMenu.toggle();
		}

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
			}
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

		/************************************/
		/********** RaidStyle Class *********/
		/************************************/
		
		// Class to parse raid style text of any form into CSS stuff
		window.RaidStyle = Class.create({
			initialize: function(styleText)
			{
				var naturalLanguage = "";
				var nativeCSS = "";
				this.css = "";

				console.log("Parsing styleText: \"" + styleText + "\"")
				
				// Extract from the inputted text the various natural language and native CSS bits
				RaidStyle.parsePattern.lastIndex = 0;
				for (var match = RaidStyle.parsePattern.exec(styleText); match && match[0] != ""; match = RaidStyle.parsePattern.exec(styleText))
				{
					// Combine any natural language pieces together
					if (typeof match[1] !== "undefined")
					{
						naturalLanguage += match[1];
					}
					
					// Combine any native CSS pieces together
					if (typeof match[2] !== "undefined")
					{
						nativeCSS += match[2];
					}
				}
				
				// Trim out any extra whitespace
				naturalLanguage = naturalLanguage.trim().toLowerCase();
				nativeCSS = nativeCSS.trim();
				
				console.log("styleText yielded naturalLanguage: \"" + naturalLanguage + "\" and nativeCSS: \"" + nativeCSS + "\"");
				
				// Try to parse the natural language bits
				// First, get a copy of the parsable bits
				var parseEls = RaidStyle.getNaturalLanguageParseElements();
				
				for (var i = 0; i < parseEls.length && naturalLanguage.length > 0; i++)
				{
					var el = parseEls[i];
					el.pattern.lastIndex = 0;
					var match = el.pattern.exec(naturalLanguage);
					if (match != null && match[0] != "")
					{
						console.log(el.property + " captured \"" + match[el.capture] + "\" and will replace \"" + match[el.replace]) +"\"";
						this.css += el.property + ": " + match[el.capture] + "; ";
						console.log("Natural language before: \"" + naturalLanguage + "\"");
						naturalLanguage = naturalLanguage.replace(match[el.replace], "").trim();
						console.log("Natural language after: \"" + naturalLanguage + "\"");
					}
					else
					{
						console.log(el.property + " did not match against \"" + naturalLanguage + "\"");
					}
				}
				
				this.css += nativeCSS;
				console.log("CSS: ");
				console.log(this.css);
			},
			
			toString: function()
			{
				return this.css;
			},
			
			isEmpty: function()
			{
				return typeof this.css === "undefined" || this.css.trim().length == 0;
			},
			
			isValid: function()
			{
				//TODO Will a style ever be not valid?
				return true;
			}
		});
		
		// General pattern to pick apart the natural language style from the native CSS styles
		RaidStyle.parsePattern = /([^"]*)?("[^"]*")?/gi;
		
		// Pattern to find bits of text that are colors. Can find #FFF, #FFFFFF, rgb(255,255,255), or white as the color white
		RaidStyle.baseColorPattern = /#[0-9a-f]{3}(?:[0-9a-f]{3})?\b|rgb\((?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),(?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),(?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)|\b(?:black|white|red|yellow|lime|aqua|blue|fuchsia|orange|gray|silver|maroon|olive|green|teal|navy|purple)\b/i;
		RaidStyle.colorPattern = new RegExp("(?:(?:(?!on +).. )|^)(" + RaidStyle.baseColorPattern.source + ")", "i");
		RaidStyle.backgroundColorPattern = new RegExp("\\bon +(" + RaidStyle.baseColorPattern.source + ")", "i");
		
		// These are the current natural language features we're going to support for now
		RaidStyle.naturalLanguageParseElements = [
												 	{property: "font-weight", 		capture: 0, replace: 0, pattern: /\b(?:[1-9]00(?!px|pt|em|en|%)|bold(?:er)?|lighter|normal)\b/i},
												 	{property: "background-color", 	capture: 1, replace: 0, pattern: RaidStyle.backgroundColorPattern},
												 	{property: "color", 			capture: 1, replace: 1, pattern: RaidStyle.colorPattern},
												 	{property: "font-size", 		capture: 0, replace: 0, pattern: /\b[0-9]?[0-9]?[0-9]?[0-9] ?(?:(?:px|pt|em|en)\b|%)|\bx?x-small\b|\bsmall(?:er)?\b|\bmedium\b|\blarger?\b|\bx?x-large\b/i},
												 	{property: "text-decoration", 	capture: 0, replace: 0, pattern: /\bunderline(?: overline)\b/i},												 	
												 	{property: "font-style", 		capture: 0, replace: 0, pattern: /\b(?:italic|oblique|normal)\b/i},												 	
												 	{property: "whitespace", 		capture: 0, replace: 0, pattern: /\b(?:pre|pre-wrap|pre-line|-moz-pre-wrap|-o-pre-wrap|nowrap|normal)\b/i},												 	
												 	{property: "display", 			capture: 0, replace: 0, pattern: /\b(?:none|inline|block|inline-block|list-item|marker|compact|run-in|table-header-group|table-footer-group|table|inline-table|table-caption|table-cell|table-row|table-row-group|table-column|table-column-group)\b/i}
												 ];
		
		RaidStyle.getNaturalLanguageParseElements = function()
		{
			var el = [];
			for (var i = 0; i < RaidStyle.naturalLanguageParseElements.length; i++)
			{
				el.push(RaidStyle.naturalLanguageParseElements[i]);
			}
			
			return el;
		}
		
												 
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
					ccc.setAttribute("rowspan", 2);
					
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
						reload: new RaidButton("reload", "DC_LoaTS_reloadButton", DC_LoaTS_Helper.reload)
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
							// A wiki command was used
							var wasWiki = false;
							
							// Attempt to match the text to a known command
							for (var commandName in DC_LoaTS_Helper.chatCommands)
							{
								// Going to add a wiki command no matter what
								if (commandName.toLowerCase() == DC_LoaTS_Helper.chatCommands.wiki.commandName)
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
							
							if (!wasWiki)
							{
								// Doesn't match an existing command
								matchedCommands.push(new DC_LoaTS_Helper.chatCommands.wiki("omnibox", text));
							}
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
			var raidToolbar = window.raidtoolbar;
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
			var raidToolbar = window.raidtoolbar;
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
		
		/************************************/
		/********** RaidType Class **********/
		/************************************/
		
		// The Raid Type class is the generic form of a raid
		/*public class*/
		window.RaidType = Class.create({
	    	
		    // Constructor
		    /*public RaidType*/
			initialize: function(id, zone, fullName, shortName, colloqName, time, size, stat, health, fairShare, target)
			{
				this.id = id;
				this.zone = zone;
				this.fullName = fullName;
				this.shortName = shortName;
				this.colloqName = colloqName;
				this.shortestName = colloqName;
				this.time = time;
				this.size = size;
				this.stat = stat;
				
				// Calculate Health
				if (typeof health === "number")
				{
					this.health = [health*RaidType.difficultyHealthFactor[1],
								   health*RaidType.difficultyHealthFactor[2],
								   health*RaidType.difficultyHealthFactor[3],
								   health*RaidType.difficultyHealthFactor[4]
								   ];
				}
				else if (typeof health === "string")
				{
					this.health = [health, health, health, health];
				}
				else if (typeof health === "object" && typeof health !== null)
				{
					this.health = health;
				}
				else
				{
					this.health = ["Unknown", "Unknown", "Unknown", "Unknown"];
				}
				
				// Calculate Fair Share
				if (typeof fairShare === "number" || typeof fairShare === "string")
				{
					this.fairShare = [fairShare, fairShare, fairShare, fairShare];
				}
				else if (typeof fairShare === "object" && fairShare !== null)
				{
					this.fairShare = fairShare;
				}
				//TODO: Cache this instead
				// Else, calculate FS inline


				// Calculate Target
				if (typeof target === "number" || typeof target === "string")
				{
					this.target = [target, target, target, target];
				}
				else if (typeof target === "object" && target !== null)
				{
					this.target = target;
				}
				//TODO: Cache this instead
				// Else, calcuate Target inline

			},
			
			// Get or calculate fair share for a given difficulty raid. 
			// Can be int or String (usually, if applicable, "Unknown")
			/*public int or String*/
			getFairShare: function (difficulty)
			{
				var fs = 0;
				
				// If there is a hardcoded fair share, use that
				if (typeof this.fairShare !== "undefined")
				{
					fs = this.fairShare[difficulty-1];
				}
				// IF there is no hardcoded fair share, calculate it
				// Also, we must have healths, difficulty, and size to calculate it
				else if (typeof difficulty !== "undefined" 
					  && typeof this.size === "number" 
					  && typeof this.getHealth(difficulty) === "number")
				{
					fs = this.getHealth(difficulty) / this.size;
				}
				
				return fs;
			},
			
			// Get pretty text for fair share
			/*public String*/
			getFairShareText: function(difficulty)
			{
				var fs = this.getFairShare(difficulty);
				
				return DC_LoaTS_Helper.prettyFormatNumber(fs);
			},
			
			// Get pretty text for target damange
			/*public String*/
			getTargetDamageText: function(difficulty)
			{
				var target = 0;
				
				// If non-standard target damage is set
				if (typeof this.target != "undefined")
				{
					target = this.target[difficulty-1];
				}
				// Otherwise assume usual calculation of target
				else
				{
					target = this.getFairShare(difficulty) * RaidType.targetDamageModifier[this.size];
				}
				
				return DC_LoaTS_Helper.prettyFormatNumber(target);
			},
			
			// Returns the int of the health or specified String (usually, if applicable, it's "Unknown")
			/*public int or String*/
			getHealth: function(difficulty)
			{
				return this.health[difficulty-1];
			},
			
			// Returns the health of the raid as friendly text
			/*public String*/
			getHealthText: function(difficulty)
			{
				var health = this.getHealth(difficulty);
				return (typeof health == "number")?DC_LoaTS_Helper.prettyFormatNumber(health):health;
			},
			
			// Returns the duration of the raid as text
			/*public String*/
			getTimeText: function()
			{
				return this.time + "H";
			},
			
			// Returns a combination of all acceptable names for the raid
			// So that the string can be searched
			/*public String*/
			getSearchableName: function()
			{
				return this.fullName + "_" + this.shortName + "_" + this.colloqName;
			},
			
			// Gets a big descriptive block of text for the raid
			// Difficulty is optional. If provided, narrows down output, otherwise gives all
			/*public String*/ 
			getVerboseText: function(difficulty)
			{
				// Put the name, size, and stat facts into the string
				var text = "<b title=\"" + this.id + "\">" + this.fullName + "</b> \n";
				text += "Raid Size: " + this.size + " \n";
				text += "Stat(s) Used: " + this.stat + " \n";
				text += "Duration: " + this.getTimeText() + " \n";
				text += "Zone: " + this.zone + " \n";

				// If the user passed in difficulty 0, they only want the above listed stuff
				if (difficulty != 0)
				{
					var difficulties;
					
					// If we're focusing on a single difficulty
					if (typeof difficulty != "undefined")
					{
						difficulties = [difficulty];
						
					}
					// If we didn't get a single difficulty, show all difficulties
					else
					{
						difficulties = [1, 2, 3, 4];
					}
					
					// For each of the difficulties we're addressing
					for (var i = 0; i < difficulties.length; i++)
					{
						var d = difficulties[i];
						
						if (difficulties.length > 1)
						{
							text += " \n-- \n";
						}
						
						// Get text for the difficulty
						var diffText = RaidType.difficulty[d];
	
						if (typeof diffText == "undefined")
						{
							diffText = "Unknown";
						}
						
						var healthText = DC_LoaTS_Helper.prettyFormatNumber(this.getHealth(d));
						
						// Display the difficulty, health, fs, and target damage
						text += "Difficulty: " + diffText + " \n";
						text += "Health: " + healthText + " \n";
						text += "<acronym title=\"FS = Fair Share (of damage) = Raid Health (" + healthText + 
								") / Raid Size (" + this.size + ")\">FS</acronym>: " + this.getFairShareText(d) + " \n";
						text += "<span class=\"abbr\" title=\"Target Damage is FS * Raid Size Multiplier. The multiplier is calculated from user tests in the spreadsheet.\">Target(OS)</span>: " +  this.getTargetDamageText(d) + " ";
	
					}
				}
				
				return text;
			}
			
		});// End RaidType Class
		
		// List of possible difficulties, anything else will show up as Unknown
		RaidType.difficulty = {1: "Normal", 2: "Hard", 3: "Legendary", 4: "Nightmare"};
		
		// List of possible short name difficulties, anything else will show up as Unknown
		RaidType.shortDifficulty = {1: "N", 2: "H", 3: "L", 4: "NM"};
		
		// List of how much each difficulty modifies the base HP of the raid
		RaidType.difficultyHealthFactor = {1: 1, 2: 1.25, 3: 1.6, 4: 2};
		
		// List of *FS modifiers for Target Damage based on raid size.
		// From the raid spreadsheet:
		//		https://docs.google.com/spreadsheet/ccc?key=0AoPyAHGDsRjhdGYzalZZdTBpYk1DS1M3TjVvYWRwcGc&hl=en_US#gid=4
		RaidType.targetDamageModifier = {1: 1, 10: 1.25, 25: 1.5, 50: 2.2, 100: 2.3, 250: 1, 500: 1.5};

		/************************************/
		/********** Timing Utility **********/
		/************************************/
				
		window.Timer = {
			
			start: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					timer = {name: timerName, start: 0, totalTime: 0, longestTime: 0, numTimes: 0};
					window.Timer[timerName] = timer;
				}
				timer.start = new Date()/1;
			},
			
			stop: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					console.log("Can't stop a timer (" + timerName + ") that wasn't started");
				}
				else
				{
					var elapsed = (new Date()/1) - timer.start;
					timer.totalTime += elapsed;
					if (timer.longestTime < elapsed) {timer.longestTime = elapsed;}
					timer.numTimes++;
					timer.start = 0;
				}
			},
			
			getTimer: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					console.log("Can't get a timer (" + timerName + ") that wasn't started");
				}
				else
				{
					timer.getAverage = function()
					{
						return this.totalTime / this.numTimes;
					}.bind(timer);
				}
				
				return timer;
			},
			
			getReport: function()
			{
				var report = "";
				for (var timerName in window.Timer)
				{
					var timer = window.Timer.getTimer(timerName);
					if (typeof timer != "function" && typeof timer != "undefined")
					{
						report += timerName + " > Average: " + timer.getAverage().toFixed(5) + "ms - Total: " + timer.totalTime + "ms - # " + timer.numTimes + "\n\n";
					}
				}
				
				return report;
			},
			
			printReport: function()
			{
				console.log(Timer.getReport());
			}
		};

		/************************************/
		/********** Formatting Tab **********/
		/************************************/
		
		// Class to manage the formatting tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Formatting",
				tabPosition: 30,
				
				initPane: function()
				{
					var messageFormatHeader = document.createElement("h2");
					messageFormatHeader.className = "RaidMenuTab-SectionHeader";
					messageFormatHeader.update("Message Format");
					this.pane.appendChild(messageFormatHeader);
					
					var messageFormatDescription = document.createElement("p");
					messageFormatDescription.className = "RaidMenuTab-SectionDescription";
					messageFormatDescription.update("The format of raid links as they will appear in chat.");
					this.pane.appendChild(messageFormatHeader);
					
					this.messageFormatTextArea = document.createElement("textarea");
					this.messageFormatTextArea.id = "FormattingTab-MessageFormatTextArea";
					this.messageFormatTextArea.setAttribute("placeholder", RaidLink.defaultMessageFormat);
					this.currentMessageFormat = DC_LoaTS_Helper.getMessageFormat();
					this.messageFormatTextArea.value = this.currentMessageFormat.replace("{line}", "\n");
					DC_LoaTS_Helper.registerEventHandler(this.messageFormatTextArea, "input", this.handleMessageFormatInput.bind(this));
					this.pane.appendChild(this.messageFormatTextArea);					
					
					var saveButton = document.createElement("button");
					saveButton.update("Save");
					saveButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(saveButton, "click", 
						function()
						{
							holodeck.processChatCommand("/raidformat " + this.currentMessageFormat);
						}.bind(this)
					);
					this.pane.appendChild(saveButton);
					
					var cancelButton = document.createElement("button");
					cancelButton.update("Cancel");
					cancelButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(cancelButton, "click", 
						function()
						{
							this.currentMessageFormat = DC_LoaTS_Helper.getMessageFormat();
							this.messageFormatTextArea.value = this.currentMessageFormat.replace("{line}", "\n");
							this.handleMessageFormatInput();
						}.bind(this)
					);
					this.pane.appendChild(cancelButton);
					
					var defaultButton = document.createElement("button");
					defaultButton.update("Reset to default");
					defaultButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(defaultButton, "click", 
						function()
						{
							holodeck.processChatCommand("/raidformat reset");
						}.bind(this)
					);
					this.pane.appendChild(defaultButton);
					
					
					
					
					
					var samplePostHeader = document.createElement("h2");
					samplePostHeader.className = "RaidMenuTab-SectionHeader";
					samplePostHeader.update("Sample Post");
					samplePostHeader.style.marginTop = "15px";
					this.pane.appendChild(samplePostHeader);
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					// --- Sample Link --- \\
					
					// Create the sample raid link area to display the results of the format
					var raidStorage = RaidManager.fetchStorage();
					
					// Find any valid link to use as a sample
					//TODO: Customizable sample
					for (var id_hash in raidStorage)
					{
						this.sampleRaidLink = raidStorage[id_hash].raidLink;
						if (typeof this.sampleRaidLink.getRaid().fullName == "undefined")
						{
							continue;
						}
						break;
					}
					
					// If there wasn't a valid sample in the local storage, generate one
					if (typeof this.sampleRaidLink == "undefined")
					{
						// Will not have state info, though
						this.sampleRaidLink = new RaidLink(1234567890, "abcdefghij", 4, "colonel");
					}

					this.messageFormatExampleLinkContainer = document.createElement("div");
					
					var p = document.createElement("p");
					p.className = "even";
					this.messageFormatExampleLinkContainer.appendChild(p);
					
					var username = holodeck._active_user._attributes._object.username;
					var usernameSpan = document.createElement("span");
					usernameSpan.setAttribute("username", username);
					usernameSpan.className = "username chat_message_window_username";
					usernameSpan.update(username);
					p.appendChild(usernameSpan);
					
					var separatorSpan = document.createElement("span");
					separatorSpan.className = "separator";
					separatorSpan.update(": ");
					p.appendChild(separatorSpan);
					
					this.messageSpan = document.createElement("span");
					this.className = "message";
					this.messageSpan.innerHTML = this.sampleRaidLink.getFormattedRaidLink();
					p.appendChild(this.messageSpan);
					
					var clearSpan = document.createElement("span");
					clearSpan.className = "clear";
					p.appendChild(clearSpan);
					
					
					this.pane.appendChild(this.messageFormatExampleLinkContainer);

				},
				
				handleMessageFormatInput: function()
				{
					this.currentMessageFormat = this.messageFormatTextArea.value.replace(/(?:\r\n|\r|\n)/g, "{line}");
					this.messageSpan.innerHTML = this.sampleRaidLink.getFormattedRaidLink(this.currentMessageFormat);
				}
		});
		
		/************************************/
		/********* Preferences Tab **********/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Preferences",
				tabPosition: 100,
				
				rightClickVisitedKey: "RightClickVisited",
				
				initPane: function()
				{
//					this.header = document.createElement("h1");
//					this.header.className = "RaidMenuTab-Header";
//					this.header.update("Preferences");
//					this.pane.appendChild(this.header);
//
					var htmlRet = this.createSimpleOptionHTML(
									"PreferencesMenu-RightClickVisitedInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(this.rightClickVisitedKey), 
									"Right-click should mark visited.", 
									"If checked, right clicking a link will mark it visited", 
									{
										onclick: function()
										{
											//TODO: Obviously, this should come from a key
											DC_LoaTS_Helper.setPref("RightClickVisited", this.checked);
										}
									}
					);

					this.pane.appendChild(htmlRet.wrapper);
				}
							
		});
		
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
		
		/************************************/
		/*********** Styles Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Styles",
				tabHeader: "Raid Styles",
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
						
						
					}
					
					this.pane.appendChild(this.optionRowTemplate);
				}
				
		});

		/************************************/
		/************ Utils Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Utils",
				tabHeader: "Utilities",
				tabPosition: 50,
				
				initPane: function()
				{
					//TODO: Fill out utilities tab
				}
							
		});
		
		RaidCommand.create( 
			{
				commandName: "autoupdate",
				aliases: [],
				// Custom parsing
				/*parsingClass: ,*/
				// Custom parsing means custom param text
				paramText: "[on/off]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
					
					// 
					switch(params.toLowerCase())
					{
						// If there was no command, display current state
						case "":
							var updatesState = GM_getValue(DC_LoaTS_Properties.storage.autoUpdate);
							if (typeof updatesState == "undefined")
							{
								updatesState = true;
							}
							
							if (updatesState)
							{
								ret.statusMessage = "Automatic update checks are <code>ON</code>. Turn them " + this.getCommandLink("OFF","OFF?");
							}
							else
							{
								ret.statusMessage = "Automatic update checks are <code>OFF</code>. Turn them " + this.getCommandLink("ON","ON?");
							}
							
							break;
						// Turn updates on
						case "on":
							var updatesState = GM_setValue(DC_LoaTS_Properties.storage.autoUpdate, true);
							ret.statusMessage = "Automatic update checks are now <code>ON</code>";
							break;
						// Turn updates off
						case "off":
							var updatesState = GM_setValue(DC_LoaTS_Properties.storage.autoUpdate, false);
							ret.statusMessage = "Automatic update checks are now <code>OFF</code>";
							break;
						// Not sure what this command was supposed to be
						default:
							ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
							ret.success = false;
					}
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Get autoupdate status"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/autoupdate toggle</code>\n";
					helpText += "Sets whether or not this script should automatically check for updates.\n";
					helpText += "where <code>toggle</code> <i>(optional)</i> is on or off\n";
					helpText += "\n";
					helpText += "If <code>toggle</code> is omitted, then the current status will be shown\n";
					helpText += "\n";
					helpText += "If there is an update to install and checks are on, when the page loads, a bar will appear";
					helpText += " at the top of the screen offering the option to update.\n";
					
					return helpText;
				}
			}
		);
	
		RaidCommand.create( 
			{
				commandName: "clearchat",
				aliases: [],
				// No parsing
				//parsingClass: ,
				handler: function(deck, raidLink, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true, statusMessage: "Chat cleared at " + (new Date().toLocaleString())};
						
					// Load the raid from the link's url
					holodeck._active_dialogue._message_window_node.childElements().invoke("remove");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Clear chat?"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/clearchat</code>\n";
					helpText += "Clears the text of the chat.\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "clearraids",
				aliases: ["clearraid", "raidclear", "raidsclear", "clearcache"],
				parsingClass: RaidFilter,
				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					ret = {};
					
					// If the user wants to clear all raids
					if (raidFilter.name == "all")
					{
						// Clear all raids stored in memory
						RaidManager.clear();
						
						// Notify the user
						ret.statusMessage = "All raids have been cleared from script memory.";
						ret.success = true;
					}
					// If there were no params. 
					// This used to clear all raids, but that was catching some people by surprise, :-P
					else if (params.length == 0)
					{
						// Notify the user
						ret.statusMessage = "/" + this.getName() + " no longer clears all raids. Use " + this.getCommandLink("all") + " to clear all raids or " + this.getCommandLink("help") + " to find out more about this command.";
						ret.success = true;
					}
					// The user posted specific criteria
					else
					{
						// Find all raids that match the user's criteria
						var raidLinks = RaidManager.fetchByFilter(raidFilter);
						
						// If the RaidManager executed successfully
						if (typeof raidLinks != "undefined")
						{
							// If we didn't match a single raid
							if (raidLinks.length == 0)
							{
								ret.statusMessage = "Could not locate any raids to clear matching <code>" + raidFilter.toString() + "</code>";
								ret.success = true;
							}
							// If we did match some raids
							else
							{
								// Delete all found raids from memory
								RaidManager.clear(raidLinks);
								
								// Notify the user
								ret.statusMessage = "Cleared " + raidLinks.length + " raids from memory.";
								ret.success = true;
							}
						}
						// RaidManager failed
						else
						{
							ret.statusMessage = "Did not understand command: <code>/" + this.getName() + " " + raidFilter.toString() + "</code>";
							ret.success = false;
						}
					}						
					return ret;
				},
				
				getOptions: function()
				{
					//TODO: Decide what options should go here
					var commandOptions;
					if (this.parser.name == "all")
					{
						commandOptions = {
							initialText: {
								text: "Clear all raids from memory"
							}
						};
					}
					else
					{
						commandOptions = {
							initialText: {
								text: "Clear raids from memory matching " + this.parser.toString()
							}
						};
					}
					
					return commandOptions;
				},

				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/clearraids raidName difficully {state:stateName} {age: timeFormat} {fs: fsFormat}</code>\n";
					helpText += "Deletes all raids from script memory.\n";
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "\n"
					helpText += "<b>Examples:</b>\n"
					helpText += "\n"
					helpText += "<i>Clear all seen but keep all visited raids<i>\n"
					helpText += "<code>/clearraids {state:seen}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n"
					helpText += "<code>/clearraids {state:seen} {age: <5h}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n"
					helpText += "<code>/clearraids {state:seen} {age: <5h} {fs:<1M}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all normal telemachus raids that you've visited before\n"
					helpText += "<code>/clearraids tele 1 {state:visited}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all void killer raids in memory\n"
					helpText += "<code>/clearraids killer</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all void nightmare vorden raids\n"
					helpText += "<code>/clearraids vorden 4</code>\n"
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "exportraids",
				aliases: ["dumpraids"],
				parsingClass: RaidFilter,
				
				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
						
					// Capture the start time of the query
					var queryStartTime = new Date()/1;
				
					// Declare ret object
					var ret = {};
					
					// Find all raids that match the user's criteria
					var raidLinks = RaidManager.fetchByFilter(raidFilter);
					
					// If the RaidManager executed successfully
					if (typeof raidLinks != "undefined")
					{
						// If we didn't match a single raid
						if (raidLinks.length == 0)
						{
							if (params.length == 0)
							{
								ret.statusMessage = "Could not locate any seen raids in memory.";
							}
							else
							{
								ret.statusMessage = "Could not locate any seen raids matching <code>" + params + "<code>";
							}
							
							// The lookup succeeded, we just didn't find anything
							ret.success = true;
						}
						// If we did match some raids
						else
						{
							// Capture all the text in one block
							var outputText = "";
							
							// For every link we found
							for (var i = 0; i < raidLinks.length; i++)
							{
								// Print matched links
								outputText += raidLinks[i].getURL() + "\n";
							}
							
							// Export the data we found
							DC_LoaTS_Helper.forceDownload(outputText, raidFilter.toString().replace(" ", "_").replace(/\W/gi, ""));
							
							// Print out the stats for the query
							ret.statusMessage = "<code>/" + this.commandName + " " + raidFilter.toString() + "</code> took " + (new Date()/1 - queryStartTime) + " ms and exported " + raidLinks.length + " results.";
							
							// Succeeded
							ret.success = true;
						}
					}
					// RaidManager failed
					else
					{
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
						ret.success = false;
					}

					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Export matching data"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/exportraids raidName difficulty {state: stateName} {age: timeFormat} {fs: fsFormat} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "Exports to file raids that you've seen before in chat"
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
					helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "farmvalue",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};

					var farmText = "<table>";
					farmText += "<tr><th>Stamina Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Void Killer</td><td>19.8</td><td>6.6</td></tr>";
					farmText += "<tr><td>Ragebeasts</td><td>12.6</td><td>6.3</td></tr>";
					farmText += "<tr><td>Telemachus</td><td>11.0</td><td>3.7</td></tr>";
					farmText += "<tr><td>CC Colonel</td><td>9.3</td><td>2.3</td></tr>";
					farmText += "<tr><td>Supreme Cybertollahs</td><td>8.4</td><td>2.1</td></tr>";
					farmText += "<tr><td>Carnus</td><td>6.6</td><td>2.6</td></tr>";
					farmText += "<tr><td>Carnifex</td><td>6.3</td><td>2.5</td></tr>";
					farmText += "<tr><td>Rautha</td><td>5.9</td><td>1.5</td></tr>";
					farmText += "<tr><td>Vespasia's Android</td><td>5.6</td><td>1.6</td></tr>";
					farmText += "<tr><td>CC Cruiser</td><td>5.3</td><td>1.3</td></tr>";
					farmText += "<tr><td>Assassin</td><td>4.5</td><td>1.4</td></tr>";
					farmText += "<tr><td>Vorden</td><td>4.2</td><td>1.4</td></tr>";
					farmText += "<tr><td>CC General</td><td>4.0</td><td>1.0</td></tr>";
					farmText += "<tr><td>Warmaster </td><td>3.7</td><td>0.8</td></tr>";
					farmText += "<tr><td>Robotic Rautha</td><td>3.7</td><td>0.9</td></tr>";
					farmText += "<tr><td>CC Sentinel</td><td>3.4</td><td>0.8</td></tr>";
					farmText += "<tr><td>Mermara</td><td>3.3</td><td>0.7</td></tr>";
					farmText += "<tr><td>Purple Lion</td><td>3.2</td><td>1.1</td></tr>";
					farmText += "<tr><td>Cybersmash</td><td>3.1</td><td>1.0</td></tr>";
					farmText += "<tr><td>Blood Alley Gang</td><td>2.8</td><td>0.9</td></tr>";
					farmText += "<tr><td>Tulk</td><td>2.2</td><td>0.6</td></tr>";
					farmText += "<tr><td>Scarlet Harlot</td><td>2.0</td><td>0.6</td></tr>";
					farmText += "<tr><td>Agony Ecstacy</td><td>1.8</td><td>0.7</td></tr>";
					farmText += "<tr><td>Sludge Serpent</td><td>1.8</td><td>0.7</td></tr>";
					farmText += "<tr><td>Lupin</td><td>1.7</td><td>0.7</td></tr>";
					farmText += "<tr><td>Mercury</td><td>1.6</td><td>0.6</td></tr>";
					farmText += "<tr><td>Storm Commander</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Sun-Xi</td><td>1.5</td><td>0.6</td></tr>";
					farmText += "<tr><td>Lt. Targe</td><td>1.4</td><td>0.6</td></tr>";
					farmText += "<tr><td>Guldax Quibberath</td><td>1.4</td><td>0.5</td></tr>";
					farmText += "<tr><td>Warden Ramiro</td><td>1.3</td><td>0.5</td></tr>";
					farmText += "<tr><td>Nemo</td><td>1.3</td><td>0.5</td></tr>";
					farmText += "<tr><td>Vulture Gunship</td><td>1.2</td><td>0.5</td></tr>";
					farmText += "<tr><td>Caligula</td><td>1.2</td><td>0.4</td></tr>";
					farmText += "<tr><td>Dule's</td><td>0.3</td><td>0.1</td></tr>";
					farmText += "<tr><td>Sigurd</td><td>3.2</td><td>1.6</td></tr>";
					farmText += "<tr><td>Fleet Com.</td><td>2.8</td><td>1.4</td></tr>";
					farmText += "<tr><td>Reaver</td><td>3.1</td><td>1.6</td></tr>";
					farmText += "<tr><td>Councilor</td><td>1.6</td><td>0.8</td></tr>";
					farmText += "<tr><td>Centurian Commander</td><td>0.0</td><td>0.0</td></tr>";
					farmText += "<tr><td></td><td></td><td></td></tr>"
					farmText += "<tr><th>Energy Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Vince Vortex</td><td>1.7</td><td>0.3</td></tr>";
					farmText += "<tr><td></td><td></td><td></td></tr>"
					farmText += "<tr><th>Honor Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Krakak Swarm</td><td>5.6</td><td>1.9</td></tr>";
					farmText += "<tr><td>Infected Squad</td><td>4.4</td><td>1.3</td></tr>";
					farmText += "<tr><td>Flying Saucers</td><td>4.0</td><td>1.6</td></tr>";
					farmText += "<tr><td>Lurking Horror</td><td>3.7</td><td>0.9</td></tr>";
					farmText += "<tr><td>Kang</td><td>3.4</td><td>1.0</td></tr>";
					farmText += "<tr><td>Tourniquet 7</td><td>2.4</td><td>0.9</td></tr>";
					farmText += "<tr><td>Ship of the Damned</td><td>2.3</td><td>0.8</td></tr>";
					farmText += "<tr><td>Wyrm</td><td>2.0</td><td>0.7</td></tr>";
					farmText += "<tr><td>Death Flora</td><td>1.9</td><td>0.6</td></tr>";
					farmText += "<tr><td>Crossbones Squadron</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Shadows</td><td>1.4</td><td>0.5</td></tr>";
					farmText += "<tr><td>Mr. Justice</td><td>1.1</td><td>0.3</td></tr>";
					farmText += "<tr><td>Rylattu Exterminators</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Colonel Mustard</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Luna</td><td>1.0</td><td>0.4</td></tr>";
					farmText += "<tr><td>Genesis</td><td>0.9</td><td>0.5</td></tr>";
					farmText += "<tr><td>Grislak</td><td>0.9</td><td>0.3</td></tr>";
					farmText += "<tr><td>Interceptor</td><td>0.9</td><td>0.2</td></tr>";
					farmText += "<tr><td>Peacemaker 500</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Qin Legion</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Juggernaut</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Squid</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Death Squadron</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Devourer</td><td>0.6</td><td>0.2</td></tr>";
					farmText += "<tr><td>Colby</td><td>0.5</td><td>0.2</td></tr>";
					farmText += "<tr><td>Legacy Bot</td><td>0.4</td><td>0.2</td></tr>";
					farmText += "</table>";
					farmText += "<a href=\"" + DC_LoaTS_Properties.farmSpreadsheetURL + "\" target=\"_blank\">Source</a>\n";

					deck.activeDialogue().raidBotMessage(farmText);
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display farm values"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/farmvalue</code>\n";
					helpText += "Displays the farm value of the raids per <a href=\"" + 
								DC_LoaTS_Properties.farmSpreadsheetURL + "\" target=\"_blank\">this spreadsheet</a>\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "linkstate",
				aliases: ["setcachestate", "setstate"],
				parsingClass: RaidLinkstateParser,
				/*public Object*/ handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// If there's a raid link but no new state set
					if (typeof parser.raidLink != "undefined" && typeof parser.state == "undefined")
					{
						// Get the current state
						var state = RaidManager.fetchState(parser.raidLink);
						
						// Print the current state
						ret.statusMessage = parser.raidLink.getName() + "(raid_id: " + parser.raidLink.id + ") is in state " + state.niceText;
						
						// Success
						ret.success = true;
					}
					// If there's a raid link and there's a new state to set it to
					else if (typeof parser.raidLink != "undefined" && typeof parser.state != "undefined")
					{
						// Get the actual state
						var actualState = RaidManager.STATE.valueOf(parser.state);
						
						DCDebug("About to set link to state: ");
						DCDebug(actualState);
						
						if (typeof actualState != "undefined")
						{
							// Set the new state for the raid link
							RaidManager.store(parser.raidLink, actualState);
							
							// Get the current state
							var state = RaidManager.fetchState(parser.raidLink);
							
							// Print the current state
							ret.statusMessage = parser.raidLink.getName() + " (raid_id: " + parser.raidLink.id + ") is now in state " + state.niceText;
							
							// Success
							ret.success = RaidManager.STATE.equals(parser.state, state);
						}
						// Could not actually locate the state the user tried to set this link to
						else
						{
							console.warn("Could not locate a corresponding state to " + parser.state + " in command " + text);

							// Failed
							ret.success = false;
							
							// Print the failure message
							ret.statusMessage = "Could not find match <code>" + parser.state + "</code> to a known state in <code>" + text + "</code>";
						}

					}
					// Must not have found a raid link
					else
					{
						// Failure
						ret.success = false;
						ret.statusMessage = "Could not find raid link in <code>" + text + "</code>";
					}
												
					return ret;
				},
				
				/*public Object*/ getOptions: function()
				{
					var linkState = RaidManager.fetchState(this.parser.raidLink);
					
					var commandOptions = {					
						initialText: {
							text: "Mark this " + linkState.niceText + " " + this.parser.getName(),
							executable: false
						},
					};
					
					for (var stateType in RaidManager.STATE)
					{
						if (typeof RaidManager.STATE[stateType] == "object" && linkState.id != RaidManager.STATE[stateType].id)
						{
							commandOptions["mark_" + stateType.toLowerCase()] = this.createStateOption(RaidManager.STATE[stateType]);
						}
					}
					
					DCDebug("Command Options: ");
					DCDebug(commandOptions);

					
					return commandOptions;
				},
				
				/*private Object*/ createStateOption: function(state)
				{
					return {
						text: state.niceText,
						callback: function(state){this.parser.state = state.id}.bind(this, state)
					};
				},
				
				/*protected String*/ buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadraid url</code>\n";
					helpText += "where <code>url</code> is the url of a raid\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "loadraid",
				aliases: ["addraid", "joinraid", "loadraids", "raidload", "raidadd", "raidjoin"],
				parsingClass: RaidLink,
				handler: function(deck, raidLink, params, text, context)
				{
					// Declare ret object
					var ret = {};
						
					// Load the raid from the link's url
					ret.success = !DC_LoaTS_Helper.loadRaid(raidLink.getURL());
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load raid: " + this.parser.getDifficultyText() + " " + this.parser.getName()
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadraid url</code>\n";
					helpText += "where <code>url</code> is the url of a raid\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "raid",
				aliases: ["raids"],
				parsingClass: RaidFilter,
				
				// Doesn't use all the filter params
				paramText: "[raidName] [raidDifficulty]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					if (typeof parser == "undefined")
					{
						console.error("WTF?");
						return;
					}
					
					// If this was a valid filter
					if (parser.isValid())
					{
						// Find the matching raid types
						var matchedTypes = DC_LoaTS_Helper.getRaidTypes(parser);
						
						// If we matched some raid types
						if (matchedTypes.length > 0)
						{
							for (var i = 0; i < matchedTypes.length; i++)
							{
								// Grab this raid
								var raid = matchedTypes[i];
								
								// Have the raid bot tell them 
								deck.activeDialogue().raidBotMessage(raid.getVerboseText(parser.difficulty));
							}
							
							ret.success = true;
						}
						// If we didn't match a single raid
						else
						{
							ret.success = true;
							ret.statusMessage = "Could not locate any raids matching <code>" + parser.name + "</code>";
						}
						
					}
					else
					{
						ret.success = false;
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Raid Info for: " + this.parser.name,
							executable: false,
						},
						all: {
							text: "All",
							callback: function()
							{
								DCDebug("Info All " + this.parser.name);
								delete this.parser.difficulty;
							},
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Info Normal " + this.parser.name);
								this.parser.difficulty = 1;
							},
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Info Hard " + this.parser.name);
								this.parser.difficulty = 2;
							},
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Info Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							},
						},
						
						nightmare: {
							text: "Nightmare",
							callback: function()
							{
								DCDebug("Info Nightmare " + this.parser.name);
								this.parser.difficulty = 4;
							}
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raid raidName difficulty</code>\n";
					helpText += "where <code>raidName</code> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "raidformat",
				aliases: [],
				// Custom parsing
				/*parsingClass: ,*/
				// Custom parsing means custom param text
				paramText: "[newFormat]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					if (params.length == 0)
					{
						// Retrieve the message format
						var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
						// Let the user know what the format is
						ret.statusMessage = "Current raid format: <code>" + messageFormat + "</code>" + 
											"\nUse <code>" + this.getCommandLink("help") + "</code> to list all formatting options.";

					}
					else if (params == "reset")
					{
						var messageFormat = RaidLink.defaultMessageFormat;
						
						// Retrieve the message format
						GM_setValue(DC_LoaTS_Properties.storage.messageFormat, messageFormat);

						// Let the user know what the format is
						ret.statusMessage = "Raid format reset to: <code>" + messageFormat + "</code>";
					}
					// Has a format and is not a help request
					else
					{
						// Store the message format
						GM_setValue(DC_LoaTS_Properties.storage.messageFormat, params);
						
						// Notify user that we stored it
						ret.statusMessage = "Raid format is now: <code>" + params + "</code>";
						
						// Update the posted links
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Set raid format to " + this.processedText
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					// Get the text of all the cache states
					var cache_state_text = "";
					var cache_state_nice_text = "";
					var cache_state_short_text = "";
					
					for (var stateName in RaidManager.STATE)
					{
						var state = RaidManager.STATE[stateName];
						if (typeof state == "object")
						{
							cache_state_text += state.text + ", ";
							cache_state_nice_text += state.niceText + ", ";
							cache_state_short_text += state.shortText + ", ";
						}
					}
					
					var unknownState = RaidManager.STATE.getUnknownState();
					cache_state_text += "or " + unknownState.text;
					cache_state_nice_text += "or " + unknownState.niceText;
					cache_state_short_text += "or " + unknownState.shortText;
					
					
					// Get the text of all the difficulties
					var difficulty_text = "";					
					for (var diffNum in RaidType.difficulty)
					{
						difficulty_text += RaidType.difficulty[diffNum] + ", ";
					}
					difficulty_text += "or Unknown (error)";
					
					// Get the text of all the short difficulties
					var diff_text = "";
					for (var diffNum in RaidType.shortDifficulty)
					{
						diff_text += RaidType.shortDifficulty[diffNum] + ", ";
					}
					diff_text += "or Unknown (error)";
					
					
					var helpText = "<b>Raid Command:</b> <code>/raidformat newFormat</code>\n";
					helpText += "where <code>newFormat</code> <i>(optional)</i> is the new format for raid links\n";
					helpText += "if <code>newFormat</code> is omitted, it will tell you your current raid format\n";
					helpText += "\n";
					helpText += "<b>Format options (hover for description):</b>\n";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_text + "\">cache-state</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_nice_text + "\">cache-state-nice</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">cache-state-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + difficulty_text + "\">difficulty</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + diff_text + "\">diff</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fs</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid Health\">health</span>, ";
					helpText += "<span class=\"abbr\" title=\"Unique Raid ID Number\">id</span>, ";
					helpText += "<span class=\"abbr\" title=\"Kongregate LoaTS icon\">image</span>, ";
					helpText += "<span class=\"abbr\" title=\"Break to the next line\">line</span>, ";
					helpText += "<span class=\"abbr\" title=\"Official Raid Name\">name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Same as target\">os</span>, ";
					helpText += "<span class=\"abbr\" title=\"Same as target\">optimal</span>, ";
					helpText += "<span class=\"abbr\" title=\"Official Short Raid Name\">short-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"User defined short name\">shorter-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Shortest identifiable name of the raid\">shortest-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid Size = Max raid members\">size</span>, ";
					helpText += "<span class=\"abbr\" title=\"S, E, and/or H if the raid uses Stamina, Energy, and/or Health\">stat</span>, ";
					helpText += "<span class=\"abbr\" title=\"Target (Damage) = FS * multiplier. Changes per raid size.\">target</span>, ";
					helpText += "<span class=\"abbr\" title=\"Duration of the raid\">time</span>, ";
					helpText += "<span class=\"abbr\" title=\"Full text url of the raid\">url</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + RaidManager.STATE.VISITED.niceText + "\" if you've loaded this raid before, blank otherwise\">visited</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + RaidManager.STATE.VISITED.shortText + "\" if you've loaded this raid before, blank otherwise\">visited-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid's Mission Zone. On Alliance raids, indicates Archimedes tier.\">zone</span>";
					helpText += "\n";
					helpText += "\n";
					helpText += "Options should be placed in <code>{}</code>\n";
					helpText += "\n";
					helpText += "<b>Default:</b>\n";
					helpText += "<code>" + this.getCommandLink(RaidLink.defaultMessageFormat) + "</code>\n";
					helpText += "<i class=\"smallText\">(<code>" + this.getCommandLink("reset") + "</code> will set your format back to this)</i>\n";
					helpText += "\n";
					helpText += "<b>Alternate Default:</b>\n";
					helpText += "<code>" + this.getCommandLink("{image} {visited} Raid: [{size}-{stat}-{difficulty}-{os}] {name}") + "</code>";
					helpText += "\n";
					helpText += "<b>Short:</b>\n";
					helpText += "<code>" + this.getCommandLink("{cache-state-short} {diff} {shorter-name}") + "</code>";
					helpText += "\n"
					helpText += "<b>Notes:</b>\n"
					helpText += "<code>{fs}</code> can also do simple math like <code>{fs*2}</code>\n"
					helpText += "Use <code>{line}</code> for new lines, and can be used multiple times.\n"
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "raidhelp",
				aliases: ["raidabout"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
					
					DC_LoaTS_Helper.printScriptHelp(deck, text);
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display doomscript help"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidhelp</code>\n";
					helpText += "Displays the help info for the script\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "raidstyle",
				aliases: [],
				parsingClass: RaidFilterStyleParser,

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					console.log(parser);
					
					if (typeof parser.raidFilter === "undefined" || parser.raidFilter.isEmpty())
					{
						//TODO: Display all existing raid styles
						
						
					}
					else if (typeof parser.linkStyle === "undefined" && typeof parser.messageStyle === "undefined" && typeof parser.imageStyle === "undefined")
					{
						//TODO: Display all raid styles that have the same filter
					}
					else
					{
						// Find all the styles matching this filter
						var matchingStyles = DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()];
						if (typeof matchingStyles === "undefined")
						{
							matchingStyles = [];
							DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()] = matchingStyles;
						}
						
						// Have the parser create CSS styles for itself.
						parser.injectStyles();
						
						// Add this to the list of styles for this filter
						matchingStyles.push(parser);
						
						// Success report
						ret.success = true;
						ret.statusMessage = parser.toString();
						
						// Refresh the links to see the change
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Execute this raid style command"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidstyle filter +linkStyle +messageStyle +imageStyle</code>\n";
					helpText += "\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "reload",
				aliases: ["refresh"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// true if we did reload, false otherwise
					ret.success = DC_LoaTS_Helper.reload();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Reload the game"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/reload</code>\n";
					helpText += "Attempts to reload just the game and not the window\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "seenraids",
				aliases: ["seenraid", "raidseen", "raidseen"],
				parsingClass: RaidFilter,
				handler: function(deck, raidFilter, params, text, context)
				{
					// Capture the start time of the query
					var queryStartTime = new Date()/1;
				
					// Declare ret object
					var ret = {};
					
					// Find all raids that match the user's criteria
					var raidLinks = RaidManager.fetchByFilter(raidFilter);
					
					// If the RaidManager executed successfully
					if (typeof raidLinks != "undefined")
					{
						// If we didn't match a single raid
						if (raidLinks.length == 0)
						{
							if (params.length == 0)
							{
								ret.statusMessage = "Could not locate any seen raids in memory.";
							}
							else
							{
								ret.statusMessage = "Could not locate any seen raids matching <code>" + params + "<code>";
							}
							
							// The lookup succeeded, we just didn't find anything
							ret.success = true;
						}
						// If we did match some raids
						else
						{
							// Retrieve the message format
							var messageFormat = DC_LoaTS_Helper.getMessageFormat();
						
							// Retrieve the anchor tag format
							var linkFormat = DC_LoaTS_Helper.getLinkFormat();
							
							// Capture all the text in one block
							var outputText = "\n";
							
							// For every link we found
							for (var i = 0; i < raidLinks.length; i++)
							{
								// We need to find the style the user has requested
								var className = raidLinks[i].getMatchedStyles().className;
								
								// Bits to wrap each message raid link with
								var wrapperFront = "<span class=\"seenraidMessageWrapper" + (className?" " + className:"") + "\">" + (i+1) + ") ";
								var wrapperBack = "</span>\n\n";
								
								// Print matched links
								outputText += wrapperFront + raidLinks[i].getFormattedRaidLink(messageFormat, linkFormat) + wrapperBack;
							}
							
							// Print out the raid links we found
							deck.activeDialogue().raidBotMessage(outputText);
							
							// Print out the stats for the query
							ret.statusMessage = "<code>/" + this.commandName + " " + raidFilter.toString() + "</code> took " + (new Date()/1 - queryStartTime) + " ms and yielded " + raidLinks.length + " results.";
							// Succeeded
							ret.success = true;
						}
					}
					// RaidManager failed
					else
					{
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
						ret.success = false;
					}
					
					return ret;
				},
				
				getOptions: function()
				{
					var commandOptions = {
						
						initialText: {
							text: "Seen raids: " + ((typeof this.parser.name != "undefined")?this.parser.name : "Unknown"),
						},
						
						any: {
							text: "Any",
							callback: function()
							{
								DCDebug("Seen Any " + this.parser.name);
								delete this.parser.difficulty;
							},
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Seen Normal " + this.parser.name);
								this.parser.difficulty = 1;
							},
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Seen Hard " + this.parser.name);
								this.parser.difficulty = 2;
							},
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Seen Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							},
						},
						
						nightmare: {
							text: "Nightmare",
							callback: function()
							{
								DCDebug("Seen Nightmare " + this.parser.name);
								this.parser.difficulty = 4;
							}
						}
					};
					
					return commandOptions;
				},

				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/seenraids raidName difficulty {state: stateName} {age: timeFormat} {fs: fsFormat} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "Looks up raids that you've seen before in chat"
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
					helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
					helpText += "\n";
					helpText += "<b>Examples:</b>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h} {fs:<1M}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all normal telemachus raids that you've not visited before\n";
					helpText += "<code>" + this.getCommandLink("tele 1 {state:!visited}") + " </code>\n";
					helpText += "\n";
					helpText += "<i>Find the first 10 void killer raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("killer {count: 10}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find the second 10 void killer raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("killer {count: 10} {page: 2}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all void nightmare vorden raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("vorden 4") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Looking for <a href=\"http://www.zoywiki.com/index.php/LotS/experiment/multicoloredcloorian\" title=\"Cloorian Material needed to craft some Legendary pants\">Cloorian Material<a/>\n";
					helpText += "<code>" + this.getCommandLink("vor|gan|nat 4 {age: <24h} {state: !visited}") + "</code>\n";
					
					return helpText;
				}
			}
		);
		
		// This is the general template which chat commands should follow
		RaidCommand.create( 
			{
				commandName: "template", // This is the /template command
				aliases: ["templateCommand", "commandTemplate"], // Also, /templateCommand and /commandTemplate
				parsingClass: RaidFilter, // Comment out this line, and a parser will not be created
				myCustomAttribute: "Foo",
				doNotEnumerateInHelp: true, // Don't list this in the help
				
				
				// It's highly advised to just delete this function entirely
				// but I've left it here, commented out, to show that it
				// can be used if you know what you're doing										
//					initialize: function($super, context, commandText)
//					{
//						// Do some special constructor logic here
//						
//						// In the name of all that is good, call the superclass constructor
//						// somewhere in here
//						$super(context, commandText);
//					},

				
				// Handle the execution of this command
				// Parameters:
				//		deck - The Kongregate holodeck
				//		parser - If there is a parsing class, this parser was run with the params
				// 		params - Command text stripped of /commandName from the front
				//		text - Full text of the command as it was called
				//		context - Where this command was called from, either chat or omnibox
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// The work should be done in here
					
					// Explicitly posting as the RaidBot to the chat
					// This only shows for the current user. This message is not sent to everyone.
					deck.activeDialogue().raidBotMessage("Hello World!");

					
					// Always set the success state
					// If the command succeeeded, set the status to true
					// If it failed, set it to false
					ret.success = true;
					
					// If you want to display a message to the user after the command
					// finishes, put the text of the message in ret.statusMessage
					// Unrelatedly, we can also access custom attributes like this.myCustomAttribute
					ret.statusMessage = this.myCustomAttribute;
					
					// Always way to return the ret object
					return ret;
				},
				
				// These options are what the omnibox uses to determine how to display
				// this command as an autocomplete option
				getOptions: function()
				{
					// Typically, there is just a single commandOptions object that is returned
					var commandOptions = {	
						// This option is a clickable link that will load
						// a page in a new window/tab like a real link				
						initialText: {
							// Text of the link
							text: "Open script homepage",
							// Attributes of the <a> tag of this link
							// If there are linkParams, the option will call the handler
							// unless doNotCallHandler is true
							linkParams: {href: this.myCustomFunction(), target: "_blank"},
							// Do not call the above handler function
							doNotCallHandler: true,
							// Actually let the browser load the link
							followLink: true,
						},
						
						// This option is just text. It doesn't do anything
						otherOption: {
							text: "Not clickable",
							// Sets this option to do nothing
							executable: false,
						},
						
						// This command actually runs the template command
						thirdOption: {
							// Text of the command button
							text: "Run Template Command",
							// If there's a callback, the option will call the handler
							// unless doNotCallHandler is true.
							callback: function()
									  {
									  	// Do work in here. Usually just minor
									  	// set up work since the handler is going
									  	// to be called next. 
									  	// If this code starts to get long, you
									  	// might consider going about it differently.
									  }
						}
					};
					
					// Make sure to return the options we just made
					return commandOptions;
				},
				
				// Custom functions go in just like needed functions
				myCustomFunction: function()
				{
					return DC_LoaTS_Properties.scriptURL;
				},
				
				// Here you simply construct the help text for when a user calls /template help
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/template</code>\n";
					helpText += "Prints hello world, or does something else\n";
					
					// Aliases for the command will be automatically appended to the bottom
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "time",
				aliases: ["servertime"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					ret.statusMessage = "Local Time is approximately: " + this.getLocalDateText() + "\n";
					ret.statusMessage += "Server Time is approximately: " + this.getServerDateText();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						config: {
							refreshEvery: 1000,
						},
						initialText: {
							text: "Local Time: " + this.getLocalDateText() + "<br>Server Time: " + this.getServerDateText()
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/time</code>\n";
					helpText += "Estimates the current server time (GMT) based on local system time.\n";
					
					return helpText;
				},
				
				getLocalDateText: function()
				{
					return new Date().toLocaleString();
				},
				getServerDateText: function()
				{
					var localDate = new Date();
					var serverDate =  new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000);
					return serverDate.toLocaleString().substring(0,25) + "GMT+0000 (UTC)";
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "update",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					window.open(DC_LoaTS_Properties.scriptDownloadURL, "_blank");
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Install the current stable script"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/update</code>\n";
					helpText += "Attempts to install the latest stable version on <a href=\"" + DC_LoaTS_Properties.scriptURL + "\">" + DC_LoaTS_Properties.scriptURL + "</a>.\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "wiki",
				aliases: ["search", "lookup", "zoywiki"],
				urlPattern: "http://www.zoywiki.com/index.php?title=Special:Search&search=LotS/{0}&go=Go",
				// No parsing
				/*parsingClass: ,*/
				paramText: "query",

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
											
					var url = this.createURL(params);
					
					window.open(url, "_blank");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Search Zoywiki for: " + this.processedText,
							linkParams: {href: this.createURL(this.processedText), target: "_blank"},
							doNotCallHandler: true,
							followLink: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/wiki searchText</code>\n";
					helpText += "where <code>searchText</code> is what you want to search for on Zoywiki\n";
					
					return helpText;
				},
				
				createURL: function(searchInput)
				{
					searchInput = searchInput || "";
					return this.urlPattern.format(escape(searchInput.replace(" ", "+")));
				}
			}
		);
		
//TODO: Rename to loadAll command. AutoLoad should be for incoming new raids, not loading existing ones
		RaidCommand.create(
			{
				commandName: "autoload",
				aliases: [],
				parsingClass: RaidFilter,

				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// Cancel the previous timer, if there is one
					if (typeof DC_LoaTS_Helper.autoLoader !== "undefined")
					{
						// Clear out the raidLinks array from the previous one.
						// The timeout will detect that there are suddenly no more links
						// and acknowledge the error state and quit.
						DC_LoaTS_Helper.autoLoader.raidLinks.length = 0;
					}
					
					
					// This only works with a valid filter
					if (raidFilter && raidFilter.isValid())
					{
						// Fetch all the links
						var raidLinks = RaidManager.fetchByFilter(raidFilter);
						
						// If there were any matched links
						if (raidLinks.length > 0)
						{
							// private variable to be closed over in the autoLoader
							var autoLoadCounter = 0;
							var startTime = new Date()/1;
							
							// Create function closure to be called repeatedly
							var autoLoader = function __autoload()
							{
								// This shouldn't be called without links, but just in case
								if (raidLinks.length > 0)
								{
									// Load the next raid
									DC_LoaTS_Helper.loadRaid(raidLinks.pop());
									
									// Keep track of how many we've loaded
									autoLoadCounter++;
									
									// If there are any links left, we'll need to continue loading them
									if (raidLinks.length > 0)
									{
										// Fire the loader again after a while
										DC_LoaTS_Helper.autoLoaderTimeout = setTimeout(__autoload, 6000);
									}
									else
									{
										// Calculate how long it took to load them all
										var endTime = new Date()/1;
										var took = (endTime - startTime)/1000;
										holodeck.activeDialogue().raidBotMessage("AutoLoad of " + raidFilter.toString() + " complete! " + autoLoadCounter + " raids loaded in " + took + "s.");
									}
								}
								else
								{
									// Calculate how long it took to load them all
									var endTime = new Date()/1;
									var took = (endTime - startTime)/1000;
									holodeck.activeDialogue().raidBotMessage("AutoLoad of " + raidFilter.toString() + " ended abruptly. " + autoLoadCounter + " raids loaded in " + took + "s.");
								}
							}
							
							ret.success = true;
							ret.statusMessage = "AutoLoad starting for " + raidFilter.toString();
							DC_LoaTS_Helper.autoLoader = {timeout: setTimeout(autoLoader, 1500), raidLinks: raidLinks};
						}
						else
						{
							ret.statusMessage = "AutoLoad could not find any raids matching your filter to load.";							
						}
						
						ret.success = true;
					}
					else
					{
						ret.success = false;
						ret.statusMessage = "Could not execute autoload due to invalid raid filter.";
					}
						
					return ret;
				},
				getOptions: function()
				{
					//TODO: Better options here
					var commandOptions = {					
						initialText: {
							text: "Load all raids matching the filter",
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/autoload raidFilter</code>\n";
					helpText += "where <code>raidFilter</code> is a valid raid filter\n";
					helpText += "\n";
					helpText += "Loads all seen raids that match the given filter\n";
					helpText += "\n";
					helpText += "<b>This feature is implemented for experimental/academic purposes only and should not be distributed!</b>\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "timerdata",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					deck.activeDialogue().raidBotMessage(Timer.getReport());
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Print the timer report",
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/timerdata</code>\n";
					helpText += "Prints out timing and performance data about the script\n";
					
					return helpText;
				}
			}
		);
		

// List of all raid ids and names. Any raid without a real raid id will not show up nicely.
DC_LoaTS_Helper.raids = 
{
	// Personal Raids
    sherlock_holmes:    new RaidType("sherlock_holmes",    "Z10", "The Murderer", "Murderer", "Murderer",              6,   1, "S",    [6000000, "N/A", "N/A", "N/A"]),
	
    // Public raids
    // Small Raids
    commander:          new RaidType("commander",           "Z1", "Centurian Commander", "CC Commander", "CC Comm",  168,  10, "S",     150000),
    ragebeasts:         new RaidType("ragebeasts",          "Z2", "Garlax Ragebeasts", "Ragebeasts", "Rage",         120,  10, "S",    2000000),
    cybertollahs:       new RaidType("cybertollahs",        "Z3", "Supreme Cybertollahs", "Cybertollahs", "Cyber-T",  72,  10, "S",    4000000),
    seth:               new RaidType("seth",                "Z4", "Nathaniel Vorden", "Vorden", "Vorden",             72,  10, "S",    6000000),
    purple_lion:        new RaidType("purple_lion",         "Z5", "Purple Lion", "Lion", "Lion",                      72,  10, "S",    8000000),
    scarlet_harlet:     new RaidType("scarlet_harlet",      "Z6", "The Scarlet Harlot", "Scarlet", "Harlot",          72,  10, "S",   10000000),
    lupin:              new RaidType("lupin",               "Z7", "Lupin", "Lupin", "Lupin",                          72,  10, "S",   12000000),
    lieutenant_targe:   new RaidType("lieutenant_targe",    "Z8", "Lieutenant Targe", "Targe", "Targe",              120,  10, "S",   14000000),
    sigurd:             new RaidType("sigurd",              "Z9", "Sigurd Spinebreaker", "Sigurd", "Sigurd",          72,  10, "S",   16000000),
    space_pox:          new RaidType("space_pox",           "P1", "Space Pox", "Pox", "Pox",                           5,  12, "S", [100000000, 500000000, 1000000000, 1500000000],/*FS calculated normally*/null,[35000000, 175000000, 350000000, 525000000]),
    quiskerian_temple:  new RaidType("quiskerian_temple",   "L1", "Quiskerian Temple", "Temple", "Temple",            10,  25, "S", [200000000, 1000000000, 2000000000, 3000000000]),
    
    // Medium Raids
    "void":             new RaidType("void",                "Z1", "Centurian Void Killer", "Void Killer", "VK",      168,  50, "S",    5000000),
    carnus:             new RaidType("carnus",              "Z2", "Carnus 9000", "Carnus", "Carnus",                 120,  50, "S",   15000000),
    cruiser:            new RaidType("cruiser",             "Z3", "Centurian Cruiser", "CC Cruiser", "Cruiser",       72,  50, "S",   25000000),
    china:              new RaidType("china",               "Z4", "Blood Alley Gang", "Gang", "Gang",                 72,  50, "S",   35000000),
    advocate_tulk:      new RaidType("advocate_tulk",       "Z5", "Advocate Tulk", "Tulk", "Tulk",                    75,  50, "S",   45000000),
    caligula:           new RaidType("caligula",            "Z6", "Caligula", "Caligula", "Cali",                     72,  50, "S",   55000000),
    warden_ramiro:      new RaidType("warden_ramiro",       "Z7", "Warden Ramiro", "Ramiro", "Ramiro",                72,  50, "S",   60000000),
    vulture_gunship:    new RaidType("vulture_gunship",     "Z8", "Vulture Gunship", "Vulture", "Vulture",            72,  50, "S",   65000000),
    xarpa:              new RaidType("xarpa",               "Z9", "Centurian Fleet Commander", "Fleet Com.", "Fleet Comm",72,50,"S",  70000000),
    bachanghenfil:      new RaidType("bachanghenfil",      "Z10", "Bachanghenfil", "Bachanghenfil", "Bach",           72,  50, "S",   [75000000, 97500000, 120000000, 150000000]),
    gut_phager:         new RaidType("gut_phager",         "Z11", "Gut-Phager", "Gut-Phager", "Phager",               72,  50, "S",   80000000),
    
    // Large Raids
    telemachus:         new RaidType("telemachus",          "Z1", "Telemachus", "Telemachus", "Tele",                168, 100, "S",   20000000),
    carnifex:           new RaidType("carnifex",            "Z2", "Carnifex Prime", "Carnifex", "Carni",             120, 100, "S",   35000000),
    rautha:             new RaidType("rautha",              "Z3", "Commander Rautha", "Rautha", "Rautha",             72, 100, "S",   50000000),
    assasin:            new RaidType("assasin",             "Z4", "Kelovar Assassin", "Assassin", "Assa",             72, 100, "S",   65000000),
    robotic_rautha:     new RaidType("robotic_rautha",      "Z5", "Robotic Rautha", "Rautha 2.0", "Robo Rautha",      75, 100, "S",   80000000),
    agony_and_ecstasy:  new RaidType("agony_and_ecstasy",   "Z6", "Agony and Ecstasy", "Agony, Ecstasy", "A&E",       72, 100, "S",   95000000),
    sun_xi:             new RaidType("sun_xi",              "Z7", "Sun Xi's Echo", "Psi-Echo", "Echo",                72, 100, "S",  100000000),
    sludge_serpent:     new RaidType("sludge_serpent",      "Z8", "Sludge Serpent", "Serpent", "Serpent",             72, 100, "S",  120000000),
    kalaxian_cult_mistress: new RaidType("kalaxian_cult_mistress","Z10","Kalaxian Cult-Mistress", "Cult-Mistress", "Cult",72, 100, "S",  [180000000, 234000000, 288000000, 320000000]),
                
    // Epic Raids
    colonel:            new RaidType("colonel",             "Z1", "Psychic Colonel", "CC Colonel", "Col.",           168, 250, "S",  150000000),
    vespasia:           new RaidType("vespasia",            "Z2", "Vespasia's Android", "Vespasia Bot", "Vesp",      168, 250, "S",  250000000),
    generalrahn:        new RaidType("generalrahn",         "Z3", "Centurian General", "CC General", "General",      168, 250, "S",  350000000),
    natasha:            new RaidType("natasha",             "Z4", "Natasha Cybersmash", "Cybersmash", "Cyber-S",     168, 250, "S",  450000000),
    centurian_sentinel: new RaidType("centurian_sentinel",  "Z5", "Centurian Sentinel", "CC Sentinel", "Sentinel",   165, 250, "S",  550000000),
    mercury:            new RaidType("mercury",             "Z6", "Mercury", "Mercury", "Mercury",                    72, 250, "S",  700000000),
    hultex_quibberath:  new RaidType("hultex_quibberath",   "Z7", "Guldax Quibberath", "Quibberath", "Quib",         168, 250, "S",  800000000),
    commander_veck:     new RaidType("commander_veck",      "Z8", "Centurian Storm Commander", "Storm", "Storm",     168, 250, "S",  900000000),
    reaver:             new RaidType("reaver",              "Z9", "Galactic Reaver", "Reaver", "Reaver",              72, 250, "S", 1000000000),
    the_hat:            new RaidType("the_hat",            "Z10", "The Hat", "Hat", "Hat",         	                  72, 250, "S", [1100000000, 1475000000, 1850000000, 2200000000]),
    
    // Colossal Raids
    besalaad_warmaster: new RaidType("besalaad_warmaster",  "Z5", "Besalaad Warmaster", "Warmaster", "Warmaster",    160, 500, "S",  700000000),
    mermara:            new RaidType("mermara",             "Z6", "Mermara", "Mermara", "Mermara",                   168, 500, "S",  800000000),
    nemo:               new RaidType("nemo",                "Z7", "Nemo",    "Nemo", "Nemo",                         168, 500, "S", 1000000000),
    the_emperor:        new RaidType("the_emperor",         "Z8", "Dule's Robot", "Dule's Bot", "Dule",              168, 500, "S", 5000000000),
    dule_warmaster:     new RaidType("dule_warmaster",      "Z9", "Centurian Councilor", "CC Councilor", "Councilor", 24, 500, "S", 2500000000),
    crush_colossa:      new RaidType("crush_colossa",      "Z10", "Crush Colossa", "Colossa", "Crush",              72, 500, "S", 3000000000),
    
    // Aliance Raids
    // Small Raids
    krakak:             new RaidType("krakak",              "A0", "Krakak Swarm", "Swarm", "Swarm",                  120,  10, "H",    4500000),
    kang:               new RaidType("kang",                "A1", "Kang", "Kang", "Kang",                            120,  10, "H",    5000000),
    crossbones_squadron: new RaidType("crossbones_squadron","A2", "Crossbones Squadron", "Crossbones", "XBones",     120,  10, "H",    8000000),
    colonel_mustard:    new RaidType("colonel_mustard",     "A3", "Colonel Mustard", "Mustard", "Mustard",           120,  10, "H",   12000000),
    professor_squid:    new RaidType("professor_squid",     "A4", "Professor Squid", "Squid", "Squid",               120,  10, "H",   18000000),
    terminus_death_squad: new RaidType("terminus_death_squad","A5", "Terminus Death Squad", "Death Squad", "Death Squad",120,10,"H",  24000000),
    
    // Medium Raids
    infection:          new RaidType("infection",           "A0", "Infected Squad",    "Infected", "Infected",       144,  50, "H",   30000000),
    flora:              new RaidType("flora",               "A1", "Ruomyes' Death Flora", "Death Flora", "Flora",    144,  50, "H",   35000000),
    psychic_cyborg:     new RaidType("psychic_cyborg",      "A2", "Mr. Justice", "Justice", "Justice",               144,  50, "H",   45000000),
    grislak:            new RaidType("grislak",             "A3", "Grislak", "Grislak", "Grislak",                   144,  50, "H",   55000000),
    qin_legion:         new RaidType("qin_legion",          "A4", "Qin Legion",    "Legion", "Legion",               144,  50, "H",   65000000),
    terminus_interceptor_squadron: new RaidType("terminus_interceptor_squadron","A5", "Terminus Interceptor Squadron", "Interceptor", "Interceptor", 144, 50,"H",75000000),
    luna:               new RaidType("luna",                "A6", "Luna", "Luna", "Luna",                            120,  50, "H",   50000000),
    trashmaster:        new RaidType("trashmaster",         "A6", "Trashmaster Colby", "Colby", "Colby",             144,  50, "H",  100000000),
    
    // Large Raids
    saucers:            new RaidType("saucers",             "A0", "Flying Saucers",    "Saucers", "Saucers",         168,  100, "H",   55000000),
    tourniquet:         new RaidType("tourniquet",          "A1", "Tourniquet 7", "Tourniquet 7", "T7",              168,  100, "H",   60000000),
    rylattu_exterminator: new RaidType("rylattu_exterminator","A2", "Rylattu Exterminator", "Exterminator","Exterminator",168,100,"H",100000000),
    peacemaker_500:     new RaidType("peacemaker_500",      "A3", "Peacemaker 500",    "Peacemaker", "Peacemaker",   168,  100, "H",  140000000),
    kaltharan_devourer: new RaidType("kaltharan_devourer",  "A4", "Kaltharan Devourer", "Devourer", "Devourer",      168,  100, "H",  180000000),        
    terminus_juggernaut: new RaidType("terminus_juggernaut","A5", "Terminus Juggernaut", "Juggernaut", "Juggernaut", 168,  100, "H",  200000000),
    legacy_bot:         new RaidType("legacy_bot",          "A6", "Legacy Bot",    "Legacy", "Legacy",               168,  100, "H",  250000000),
    wahsh:              new RaidType("wahsh",               "AX", "Wahsh Al-Sahraa", "Wahsh", "Wahsh",                84,  100, "H", [500000000, 1200000000, 3125000000, 7812500000]),
    
    // Epic Raids
    lurking_horror:     new RaidType("lurking_horror",      "A2", "Lurking Horror", "Lurking", "Lurking",            168,  250, "H",  250000000),
    ship_of_the_damned: new RaidType("ship_of_the_damned",  "A3", "Ship of the Damned", "Damned", "Damned",          168,  250, "H",  300000000),
    mecha_wyrm:         new RaidType("mecha_wyrm",          "A4", "Mecha-Wyrm", "Wyrm", "Wyrm",                      168,  250, "H",  350000000),
    contest_winners:    new RaidType("contest_winners",     "A6", "Shadows of the Void", "Shadows", "Shadows",       168,  250, "H",  500000000),
    genesis:            new RaidType("genesis",             "A5", "Genesis", "Genesis", "Genesis",                   165,  250, "H", 1000000000),
    celebration_enhancer_1: new RaidType("celebration_enhancer_1","AX","Celebration Enhancer J-54","Celebrator","Celeb",84,250, "H",  600000000),

    // Galactic Raids
    // Infestation Trilogy
    inf_ship:           new RaidType("inf_ship",            "WR", "The Python", "Python", "Python",                  100,  90000, "SEH", "Infinite", "N/A", 1000000000),
    inf_colony:         new RaidType("inf_colony",          "WR", "Infested Colony", "Colony", "Colony",             100,  90000, "SEH", "Infinite", "N/A", 1000000000),
    inf_lair:           new RaidType("inf_lair",            "WR", "Alien Lair", "Lair", "Lair",                      100,  90000, "SEH", "Infinite", "N/A", 1000000000),
    
    general_skorzeny:   new RaidType("general_skorzeny",    "WR", "General Skorzeny", "Skorzeny", "Skorz",           72,  90000, "SEH","Infinite","N/A", 100000000000),
    
    // Galaxy Dome Raids
    vince_vortex:       new RaidType("vince_vortex",        "GD", "Vince Vortex", "Vince", "Vince",                   72,  500, "E",  600000000)
    
};

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
			            if (/^\w_/gi.test(substr)){continue;}
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
	}// End declareClasses function
	
	// Define some CSS Styles
	function defineStyles()
	{
				var rulesText = "abbr, acronym, span.abbr {\n";
				rulesText += "\tborder-bottom: 1px dashed #444444;\n";
				rulesText += "}\n";
				
				rulesText += "\n.smallText {\n";
				rulesText += "\tfont-size: 85%;\n";
				rulesText += "}\n";
				
				
				rulesText += "\na.DC_LoaTS_updateLink {\n";
				rulesText += "\tbackground: #BAE37F url(http://userscripts.org/images/sprite.png?2) right -130px no-repeat;\n";
				rulesText += "\tborder: 1px solid #888; padding: 2px 16px;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tfont-weight: bold;\n";
				rulesText += "\tfont-size: 1.5em;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "\tcolor: #004 !important;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "}\n";
								
				rulesText += "\na.DC_LoaTS_updateLink:hover {\n";
				rulesText += "\tcolor: #08F !important;\n"								
				rulesText += "\tbackground: url(http://userscripts.org/images/sprite.png?2) right 0px no-repeat;\n";
				rulesText += "}\n";
				
				
				// -- Raid Menu Styles -- \\
				
				rulesText += "\n#DC_LoaTS_raidMenu {\n";
//				rulesText += "\theight: 60%;\n";
				rulesText += "\twidth: 775px;\n";
//				rulesText += "\tbackground: #062834;\n";
//				rulesText += "\tbackground: #0E5969 url(http://jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
				rulesText += "\tposition: fixed;\n";
				rulesText += "\tleft: 7%;\n";
				rulesText += "\ttop: 20%;\n";
				rulesText += "\tz-index: 99999999;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
//				rulesText += "\tborder:  2px solid #93CDD0;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidMenuClose {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\twidth: 50px;\n";
				rulesText += "\theight: 45px;\n";
				rulesText += "\tcursor: pointer;\n";
				rulesText += "}\n";


				rulesText += "\n#DC_LoaTS_raidMenuTitleBar {\n";
				rulesText += "\tbackground: #347D87 url(http://jqueryui.com/themeroller/images/?new=347d87&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;\n";
				rulesText += "\tpadding:  2px 10px;\n";
				rulesText += "\tborder-top-left-radius: 5px;\n";
//				rulesText += "\tborder-top-right-radius: 5px;\n";
				rulesText += "\tborder-right-width: 0px;\n";
				rulesText += "\twidth: 702px;\n";
				rulesText += "\theight: 37px;\n";
				rulesText += "\tcursor: move;\n";
				rulesText += "\tfont-size: 15pt;\n";
				rulesText += "\tcolor: #DEECED;\n";
				rulesText += "\tborder: 3px solid #93CDD0;\n";
				rulesText += "\tborder-bottom: 1px solid #062834;\n";
				rulesText += "\tborder-right-width: 0px;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidMenuTitleBarLeft {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTitleBarCenter {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\tmargin: auto;\n";
				rulesText += "\twidth: 400px;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTitleBarRight {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuBodyWrapper {\n";
				rulesText += "\tbackground: #0E5969 url(http://jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
				rulesText += "\tborder: 3px solid #93CDD0;\n";
				rulesText += "\tborder-top-width: 0px;\n";
				rulesText += "\tborder-bottom-left-radius: 5px;\n";
				rulesText += "\tborder-bottom-right-radius: 5px;\n";
				rulesText += "}\n";
				
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs {\n";
				rulesText += "\tclear: both;\n";
				rulesText += "\tborder-bottom: 1px solid #CCC;\n";
				rulesText += "\theight: 23px;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs li {\n";
				rulesText += "\tlist-style: none;\n";
				rulesText += "\tfont-family: Verdana, sans;\n";
				rulesText += "\tfont-size: 11px;\n";
				rulesText += "\tline-height: 18px;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\tmargin-right: 5px;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "\t;\n";
				rulesText += "\t;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs li a {\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\theight: 20px;\n";
				rulesText += "\tpadding: 0px 6px;\n";
				rulesText += "\twidth: 80px;\n";
				rulesText += "\tbackground-color: #153041;\n";
				rulesText += "\tborder: 2px solid #41B0B5;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tborder-top-left-radius: 5px;\n";
				rulesText += "\tborder-top-right-radius: 5px;\n";
				rulesText += "\tfont-size: 115%;\n";
				rulesText += "\tcolor: #FFFFFF;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs li a.active {\n";
				rulesText += "\tbackground-color: #57959E;\n";
				rulesText += "\tborder: 2px solid #F1FFFF;\n";
				rulesText += "\tcolor: #B7E5EE;\n";
				rulesText += "}\n";
				
				rulesText += "\n.RaidMenuTab-Header {\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuOptionWrapper {\n";
				rulesText += "\tborder-bottom: 1px solid #479090;\n";
				rulesText += "\tmargin-bottom: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuOptionWrapper div{\n";
				rulesText += "\tpadding: 5px;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuDescription{\n";
				rulesText += "\tpadding-left: 15px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuPane {\n";
				rulesText += "\tbackground: #77C0C0 url(http://jqueryui.com/themeroller/images/?new=77c0c0&w=1&h=100&f=png&q=100&fltr[]=over|textures/06_inset_hard.png|0|0|50) 50% bottom repeat-x;\n";
				rulesText += "\tfont-size: 1.2em;\n";
				rulesText += "\tpadding: 5px 10px;\n";
				rulesText += "\tmin-height: 200px;\n";
				rulesText += "\tmax-height: 600px;\n";
				rulesText += "\toverflow: auto;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuPane h1{\n";
				rulesText += "\tborder-bottom: 1px solid #000000;\n";
				rulesText += "\tmargin-bottom: 15px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuPane h2{\n";
				rulesText += "\tborder-bottom: 1px solid #479090;\n";
				rulesText += "\tmargin-bottom: 10px;\n";
				rulesText += "}\n";
				
				
				
				rulesText += "\n#RaidsMenu-SearchWrapper {\n";
				rulesText += "\twidth: 50%;\n";
				rulesText += "\tmargin: auto;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#RaidsMenu-SearchBox {\n";
				rulesText += "\twidth: 70%;\n";
				rulesText += "\tmin-width: 150px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#RaidsMenu-ResultsBox {\n";
				rulesText += "\tmax-height: 300px;\n";
				rulesText += "\toverflow: auto;\n";
				rulesText += "}\n";				
				
				rulesText += "\n#FormattingTab-MessageFormatTextArea {\n";
				rulesText += "\twidth: 100%;\n";
				rulesText += "\tmin-height: 35px;\n";
				rulesText += "}\n";				
				
				
				rulesText += "\n.FormattingTab-Button {\n";
				rulesText += "\tpadding: 3px 15px 4px;\n";
				rulesText += "}\n";				
				
				rulesText += "\n.StylesTab-RaidNamesPicker {\n";
				rulesText += "\tfloat:left;\n";
				rulesText += "}\n";				
				
				
				
				
				
				rulesText += "\n#DC_LoaTS_notifitcationBar {\n";
				rulesText += "\tbackground: #f8dc5a url(http://jqueryui.com/themeroller/images/?new=f8dc5a&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;\n";
				rulesText += "\tpadding:  4px 10px; 0px\n";
				rulesText += "\twidth: 100%;\n";
				rulesText += "\tfont-size: 12pt;\n";
				rulesText += "\tcolor: #915608;\n";
				rulesText += "\tborder-bottom: 1px solid #fcd113;\n";
				rulesText += "\tposition: fixed;\n";
				rulesText += "\ttop: 0px;\n";
				rulesText += "\tleft: 0px;\n";
				rulesText += "\tz-index: 99999999;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notifitcationBarTitle {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notifitcationBarText {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notifitcationBarButtons {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "\tpadding-top:1px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notifitcationBarButtons a.DC_LoaTS_updateLink {\n";
				rulesText += "\tfont-size: inherit;\n";
				rulesText += "\tmargin-right:10px;\n";
				rulesText += "}\n";
				
				rulesText += "\na.DC_LoaTS_notifitcationBarButton {\n";
				rulesText += "\tbackground-color: #F9B83E;\n";
				rulesText += "\tborder: 1px solid #915608;"
				rulesText += "\tpadding: 2px 10px;\n";
				rulesText += "\tmargin-right: 10px;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tfont-weight: bold;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "}\n";
								
				rulesText += "\na.DC_LoaTS_notifitcationBarButton:hover {\n";
				rulesText += "\tcolor: #915608;\n"								
				rulesText += "\tbackground: #FDE477;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer {\n";
				rulesText += "\tcolor: #FFFFFF;\n"								
				rulesText += "\tlist-style: none;\n"								
				rulesText += "\tbackground: #113552 url(http://jqueryui.com/themeroller/images/?new=113552&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\theight: 16px;\n";
				rulesText += "\tpadding: 2px 5px;\n";
				rulesText += "\ttext-align:left;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidToolbarContainer li {\n";
				rulesText += "float:left;";
				rulesText += "}\n";
				

				rulesText += "\na.DC_LoaTS_button {\n";
				rulesText += "\twidth: 16px;\n";
				rulesText += "\theight: 16px;\n";
				rulesText += "\tbackground: url(http://jqueryui.com/themeroller/images/?new=e0fdff&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png);\n";
				rulesText += "\tbackground-repeat: no-repeat;\n";
				rulesText += "\tcursor: pointer;\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_menuButton {\n";
				rulesText += "\tbackground-position: -48px -80px;";
				rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_reloadButton {\n";
				rulesText += "\tbackground-position: -160px -64px;";
				rulesText += "}\n";

				rulesText += "\n.DC_LoaTS_omnibox {\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\tborder-color: #FFFFFF;\n"								
				rulesText += "\tbackground-color: #71A5CE;\n";
				rulesText += "\tpadding: 0px 2px !important;\n";
				rulesText += "}\n";
								
				rulesText += "\n.DC_LoaTS_omnibox_focus {\n";
				rulesText += "\tborder-color: #71A5CE;\n"								
				rulesText += "\tbackground-color: #FFFFFF;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_omniboxWrapper {\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\tposition: relative;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_omniboxCommandsWrapper {\n";
				rulesText += "\tbackground: #113552 url(http://jqueryui.com/themeroller/images/?new=113552&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
				rulesText += "\tlist-style: none;\n";
				rulesText += "\tz-index: 999;\n";
				rulesText += "\tposition: absolute;\n";
				rulesText += "\twidth: 630px;\n";
				rulesText += "\tpadding: 5px;;\n";
				rulesText += "\tborder-bottom-left-radius: 5px;\n";
				rulesText += "\tborder-bottom-right-radius: 5px;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li{\n";
				rulesText += "\tfloat:none;\n";
				rulesText += "\tmargin: 0px;\n";
				rulesText += "\tbackground-color: #051E2A;\n";
				rulesText += "\tfont-size: 1.3em;\n";
				rulesText += "\toverflow: hidden;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li a{\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\tcolor: #EEEEEE;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tfloat:left;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li a:hover{\n";
				rulesText += "\tbackground-color: #57959E;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li:first-child{\n";
				rulesText += "\tborder-top-left-radius: 5px;\n";
				rulesText += "\tborder-top-right-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li:last-child{\n";
				rulesText += "\tborder-bottom-left-radius: 5px;\n";
				rulesText += "\tborder-bottom-right-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li a:first-child, #DC_LoaTS_raidToolbarContainer li li div:first-child{\n";
				rulesText += "\tpadding-left: 10px !important;\n";
				rulesText += "}\n";
				
				
				
				
				
				//--- Onnibox Option Styles ---\\
				
				rulesText += "\n.DC_LoaTS_initialtext {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\tpadding-left: 0px !important;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_omniboxOption {\n";
				rulesText += "\tpadding: 2px 10px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_any {\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_normal {\n";
				rulesText += "\tcolor:#48C957;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_normal:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#48C957;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_hard {\n";
				rulesText += "\tcolor:#E3E72E;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_hard:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#E3E72E;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_legendary {\n";
				rulesText += "\tcolor:#CB0039;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_legendary:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#CB0039;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_nightmare {\n";
				rulesText += "\tcolor:#B84EFE;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_nightmare:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#B84EFE;\n";
				rulesText += "}\n";
				

				var head = document.getElementsByTagName('head')[0],
				    style = document.createElement('style'),
				    rules = document.createTextNode(rulesText);
				
				style.type = 'text/css';
				
				if(style.styleSheet)
				{
				    style.styleSheet.cssText = rules.nodeValue;
				}
				else
				{
					style.appendChild(rules);
				}
				
				head.appendChild(style);
	}
	
	function setupGMFunctions()
	{
		if (typeof GM_setValue === 'undefined')
		{
			if(window.opera)
			{
				if(window.localStorage)
				{
					console.log("Creating Opera local storage fallbacks for GM functions");
					window.GM_setValue = function(k, v)
					{
						localStorage.setItem(k, v);
					}
					window.GM_getValue = function(k, def)
					{
						var ret = localStorage.getItem(k);
						return (ret == null?def:ret)
					}
					window.GM_deleteValue = function(k)
					{
						localStorage.removeItem(k);
					}
				} 
				else
				{
					window.GM_setValue = function(){console.warn("Local Storage not accessible.");};
					window.GM_getValue = function(){console.warn("Local Storage not accessible.");};
					window.GM_deleteValue = function(){console.warn("Local Storage not accessible.");};
				}
			}
			else if(/Chrome/i.test(navigator.appVersion) || typeof unsafeWindow === "undefined")
			{
				console.log("Creating Chrome local storage fallbacks for GM functions");
				window.GM_setValue = function(k, v)
				{
					localStorage.setItem(k, v);
				}
				window.GM_getValue = function(k, def)
				{
					var ret = localStorage.getItem(k);
					return (ret == null?def:ret)
				}
				window.GM_deleteValue = function(k)
				{
					localStorage.removeItem(k);
				}
			}
		}
	}
	
	function doCriticalHooks()
	{
		// Have the raid bot post a message to the user
		ChatDialogue.prototype.raidBotMessage = function(message)
		{
			holodeck.activeDialogue().displayUnsanitizedMessage("RaidBot",
														 	message.replace(/\n/g, "<br />\n"),
														 	{class: "whisper received_whisper"},
															{non_user: true} 
														   );
		}
	}
	
	// Gotta jumpstart this bucket of giggles	
    function bootstrap_DC_LoaTS_Helper(loadSubFrames)
    {
    	// Only run if the script is running in the top frame
    	if (top !== self && loadSubFrames != true)
    	{
    		return;
    	}
    	
		if (typeof window._dc_loats_helper_fails == "undefined")
        {
        	window._dc_loats_helper_fails = 0;
        }
        
        if (window._dc_loats_helper_fails >= 10)
        {
            console.warn("DC LoaTS Link Helper could not load.");
        	return;
        }

    	// Don't want to run the script twice
    	if (!window._dc_loats_helper)
    	{
	        
	        // Do we actually have everything we need to start?
	        if (typeof holodeck == "undefined" || typeof ChatDialogue == "undefined" || typeof Class == "undefined")
	        {
	        	// Something is not loaded yet. Bail on this and try again later
//	            console.log("DC LoaTS Link Helper not ready. Fail " + window._dc_loats_helper_fails + "/10");
	            
	            window._dc_loats_helper_fails++;
	            setTimeout(bootstrap_DC_LoaTS_Helper, 1000); // 1000ms = 1 second
	            return;
	        }
	        
	        // Print that we're about to start
    		console.info("DC LoaTS Link Helper v" + DC_LoaTS_Properties.version + " trying to start...");
	        
	        // Setup GreaseMonkey functions
	        setupGMFunctions();
	        
	        // Do critical hooks
	        doCriticalHooks();
	        
	        // Declare classes
	        declareClasses();
	        
	        // Define styles
	        defineStyles();
	        
    		// Throw a reference to this onto the window I guess in case anyone else wants to use it?
			window._dc_loats_helper = new DC_LoaTS_Helper();
    	}
    	
    	// Everything is done
        console.info("DC LoaTS Link Helper started!");
    }
    
    // Hit the go button and activate the main script.
    bootstrap_DC_LoaTS_Helper();
}


// This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
if (/https?:\/\/www\.kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns.*/i.test(window.location.href))
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}