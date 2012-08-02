// ==UserScript==
// @name           Kongregate Legacy of a Thousand Suns Raid Link Helper
// @namespace      tag://kongregate
// @description    Improves the text of raid links and stuff
// @author         doomcat
// @version        1.1.0
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

*/

// Wrapper function for the whole thing. This gets extracted into the HTML of the page.
function main()
{
	// Properties for this script
	window.DC_LoaTS_Properties = {
		// Script info
    	version: "1.1.0",
    	
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
