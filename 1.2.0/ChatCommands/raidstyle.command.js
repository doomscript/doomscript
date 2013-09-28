		RaidCommand.create( 
			{
				commandName: "raidstyle",
				aliases: [],
				parsingClass: RaidFilterStyleParser,

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					console.log(parser);
					
					if (typeof parser.raidFilter === "undefined" || parser.raidFilter.isEmpty())
					{
						//TODO: Display all existing raid styles
						
						
					}
					else if (typeof parser.linkStyle === "undefined" && typeof parser.messageStyle === "undefined" && typeof parser.imageStyle === "undefined")
					{
						//TODO: Display all raid styles that have the same filter
					}
					else
					{
						// Find all the styles matching this filter
						var matchingStyles = DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()];
						if (typeof matchingStyles === "undefined")
						{
							matchingStyles = [];
							DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()] = matchingStyles;
						}
						
						// Have the parser create CSS styles for itself.
						parser.injectStyles();
						
						// Add this to the list of styles for this filter
						matchingStyles.push(parser);
						
						// Success report
						ret.success = true;
						ret.statusMessage = parser.toString();
						
						// Refresh the links to see the change
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Execute this raid style command"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidstyle filter +linkStyle +messageStyle +imageStyle</code>\n";
					helpText += "\n";
					
					return helpText;
				}
			}
		);
		
