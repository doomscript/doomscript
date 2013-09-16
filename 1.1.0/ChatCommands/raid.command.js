		RaidCommand.create( 
			{
				commandName: "raid",
				aliases: ["raids", "radi", "radu", "raud", "radus", "rauds", "radis", "rai", "fs", "os"],
				parsingClass: RaidFilter,
				
				// Doesn't use all the filter params
				paramText: "[raidName] [raidDifficulty]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true},
					    filter = parser;
				
					// If this was a valid filter
					if (filter.isValid())
					{
						// Find the matching raid types
						var matchedTypes = DC_LoaTS_Helper.getRaidTypes(filter);
						
						// If we matched some raid types
						if (matchedTypes.length > 0)
						{
							// Iterate over all the matched raid types
							for (var j = 0; j < matchedTypes.length; j++)
							{
								// Grab this raid
								var raid = matchedTypes[j];
								
								// Have the raid bot tell them 
								deck.activeDialogue().raidBotMessage(raid.getVerboseText(filter.difficulty));
							}
							
							ret.success = ret.success && true;
						}
						// If we didn't match a single raid
						else
						{
							ret.success = ret.success && true;
							ret.statusMessage = (i > 0?"\n":"") + "Could not locate any raids matching <code>" + filter.toString() + "</code>";
						}
						
					}
					
					return ret;
				},
				getOptions: function()
				{
				    console.log("Raid Info: ", this, this.parser);
				    
					var commandOptions = {					
						initialText: {
							text: "Raid Info for: " + this.parser.name,
							executable: false
						},
						all: {
							text: "All",
							callback: function()
							{
								DCDebug("Info All " + this.parser.name);
								delete this.parser.difficulty;
							}
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Info Normal " + this.parser.name);
								this.parser.difficulty = 1;
							}
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Info Hard " + this.parser.name);
								this.parser.difficulty = 2;
							}
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Info Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							}
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
					helpText += "\n";
					helpText += "<b>Example:</b>\n";
					helpText += "Raid data for NM Tulk: " + this.getCommandLink("tulk 4") + "\n";

					return helpText;
				}
			}
		);
		
