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
//				rulesText += "\tbackground: #0E5969 url(http://old.jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
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
				rulesText += "\tbackground: #347D87 url(http://old.jqueryui.com/themeroller/images/?new=347d87&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;\n";
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
				rulesText += "\tbackground: #0E5969 url(http://old.jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
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
				rulesText += "\tbackground: #77C0C0 url(http://old.jqueryui.com/themeroller/images/?new=77c0c0&w=1&h=100&f=png&q=100&fltr[]=over|textures/06_inset_hard.png|0|0|50) 50% bottom repeat-x;\n";
				rulesText += "\tfont-size: 1.2em;\n";
				rulesText += "\tpadding: 5px 10px;\n";
				rulesText += "\tmin-height: 200px;\n";
				rulesText += "\tmax-height: 600px;\n";
				rulesText += "\toverflow: auto;\n";
				rulesText += "\tclear: both;\n";
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
				rulesText += "\tbackground: #f8dc5a url(http://old.jqueryui.com/themeroller/images/?new=f8dc5a&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;\n";
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
				rulesText += "\tbackground: #113552 url(http://old.jqueryui.com/themeroller/images/?new=113552&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
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
				rulesText += "\tbackground: url(http://old.jqueryui.com/themeroller/images/?new=e0fdff&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png);\n";
				rulesText += "\tbackground-repeat: no-repeat;\n";
				rulesText += "\tcursor: pointer;\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\ttext-indent: -99999px;\n";
				rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_menuButton {\n";
				rulesText += "\tbackground-position: -48px -80px;";
				rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_reloadButton {\n";
				rulesText += "\tbackground-position: -160px -64px;";
				rulesText += "}\n";
				
				rulesText += "\na.DC_LoaTS_WRButton {\n";
				rulesText += "\ttext-indent: 0px;\n";
				rulesText += "\tbackground: none;\n";
				rulesText += "\twidth: auto;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\na.DC_LoaTS_WRButton:hover {\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tbackground-color: #71A5CE;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li.DC_LoaTS_WRButtonWrapper {\n";
				rulesText += "\tfloat: right;\n";
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
				rulesText += "\tbackground: #113552 url(http://old.jqueryui.com/themeroller/images/?new=113552&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
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
				

				rulesText += "\na.raidDiffNormal:hover {\n";
				rulesText += "\tcolor:#48C957;\n";
				rulesText += "}\n";
				
				rulesText += "\na.raidDiffHard:hover {\n";
				rulesText += "\tcolor:#828505;\n";
				rulesText += "}\n";

				rulesText += "\na.raidDiffLegendary:hover {\n";
				rulesText += "\tcolor:#CB0039;\n";
				rulesText += "}\n";
				
				rulesText += "\na.raidDiffNightmare:hover {\n";
				rulesText += "\tcolor:#B84EFE;\n";
				rulesText += "}\n";
				
				
				rulesText += "\n.DataDumpTab-Data {\n";
				rulesText += "\twidth: 100%;\n";
				rulesText += "\theight: 400px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuCloseTabA {\n";
				rulesText += "\tborder-radius: 100px;\n";
				rulesText += "\twidth: 5px;\n";
				rulesText += "\theight: 5px;\n";
				rulesText += "\tcolor: #FFFFFF;\n";
				rulesText += "\tbackground-color: #CCCCCC;\n";
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
			try 
			{
				holodeck.activeDialogue().displayUnsanitizedMessage("RaidBot",
														 	message.replace(/\n/g, "<br />\n"),
														 	{class: "whisper received_whisper"},
															{non_user: true} 
														   );
			}
			catch (ex) 
			{
				console.warn("Unexpected exception during raidBotMessage", ex);
			}
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
			
			// Update raid data
			DC_LoaTS_Helper.updateRaidData();
    	}
    	
    	// Everything is done
        console.info("DC LoaTS Link Helper started!");
    }
    
    // Hit the go button and activate the main script.
    bootstrap_DC_LoaTS_Helper();
}


// GM Layer
function xhrGo(event)
{
	var params = event.data;
	for (var param in params)
	{
		if (typeof params[param] === "string" && param.toLowerCase().indexOf("__callback_") === 0)
		{
			var funcName = param.substring("__callback_".length);
			params[funcName] = gmCallBack.bind(this, params.UUID, funcName);
		}
	}
	setTimeout(function(){GM_xmlhttpRequest(params);},0);
};

function gmCallBack(UUID, funcName, response)
{
	setTimeout(function()
	{
		var origin = window.location.protocol + "//" + window.location.host;
		var evt = document.createEvent("MessageEvent");
		evt.initMessageEvent(UUID, true, true, {callbackName: funcName, responseObj: response}, origin, 1, window, null);
		document.dispatchEvent(evt);
	}, 0);
};

document.addEventListener("DC_LoaTS_ExecuteGMXHR", xhrGo);



// This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
if (/https?:\/\/www\.kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns.*/i.test(window.location.href))
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}