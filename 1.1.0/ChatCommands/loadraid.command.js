		RaidCommand.create( 
			{
				commandName: "loadraid",
				aliases: ["addraid", "joinraid", "loadraids", "raidload", "raidadd", "raidjoin"],
				parsingClass: RaidLink,
				handler: function(deck, raidLink, params, text, context)
				{
					// Declare ret object
					var ret = {};
						
					// Load the raid from the link's url
					ret.success = !DC_LoaTS_Helper.loadRaid(raidLink.getURL());
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load raid: " + this.parser.getDifficultyText() + " " + this.parser.getName(),
							callback: function(){/*this.execute();*/},
						},
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadraid url</code>\n";
					helpText += "where <code>url</code> is the url of a raid\n";
					
					return helpText;
				}
			}
		);
		
