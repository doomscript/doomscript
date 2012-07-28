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
		
