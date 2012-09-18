
		RaidCommand.create( 
			{
				commandName: "raidbulkcallback",
				aliases: [],
				doNotEnumerateInHelp: true,
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// Break apart the guid and possible cancel message
					var paramsParts = params.split(" "),
					    guid = paramsParts[0],
					    bulkRaidObject = DC_LoaTS_Helper.bulkRaids[guid],
					    cancel = paramsParts[1];
					    
					DCDebug(paramsParts, guid, bulkRaidObject, cancel);
					
					// If this load was canceled
					if ( (typeof cancel !== "undefined" && cancel === "cancel") || bulkRaidObject.canceled)
					{
						// Keep track of the total run time so far
						if (typeof bulkRaidObject.runTime === "undefined")
						{
							bulkRaidObject.runTime = 0;
						}
						bulkRaidObject.runTime += (new Date()/1) - bulkRaidObject.startTime;
						bulkRaidObject.canceled = true;
						if (bulkRaidObject.timeout)
						{
							clearTimeout(bulkRaidObject.timeout);
							delete bulkRaidObject.timeout;
						}
						ret.success = true;
						ret.statusMessage = "Canceled bulk load from " + bulkRaidObject.loadSource;
					}
					else
					{
						if (typeof bulkRaidObject.iteration === "undefined")
						{
							bulkRaidObject.iteration = 0;
							bulkRaidObject.startTime = new Date()/1;
							holodeck.activeDialogue().raidBotMessage("Loading bulk raids from " + bulkRaidObject.loadSource + ". " + DC_LoaTS_Helper.getCommandLink("/raidbulkcallback " + guid + " cancel", "Cancel?"));
						}
						
						var raidIndexToLoad = bulkRaidObject.iteration++;
						var raidToLoad = bulkRaidObject.raids[raidIndexToLoad];
						if (raidIndexToLoad < bulkRaidObject.raids.length)
						{
							DC_LoaTS_Helper.loadRaid(raidToLoad);
							
							bulkRaidObject.iteration >= bulkRaidObject.raids.length
							
							bulkRaidObject.timeout = setTimeout("holodeck.processChatCommand(\"/raidbulkcallback " + guid + "\");", 2000);
						}
						else 
						{
							ret.statusMessage = "Completed bulk load from " + bulkRaidObject.loadSource + " in " + ((new Date()/1) - bulkRaidObject.startTime) + "ms.";
						}
						ret.success = true;
					}
					
					
					return ret;
				},
				
				getOptions: function()
				{
					return {};
				},
				
				buildHelpText: function()
				{
					return "";
				}
			}
		);
		
