// ==UserScript==
// @name           Kongregate Legacy of a Thousand Suns Raid Link Helper
// @namespace      tag://kongregate
// @description    Improves the text of raid links and stuff
// @author         doomcat
// @version        1.1.20
// @date           02.01.2012
// @include        http://www.kongregate.com/games/*/*
// ==/UserScript== 

/*
License: "Kongregate Legacy of a Thousand Suns Raid Link Helper for Chat" (henceforth known as "doomscript") is free to download and use unlimited times on unlimited devices. You're allowed to modify the script for personal use, but you need written permission from doomcat to distribute those modifications. If you plan to distribute doomscript in whole or in part, modified or not, as part of an application other than in userscript form, some fees may apply. Contact doomcat for pricing. 

Warranty: This userscript comes with no assurance or guarantee of functionality, suitability, or other promise of working as you intend. doomcsript is provided as-is.
*/


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
Updated autoload timer

2012.09.04 - 1.1.2
Improved AutoLoad to have more descriptive messages
Added Load Raids In Background

2012.09.05 - 1.1.3
Commented out Load Raids In Background due to ToS concerns
Added new Hound alliance raid

2012.09.12 - 1.1.4
Added new G. Rahn raid

2012.09.18 - 1.1.5
Added /loadpastebin command
Fixed weird height layout issue with game and chat area

2012.09.21 - 1.1.6
Added Cerebral Destroyer WR

2012.10.02 - 1.1.7
Fixed export function in Chrome
Updated hotlinked image location
Updated Python Data

2012.10.18 - 1.1.8
Added /markall filter state command
Altered /autoload timer in some cases
Added /linktools command to list tools links
Added /pasteraids command
Added blob raid
Fixed export function in Chrome, again

2012.11.02 - 1.1.9
Fixed bug with exportraids killing the omnibox
Added two new raids, Nosferatu Nick and Haunted House

2012.11.02 - 1.1.10
Added 3 new Zone A raids, Boar, Cake, and Guan Yu

2012.11.15 - 1.1.11
Added 3 new Zone A raids, Missile Strike, Bashan, and Your Wrath

2012.11.16 - 1.1.12
Fixed bug where Cerebral Destroyed had gotten deleted
Altered the way export raids works until a longer term solution can be provided

2012.11.16 - 1.1.13
Added 3 new Zone A2 raids, Cyborg Shark, Vlarg Relic Hunter, and Anthropist Xenocide Warship
Fixed unknown links to not say Undefined Undefined over and over

2012.11.28 - 1.1.14
Added 3 new Zone A2 raids. Bile Beast, Pi, and Lubu
Added aliases of /loadpastebin as /loadraidbin and /lrb
Added aliases of /exportraids as /exportraid and /er
Added /updateraiddata or /updatedata or /urd command to pull down new raid data as it's available without updating script
Visted and Completed raids won't be matched by a filter unless {state: visited} or {state: completed} are specifically used
Accepted a patch from sycdan doing the following:
- Formatting: Added {state} and {status} as aliases to {cache-state-nice}
- Formatting: Added {state-short} and {status-short} as aliases to {cache-state-short}
- Raids Tab: Links should now get their state updated to match what they do in chat
- Formatting Tab: Sample raid (when all raids are cleared) will now always have FS/OS
- Chat Commands: /clearchat now aliased with /cc and /cls
- Chat Commands: /raid now aliased with some typo checks
- Chat Commands: /loadraid now aliased with /lr
- Chat Commands: /seenraids now aliased with /sr

2012.11.30 - 1.1.15
Added new World Raid: Kraken
Added new World Raid Tab, Timer, and Loot Table
Fixed visited links not showing up ever in /exportraids
Fixed update raid data being annoying

2012.12.11 - 1.1.16
Removed Kraken World Raid info
Added Snowman Rare Spawn info
Altered some WR display code
Performance tuned some raid loading code
Added link formatting for Alliance invites
Added new Alliance Raid: Crazed Santa

2012.12.14 - 1.1.17
Added two new Alliance Raids: SANTA's Workshop and Rabid Reindeer
Updated Snowman rare spawn info, due to new snowman
Added two new Zone 15 Raids: Tentacled Turkey and Hulking Mutant
Added new WR: Christmas Campaign
Added snull preference to snull the snulls in the snull
Added ignore visited raids preference
Added ignore invalid commands preference
Added additional filtering capability to string multiple filters together using ||, like colo|tele 1 || rage|void 4 would give normal tele, normal colossa and colonel, nightmare ragebeasts, nightmare void
Fixed bug loading WR data during update
Reworked how pastebin and autoload work by making them use the same code
With help from Sycdan, added /loadcconoly
Added some help to keep the spammer up to date with known raid data

2013.02.10 - 1.1.18
Fixed issue with /clearraids all not working
Improved help text of a few commands
Corrected and updated /farmvalue a bit
Added marked dead functionality for CConoly
Added os to filters [Sycdan]
Fixed WR Space Pox Icon
Kind of made the broken close icon for the menu suck less, though not totally fixed
Added Zone 16 raids: Screaming Barracuda and Symphony of Two Worlds
Added Zone 17 raids: Al-Husam
Added two Rare Spawns: Cerebral CEO and Space Pox Mary
WR Info page's forum link should now open in a new window/tab
Corrected hard health numbers on a bunch of raids from Z10 on

2013.02.14 - 1.1.19
Altered /lcc <filter> so it runs /loadall <filter> after fetching raids, rather than just filterting the list of newly-fetched raids [sycdan]
Added preference for delay between loading raids [sycdan]
Hid doomscript tabs that were previously labeled under construction.

2013.??.?? - 1.1.20
Fixed a bug that was causing raids to be marked as completed when they were actually being re-joined
Minor code cleanup
Added more timing data to find slow downs
Added aliases to /linktools: /advertise, /blatantselfpromotion, /getdoomscript
Added aliases to /reload: /reloaf, /reloa, /eload
Moved loadall to normal chat commands. It's a main feature now, not just an experimental hack. It will now appear in the right order in the help list
Added /refreshlinks command to cause the links to redraw themselves. This is mainly for when a link refuses to mark visited
All links will now be refreshed after /loadall and /clearraids [sycdan]
Fixed a bug in /clearraids all that was causing /seenraids to still show raids [sycdan]
*/

// Wrapper function for the whole thing. This gets extracted into the HTML of the page.
function main()
{
	// Properties for this script
	window.DC_LoaTS_Properties = {
		// Script info
		
    	version: "1.1.20",
    	
    	authorURL: "http://www.kongregate.com/accounts/doomcat",
    	updateURL: "http://www.kongregate.com/accounts/doomcat.chat",
    	scriptURL: "http://userscripts.org/124753",
    	scriptDownloadURL: "http://userscripts.org/scripts/source/124753.user.js",
    	raidDataURL: "http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Utilities/RaidData.js",
    	worldRaidDataURL: "http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Utilities/WorldRaidData.js",
    	docsURL: "http://www.tinyurl.com/doomscript-docs",
    	chatzyURL: "http://us5.chatzy.com/46964896557502",
    	
    	joinRaidURL: "http://web1.legacyofathousandsuns.com/kong/raidjoin.php",
    	kongLoaTSURL: "http://web1.legacyofathousandsuns.com/kong",
    	
    	// Other URLS
    	RaidToolsURL: "http://userscripts.org/132671",
    	QuickFriendURL: "http://userscripts.org/125666",
    	PlayNowFixURL: "http://userscripts.org/142619",
    	farmSpreadsheetURL: "https://docs.google.com/spreadsheet/ccc?key=0AoPyAHGDsRjhdGYzalZZdTBpYk1DS1M3TjVvYWRwcGc&hl=en_US#gid=4",
    	
    	// Do not check code in with this set to true. 
    	// Preferably, turn it on from the browser command line with DC_LoaTS_Properties.debugMode = true;
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
	    	quarantine: "_quarantine",
	    		
	    	// Timestamp of last query to cconoly
	    	cconolyLastQueryTime: "DC_LoaTS_cconolyLastQueryTime"
    	}
	};

	
	// Class declaring function for Opera compatibility
	function declareClasses()
	{
