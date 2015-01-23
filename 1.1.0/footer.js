	}// End declareClasses function
	
	// Define some CSS Styles
	function defineStyles()
	{
        console.info("Defining doomscript styles");

        var rulesText = [
        "abbr, acronym, span.abbr {",
        "\tborder-bottom: 1px dashed #444444;",
        "}",

        "\n.smallText {",
        "\tfont-size: 85%;",
        "}",


        "\na.DC_LoaTS_updateLink {",
        "\tbackground: #BAE37F url(http://userscripts.org/images/sprite.png?2) right -130px no-repeat;",
        "\tborder: 1px solid #888; padding: 2px 16px;",
        "\ttext-decoration: none;",
        "\tfont-weight: bold;",
        "\tfont-size: 1.5em;",
        "\ttext-align: center;",
        "\tcolor: #004 !important;",
        "\t-moz-border-radius: 5px;",
        "\t-webkit-border-radius: 5px;",
        "}",

        "\na.DC_LoaTS_updateLink:hover {",
        "\tcolor: #08F !important;",
        "\tbackground: url(http://userscripts.org/images/sprite.png?2) right 0px no-repeat;",
        "}",


        "\nimg.raidIcon {",
        "\tbackground: url(http://userscripts.org/images/sprite.png?2) right 0px no-repeat;",
        "}",

        "\n.context-menu {",
        "\tbackground-color: #433F3E;",
        "\tcolor: #FFFFFF;",
        "\tmin-width: 180px;",
        "\tlist-style-type: none;",
        "\tborder: 1px solid #000;",
        "}",

        "\n.menu-item {",
        "\tcursor: pointer;",
        "}",

        "\n.menu-item a {",
        "\tdisplay: block;",
        "\ttext-decoration: none;",
        "\tpadding: 5px 5px 5px 20px;",
        "}",

        "\n.menu-item a:hover {",
        "\tbackground-color: #710000;",
        "\tcolor: #FFFFFF;",
        "}",


        // -- Raid Menu Styles -- \\

        "\n#DC_LoaTS_raidMenu {",
//				"\theight: 60%;",
        "\twidth: 775px;",
//				"\tbackground: #062834;",
//				"\tbackground: #0E5969 url(http://old.jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;",
        "\tposition: fixed;",
        "\tleft: 7%;",
        "\ttop: 20%;",
        "\tz-index: 99999999;",
        "\t-webkit-border-radius: 5px;",
//				"\tborder:  2px solid #93CDD0;",
        "}",

        "\n#DC_LoaTS_raidMenuClose {",
        "\tfloat: right;",
        "\tdisplay: block;",
        "\twidth: 50px;",
        "\theight: 45px;",
        "\tcursor: pointer;",
        "}",


        "\n#DC_LoaTS_raidMenuTitleBar {",
        "\tbackground: #347D87 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/menutitlebarbg.png) 50% 50% repeat-x;",
        //"\tbackground: #347D87 url(http://old.jqueryui.com/themeroller/images/?new=347d87&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;",
        "\tpadding:  2px 10px;",
        "\tborder-top-left-radius: 5px;",
//				"\tborder-top-right-radius: 5px;",
        "\tborder-right-width: 0px;",
        "\twidth: 702px;",
        "\theight: 37px;",
        "\tcursor: move;",
        "\tfont-size: 15pt;",
        "\tcolor: #DEECED;",
        "\tborder: 3px solid #93CDD0;",
        "\tborder-bottom: 1px solid #062834;",
        "\tborder-right-width: 0px;",
        "\tfloat: left;",
        "}",

        "\n#DC_LoaTS_raidMenuTitleBarLeft {",
        "\tfloat: left;",
        "}",

        "\n#DC_LoaTS_raidMenuTitleBarCenter {",
        "\tfloat: left;",
        "\tmargin: auto;",
        "\twidth: 400px;",
        "\ttext-align: center;",
        "}",

        "\n#DC_LoaTS_raidMenuTitleBarRight {",
        "\tfloat: right;",
        "}",

        "\n#DC_LoaTS_raidMenuBodyWrapper {",
        "\tbackground: #0E5969 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/menubodywrapperbg.png) 50% 50% repeat;",
        //"\tbackground: #0E5969 url(http://old.jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;",
        "\tborder: 3px solid #93CDD0;",
        "\tborder-top-width: 0px;",
        "\tborder-bottom-left-radius: 5px;",
        "\tborder-bottom-right-radius: 5px;",
        "}",


        "\n#DC_LoaTS_raidMenuTabs {",
        "\tclear: both;",
        "\tborder-bottom: 1px solid #CCC;",
        "\theight: 23px;",
        "}",

        "\n#DC_LoaTS_raidMenuTabs li {",
        "\tlist-style: none;",
        "\tfont-family: Verdana, sans;",
        "\tfont-size: 11px;",
        "\tline-height: 18px;",
        "\tfloat: left;",
        "\tmargin-right: 5px;",
        "\ttext-align: center;",
        "}",

        "\n#DC_LoaTS_raidMenuTabs li a {",
        "\tdisplay: block;",
        "\theight: 20px;",
        "\tpadding: 0px 6px;",
        "\twidth: 80px;",
        "\tbackground-color: #153041;",
        "\tborder: 2px solid #41B0B5;",
        "\ttext-decoration: none;",
        "\tborder-top-left-radius: 5px;",
        "\tborder-top-right-radius: 5px;",
        "\tfont-size: 115%;",
        "\tcolor: #FFFFFF;",
        "}",

        "\n#DC_LoaTS_raidMenuTabs li a.active {",
        "\tbackground-color: #57959E;",
        "\tborder: 2px solid #F1FFFF;",
        "\tcolor: #B7E5EE;",
        "}",

        "\n.RaidMenuTab-Header {",
        "}",

        "\n.DC_LoaTS_raidMenuOptionWrapper {",
        "\tborder-bottom: 1px solid #479090;",
        "\tmargin-bottom: 5px;",
        "}",

        "\n.DC_LoaTS_raidMenuOptionWrapper div{",
        "\tpadding: 5px;",
        "\tfloat: left;",
        "}",

        "\n.DC_LoaTS_raidMenuDescription{",
        "\tpadding-left: 15px;",
        "}",

        "\n.DC_LoaTS_raidMenuPane {",
        //"\tbackground: #77C0C0 url(http://old.jqueryui.com/themeroller/images/?new=77c0c0&w=1&h=100&f=png&q=100&fltr[]=over|textures/06_inset_hard.png|0|0|50) 50% bottom repeat-x;",
        "\tbackground: #77C0C0 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/menupanebg.png) 50% bottom repeat-x;",
        "\tfont-size: 1.2em;",
        "\tpadding: 5px 10px;",
        "\tmin-height: 200px;",
        "\tmax-height: 600px;",
        "\toverflow: auto;",
        "\tclear: both;",
        "}",

        "\n.DC_LoaTS_raidMenuPane h1{",
        "\tborder-bottom: 1px solid #000000;",
        "\tmargin-bottom: 15px;",
        "}",

        "\n.DC_LoaTS_raidMenuPane h2{",
        "\tborder-bottom: 1px solid #479090;",
        "\tmargin-bottom: 10px;",
        "}",



        "\n#RaidsMenu-SearchWrapper {",
        "\twidth: 50%;",
        "\tmargin: auto;",
        "\t;",
        "}",

        "\n#RaidsMenu-SearchBox {",
        "\twidth: 70%;",
        "\tmin-width: 150px;",
        "}",

        "\n#RaidsMenu-ResultsBox {",
        "\tmax-height: 300px;",
        "\toverflow: auto;",
        "}",

        "\n#FormattingTab-MessageFormatTextArea {",
        "\twidth: 100%;",
        "\tmin-height: 35px;",
        "}",


        "\n.FormattingTab-Button {",
        "\tpadding: 3px 15px 4px;",
        "}",

        "\n.StylesTab-RaidNamesPicker {",
        "\tfloat:left;",
        "}",


        "\n#PreferencesMenu-LoadRaidsInBackgroundDelayInputWrapper input {",
        "\twidth: 30px;",
        "\theight: 10px;",
        "\tborder-radius: 5px;",
        "\ttext-align: center;",
        "}",

        "\n#CharacterViewMenu-PlatformSelect {",
        "\tcursor: pointer;",
        "\tborder-radius: 4px;",
        "\tfont-size: 14px;",
        "\tmargin-bottom: 10px;",
        "\tpadding: 4px 6px;",
        "\theight: 30px;",
        "\twidth: 220px;",
        "\toutline-offset: -2px;",
        "\toutline: 5px auto -webkit-focus-ring-color;",
        "}",

        "\n#CharacterViewMenu-UsernameBox {",
        "\twidth: 206px;",
        "\tline-height: 20px;",
        "\tfont-size: 14px;",
        "}",

        "\n.CharacterViewMenu-Button {",
        "\tpadding: 3px 15px 4px;",
        "}",


        "\n#DC_LoaTS_notificationBar {",
        "\tbackground: #f8dc5a url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/notificationbg.png) 50% 50% repeat-x;",
        //"\tbackground: #f8dc5a url(http://old.jqueryui.com/themeroller/images/?new=f8dc5a&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;",
        "\tpadding: 4px 10px; 0px",
        "\twidth: 100%;",
        "\tfont-size: 12pt;",
        "\tcolor: #915608;",
        "\tborder-bottom: 1px solid #fcd113;",
        "\tposition: fixed;",
        "\ttop: 0px;",
        "\tleft: 0px;",
        "\tz-index: 99999999;",
        "}",

        "\n#DC_LoaTS_notificationBarTitle {",
        "\tfloat: left;",
        "}",

        "\n#DC_LoaTS_notificationBarText {",
        "\tfloat: left;",
        "}",

        "\n#DC_LoaTS_notificationBarButtons {",
        "\tfloat: right;",
        "\tpadding-top:1px;",
        "}",

        "\n#DC_LoaTS_notificationBarButtons a.DC_LoaTS_updateLink {",
        "\tfont-size: inherit;",
        "\tmargin-right:10px;",
        "}",

        "\na.DC_LoaTS_notificationBarButton {",
        "\tbackground-color: #F9B83E;",
        "\tborder: 1px solid #915608;",
        "\tpadding: 2px 10px;",
        "\tmargin-right: 10px;",
        "\ttext-decoration: none;",
        "\tfont-weight: bold;",
        "\ttext-align: center;",
        "\t-moz-border-radius: 5px;",
        "\t-webkit-border-radius: 5px;",
        "\tborder-radius: 5px;",
        "}",

        "\na.DC_LoaTS_notificationBarButton:hover {",
        "\tcolor: #915608;",
        "\tbackground: #FDE477;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer {",
        "\tcolor: #FFFFFF;",
        "\tlist-style: none;",
        "\tbackground: #113552 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/hexbg.png) 50% 50% repeat;",
        "\t-moz-border-radius: 5px;",
        "\t-webkit-border-radius: 5px;",
        "\tborder-radius: 5px;",
        "\theight: 16px;",
        "\tpadding: 2px 5px;",
        "\ttext-align:left;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li {",
        "float:left;",
        "}",


        "\na.DC_LoaTS_button {",
        "\twidth: 16px;",
        "\theight: 16px;",
        "\tbackground: url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/icons.png);",
        "\tbackground-repeat: no-repeat;",
        "\tcursor: pointer;",
        "\tdisplay: block;",
        "\tfloat: left;",
        "\ttext-indent: -99999px;",
        "}",

        "\na.DC_LoaTS_menuButton {",
        "\tbackground-position: -48px -80px;",
        "}",

        "\na.DC_LoaTS_reloadButton {",
        "\tbackground-position: -160px -64px;",
        "}",

        "\na.DC_LoaTS_toggleGameButton {",
        "\tbackground-position: 0 -176px;",
        "}",

        "\na.DC_LoaTS_toggleWorldChatButton {",
        "\tbackground-position: -128px -96px;",
        "}",

        "\na.DC_LoaTS_WRButton {",
        "\ttext-indent: 0px;",
        "\tbackground: none;",
        "\twidth: auto;",
        "\tborder-radius: 5px;",
        "}",

        "\na.DC_LoaTS_WRButton:hover {",
        "\ttext-decoration: none;",
        "\tbackground-color: #71A5CE;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li.DC_LoaTS_WRButtonWrapper {",
        "\tfloat: right;",
        "}",


        "\n.DC_LoaTS_omnibox {",
        "\t-moz-border-radius: 5px;",
        "\t-webkit-border-radius: 5px;",
        "\tborder-radius: 5px;",
        "\tborder-color: #FFFFFF;",
        "\tbackground-color: #71A5CE;",
        "\tpadding: 0px 2px !important;",
        "}",

        "\n.DC_LoaTS_omnibox_focus {",
        "\tborder-color: #71A5CE;",
        "\tbackground-color: #FFFFFF;",
        "}",

        "\n.DC_LoaTS_omniboxWrapper {",
        "\t-moz-border-radius: 5px;",
        "\t-webkit-border-radius: 5px;",
        "\tborder-radius: 5px;",
        "\tposition: relative;",
        "\tfloat: left;",
        "}",

        "\n.DC_LoaTS_omniboxCommandsWrapper {",
        "\tbackground: #113552 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/hexbg.png) 50% 50% repeat;",
        "\tlist-style: none;",
        "\tz-index: 999;",
        "\tposition: absolute;",
        "\twidth: 630px;",
        "\tpadding: 5px;;",
        "\tborder-bottom-left-radius: 5px;",
        "\tborder-bottom-right-radius: 5px;",
        "\t;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li li{",
        "\tfloat:none;",
        "\tmargin: 0px;",
        "\tbackground-color: #051E2A;",
        "\tfont-size: 1.3em;",
        "\toverflow: hidden;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li li a{",
        "\tdisplay: block;",
        "\tcolor: #EEEEEE;",
        "\ttext-decoration: none;",
        "\tfloat:left;",
        "\t-moz-border-radius: 5px;",
        "\t-webkit-border-radius: 5px;",
        "\tborder-radius: 5px;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li li a:hover{",
        "\tbackground-color: #57959E;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li li:first-child{",
        "\tborder-top-left-radius: 5px;",
        "\tborder-top-right-radius: 5px;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li li:last-child{",
        "\tborder-bottom-left-radius: 5px;",
        "\tborder-bottom-right-radius: 5px;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer li li a:first-child, #DC_LoaTS_raidToolbarContainer li li div:first-child{",
        "\tpadding-left: 10px !important;",
        "}",

        //--- Onnibox Option Styles ---\\

        "\n.DC_LoaTS_initialtext {",
        "\tfloat: left;",
        "\tpadding-left: 0px !important;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_omniboxOption {",
        "\tpadding: 2px 10px;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_any {",
        "\t;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_normal {",
        "\tcolor:#48C957;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_normal:hover {",
        "\tcolor:#FFFFFF;",
        "\tbackground-color:#48C957;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_hard {",
        "\tcolor:#E3E72E;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_hard:hover {",
        "\tcolor:#FFFFFF;",
        "\tbackground-color:#E3E72E;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_legendary {",
        "\tcolor:#CB0039;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_legendary:hover {",
        "\tcolor:#FFFFFF;",
        "\tbackground-color:#CB0039;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_nightmare {",
        "\tcolor:#B84EFE;",
        "}",

        "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_nightmare:hover {",
        "\tcolor:#FFFFFF;",
        "\tbackground-color:#B84EFE;",
        "}",


        "\na.raidLink {",
        "\ttextDecoration: none;",
        "}",

        "\na.raidDiffNormal:hover {",
        "\tcolor:#48C957;",
        "}",

        "\na.raidDiffHard:hover {",
        "\tcolor:#828505;",
        "}",

        "\na.raidDiffLegendary:hover {",
        "\tcolor:#CB0039;",
        "}",

        "\na.raidDiffNightmare:hover {",
        "\tcolor:#B84EFE;",
        "}",

        "\n.hidden {",
        "\tdisplay: none;",
        "}",


        "\n.DataDumpTab-Data {",
        "\twidth: 100%;",
        "\theight: 400px;",
        "}",

        "\n.DC_LoaTS_raidMenuCloseTabA {",
        "\tborder-radius: 100px;",
        "\twidth: 5px;",
        "\theight: 5px;",
        "\tcolor: #FFFFFF;",
        "\tbackground-color: #CCCCCC;",
        "}",

        "\n#maingame {",
        "\t-moz-transition: width .5s ease-out 0s;",
        "\t-webkit-transition: width .5s ease-out 0s;",
        "\t-o-transition: width .5s ease-out 0s;",
        "}",

        "\n#maingame.hideWorldChat {",
        "\twidth: 1060px !important;",
        "}",

        "\n#game {",
        "\toverflow: hidden;",
        "\t-moz-transition: width .5s ease-out 0s;",
        "\t-webkit-transition: width .5s ease-out 0s;",
        "\t-o-transition: width .5s ease-out 0s;",
        "}",

        "\n.hideWorldChat #game {",
        "\twidth: 759px !important;",
        "}",

        "\n#gameholder {",
        "\twidth: auto !important;",
        "}"
        ];

        var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            rules = document.createTextNode(rulesText.join("\n"));

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
		    // These are probably obsolete now
			if(window.opera)
			{
				if(window.localStorage)
				{
					console.log("Creating Opera local storage fallbacks for GM functions");
					window.GM_setValue = function(k, v)
					{
						localStorage.setItem(k, v);
					};
					window.GM_getValue = function(k, def)
					{
						var ret = localStorage.getItem(k);
						return (ret == null?def:ret)
					};
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
				};
				window.GM_getValue = function(k, def)
				{
					var ret = localStorage.getItem(k);
					return (ret == null?def:ret)
				};
				window.GM_deleteValue = function(k)
				{
					localStorage.removeItem(k);
				}
			}
		}
		
		if (typeof GM_xmlhttpRequest !== "function") {
		    console.warn("doomscript will not run properly (or maybe even at all) in your browser without Greasemonkey Emulation: http://userscripts-mirror.org/scripts/show/105153");
		}
	}
	
	function doCriticalHooks()
	{
		// Have the raid bot post a message to the user
		ChatDialogue.prototype.raidBotMessage = function(message)
		{
			try 
			{
				holodeck.activeDialogue().displayUnsanitizedMessage("RaidBot",
														 	message.replace(/\n/g, "<br />\n"),
														 	{"class": "whisper received_whisper"},
															{non_user: true} 
														   );
			}
			catch (ex) 
			{
				console.warn("Unexpected exception during raidBotMessage", ex);
			}
		};

        function hookInputDialogue() {
            if (holodeck && holodeck.activeDialogue()) {
                // Hook the handler
                DC_LoaTS_Helper.registerEventHandler(holodeck.activeDialogue()._input_node, "keyup", function(e) {
                    e = e || window.event;
                    // TODO: Eventually, maybe handle up and down arrow for recent messages
                    if (e.keyCode === 38) {
//                        console.log("Pressed up");
                    }
                    if (e.keyCode === 40) {
//                        console.log("Pressed down");
                    }
                });
            }
            else {
                // Not ready, wait an try later
                setTimeout(hookInputDialogue, 1000);
            }
        }

        hookInputDialogue();
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
	        if (typeof holodeck === "undefined" || typeof ChatDialogue === "undefined" || typeof Class === "undefined" || !$("chat_window"))
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
			
			// Update raid data
			DC_LoaTS_Helper.updateRaidData();
        }
    	
    	// Everything is done
        console.info("DC LoaTS Link Helper started!");
    }
    
    // Hit the go button and activate the main script.
    bootstrap_DC_LoaTS_Helper(false);
}


// GM Layer
// This is handling XHR via events
function xhrGo(event)
{
    if (typeof XPCNativeWrapper !== "undefined" && typeof XPCNativeWrapper.unwrap === "function")
    {   //this takes 'event' out of the heavy duty sandbox so we can access the details for FF32+
        //INFO: tested and confirmed as working on FF31 and FF32 + GM 2.1
        DCDebug("GM XHR: Firefox sandbox, unwrapping 'event' for processing");

        event = XPCNativeWrapper.unwrap(event);
    }

    DCDebug("GM XHR: GM Received XHR Event: ", event);
	var params = event.detail;

	for (var param in params)
	{
		if (typeof params[param] === "string" && param.toLowerCase().indexOf("__callback_") === 0)
		{
			var funcName = param.substring("__callback_".length);
			params[funcName] = gmCallBack.bind(this, params.UUID, funcName);
		}
	}
    DCDebug("GM XHR: final params ", params);
    if (typeof GM_xmlhttpRequest === "function") {
        DCDebug("GM XHR: GM_XHR is available");
	    setTimeout(function(){GM_xmlhttpRequest(params);},0);
    }
    else {
        DCDebug("GM XHR: GM_XHR is not available");
        console.error("Browser is not configured to allow GM_xmlhttpRequest. This could be due to a Chrome v27 bug.");
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState === 4)
            {
                DCDebug("GM XHR: XHR ready state changed. Has onload? ", !!params.onload);
                if (typeof params.onload === "function") {
                    params.onload(xmlhttp);
                }
            }
        };
        xmlhttp.open(params.method, params.url, !params.synchronous);
        xmlhttp.send();
    }
}

function gmCallBack(UUID, funcName, response)
{
    DCDebug("GM XHR: Preparing to call back to page JS");
	setTimeout(function()
	{
        DCDebug("GM XHR: Creating event to send back to the page  UUID: ", UUID, " funcName: ", funcName, " response: ", response);
        var detail = {callbackName: funcName, responseObj: response};
        DCDebug("GM XHR: Creating event detail: ", detail);
        try {
            if (typeof cloneInto === "function") {
                DCDebug("GM XHR: Using cloneInto");

                var cloned = {callbackName: funcName, responseObj: {}};
                for (var p in detail.responseObj) {
                    if (detail.responseObj.hasOwnProperty(p)) {
                        DCDebug("GM XHR: Cloning property ", p, " which is a ", typeof detail.responseObj[p]);
                        cloned.responseObj[p] = detail.responseObj[p];
                    }
                }

                DCDebug("GM XHR: Using cloneInto for real");
                cloned = cloneInto(cloned, document.defaultView || unsafeWindow || window);
                DCDebug("GM XHR: cloned version: ", cloned);

                // It seems like the latest Firefox prefers this deprecated code? Bizarre
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(UUID, true, true, cloned);
                document.documentElement.dispatchEvent(evt);
            }
            else {
                DCDebug("GM XHR: Not using cloneInto (it doesn't exist or isn't a function)");
                var evt = new CustomEvent(UUID, {"bubbles": true, "cancelable": true, "detail": detail});
                DCDebug("GM XHR: Dispatching event to page", evt);
                document.dispatchEvent(evt);
            }
        }
        catch (ex) {
            DCDebug("GM XHR: Caught exception while trying to respond to client XHR event", ex, " Fn Args: ", arguments);
        }
	}, 0);
}

document.addEventListener("DC_LoaTS_ExecuteGMXHR", xhrGo);


var GMDebugMode = (function() {
    var value = /debugMode=(\w+)/.exec(document.location.href);
    return value && !!value[1];
})();

// Debug log wrapping function
// Special scope debugging for just this script
DCDebug = function() {
    if (GMDebugMode === true) {
        console.log.apply(console, arguments);
    }
};



    // This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
if (/https?:\/\/www\.kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns.*/i.test(window.location.href))
{
    var ugupCSS = document.createElement('link');
    ugupCSS.type = "text/css";
    ugupCSS.href = "https://rawgit.com/doomcat/OpenUgUp/master/js/src/ugup.css";
    ugupCSS.rel = "stylesheet";
    (document.head || document.body || document.documentElement).appendChild(ugupCSS);

    var ugupEquips = document.createElement('script');
    ugupEquips.type = "text/javascript";
    ugupEquips.src = "https://rawgit.com/doomcat/OpenUgUp/master/js/src/ugup.equipment.js";
    (document.body || document.head || document.documentElement).appendChild(ugupEquips);

    var ugupScript = document.createElement('script');
    ugupScript.type = "text/javascript";
    ugupScript.src = "https://rawgit.com/doomcat/OpenUgUp/master/js/src/ugup.js";
    (document.body || document.head || document.documentElement).appendChild(ugupScript);

	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);

}