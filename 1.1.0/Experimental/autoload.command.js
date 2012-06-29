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
		