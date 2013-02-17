//TODO: Remove Autoload alias. AutoLoad should be for incoming new raids, not loading existing ones
		RaidCommand.create(
			{
				commandName: "loadall",
				aliases: ["autoload"],
				parsingClass: RaidMultiFilter,

				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					var isCancelled = params === "cancel";
										
					// Cancel the previous timer, if there is one
					if (typeof DC_LoaTS_Helper.autoLoader !== "undefined" || isCancelled)
					{
						// Clear out the raidLinks array from the previous one.
						// The timeout will detect that there are suddenly no more links
						// and acknowledge the error state and quit.
						DC_LoaTS_Helper.autoLoader.raidLinks.length = 0;
					}
					
					
					// This only works with a valid filter
					if (!isCancelled && raidFilter && raidFilter.isValid())
					{
						// Fetch all the links
						var raidLinks = RaidManager.fetchByFilter(raidFilter);
						
						// If there were any matched links
						if (raidLinks.length > 0)
						{
							ret.success = true;
							ret.statusMessage = "AutoLoad starting for " + raidFilter.toString() + ". Loading " + raidLinks.length + " raids. " + this.getCommandLink("cancel", "Cancel");
							
							DC_LoaTS_Helper.loadAll(raidLinks);
						}
						else
						{
							ret.statusMessage = "AutoLoad could not find any raids matching " + raidFilter.toString() + " to load.";							
						}
						
						ret.success = true;
					}
					else if (!isCancelled)
					{
						ret.success = false;
						ret.statusMessage = "Could not execute autoload due to invalid raid filter: '" + raidFilter.toString() + "'.";
					}
					else 
					{
						ret.success = true;
						ret.statusMessage = "AutoLoad cancelled.";
					}
						
					return ret;
				},
				getOptions: function()
				{
					//TODO: Better options here
					var commandOptions = {					
						initialText: {
							text: "Load all raids matching the filter"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadall raidFilter</code>\n";
					helpText += "where <code>raidFilter</code> is a valid raid filter\n";
					helpText += "\n";
					helpText += "\nLoads all seen raids that match the given filter";
					helpText += "\n";
					helpText += "\nFor example, " + this.getCommandLink("colonel 4") + " would load all nightmare colonels not previously visited";
					helpText += "\n";
					helpText += "<b>This feature is implemented for experimental/academic purposes only and should not be distributed!</b>\n";
					
					return helpText;
				}
			}
		);
		
