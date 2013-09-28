		RaidCommand.create( 
			{
				commandName: "wiki",
				aliases: ["search", "lookup", "zoywiki"],
				urlPattern: "http://www.zoywiki.com/index.php?title=Special:Search&search=LotS/{0}&go=Go",
				// No parsing
				/*parsingClass: ,*/
				paramText: "query",

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
											
					var url = this.createURL(params);
					
					window.open(url, "_blank");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Search Zoywiki for: " + this.processedText,
							linkParams: {href: this.createURL(this.processedText), target: "_blank"},
							doNotCallHandler: true,
							followLink: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/wiki searchText</code>\n";
					helpText += "where <code>searchText</code> is what you want to search for on Zoywiki\n";
					
					return helpText;
				},
				
				createURL: function(searchInput)
				{
					searchInput = searchInput || "";
					return this.urlPattern.format(escape(searchInput.replace(" ", "+")));
				}
			}
		);
		
