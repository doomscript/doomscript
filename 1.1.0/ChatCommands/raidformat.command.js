
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
					helpText += "<span class=\"abbr\" title=\"" + cache_state_nice_text + "\">state</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_nice_text + "\">status</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">cache-state-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">state-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">status-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + difficulty_text + "\">difficulty</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + diff_text + "\">diff</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fs</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fair</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fairshare</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid Health\">health</span>, ";
					helpText += "<span class=\"abbr\" title=\"Unique Raid ID Number\">id</span>, ";
					helpText += "<span class=\"abbr\" title=\"Kongregate LoaTS icon\">image</span>, ";
					helpText += "<span class=\"abbr\" title=\"Break to the next line\">line</span>, ";
					helpText += "<span class=\"abbr\" title=\"Official Raid Name\">name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Same as target\">os</span>, ";
					helpText += "<span class=\"abbr\" title=\"Same as target\">optimal</span>, ";
					helpText += "<span class=\"abbr\" title=\"Official Short Raid Name\">short-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"User defined short name\">shorter-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Shortest unique name of the raid\">shortest-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid Size = Max raid members\">size</span>, ";
					helpText += "<span class=\"abbr\" title=\"S, E, and/or H if the raid uses Stamina, Energy, and/or Honor\">stat</span>, ";
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
					helpText += "<b>SRLTSX Default:</b>\n";
					helpText += "<code>" + this.getCommandLink("{visited} {name} - {diff} - {fs}/{os}") + "</code>";
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
		
