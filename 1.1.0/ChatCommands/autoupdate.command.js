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
							text: "Get autoupdate status",
						},
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
				},	
			}
		);
	
