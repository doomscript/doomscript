		RaidCommand.create( 
			{
				commandName: "raid",
				aliases: ["raids", "radi", "radu", "raud", "radus", "rauds", "radis"],
				parsingClass: RaidFilter,
				
				// Doesn't use all the filter params
				paramText: "[raidName] [raidDifficulty]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					if (typeof parser == "undefined")
					{
						console.error("WTF?");
						return;
					}
					
					// If this was a valid filter
					if (parser.isValid())
					{
						// Find the matching raid types
						var matchedTypes = DC_LoaTS_Helper.getRaidTypes(parser);
						
						// If we matched some raid types
						if (matchedTypes.length > 0)
						{
							for (var i = 0; i < matchedTypes.length; i++)
							{
								// Grab this raid
								var raid = matchedTypes[i];
								
								// Have the raid bot tell them 
								deck.activeDialogue().raidBotMessage(raid.getVerboseText(parser.difficulty));
							}
							
							ret.success = true;
						}
						// If we didn't match a single raid
						else
						{
							ret.success = true;
							ret.statusMessage = "Could not locate any raids matching <code>" + parser.name + "</code>";
						}
						
					}
					else
					{
						ret.success = false;
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Raid Info for: " + this.parser.name,
							executable: false,
						},
						all: {
							text: "All",
							callback: function()
							{
								DCDebug("Info All " + this.parser.name);
								delete this.parser.difficulty;
							},
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Info Normal " + this.parser.name);
								this.parser.difficulty = 1;
							},
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Info Hard " + this.parser.name);
								this.parser.difficulty = 2;
							},
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Info Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							},
						},
						
						nightmare: {
							text: "Nightmare",
							callback: function()
							{
								DCDebug("Info Nightmare " + this.parser.name);
								this.parser.difficulty = 4;
							}
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raid raidName difficulty</code>\n";
					helpText += "where <code>raidName</code> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					
					return helpText;
				}
			}
		);
		
