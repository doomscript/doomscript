		RaidCommand.create( 
			{
				commandName: "markall",
				aliases: ["bulkcachestate"],

				paramText: "filter state",
				
				
				/*public Object*/ handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					params = params.trim();
					
					var space = params.lastIndexOf(" ");
					
					var filter = params.substring(0, space);
					var state = params.substring(space+1);
					
					var count = RaidManager.markByFilter(filter, state);
					
					ret.statusMessage = "Marked " + count + " raid" + (count!=1?"s":"") + " matching \"<code>" + filter + "</code>\" as " + state;
					ret.success = true;
					
					if (count > 0) {
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				
				/*public Object*/ getOptions: function()
				{					
					var commandOptions = {					
						initialText: {
							text: "Mark all " + this.parser.filterText + " as " + this.parser.stateText
						}
					};
					

					return commandOptions;
				},
				
				/*protected String*/ buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/markall [filter] state</code>\n";
					helpText += "where <code>filter</code> (optional) is a seenraids style filter to limit what gets marked\n";
					helpText += "where <code>state</code> is a valid state to mark the raids to (unseen, seen, visited)\n";
					
					return helpText;
				}
			}
		);
		
