		RaidCommand.create( 
			{
				commandName: "forum",
				urlPattern: "http://www.legacyofathousandsuns.com/forum/search.php?do=process&sortby=rank&query=%searchString%",
				// No parsing
				/*parsingClass: ,*/
				aliases: ["forums"],
				
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
							text: "Search Forum for: " + this.processedText,
							linkParams: {href: this.createURL(this.processedText), target: "_blank"},
							doNotCallHandler: true,
							followLink: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/forum searchText</code>\n";
					helpText += "where <code>searchText</code> is what you want to search for on the LoTS Forum\n";
					
					return helpText;
				},
				
				createURL: function(searchInput)
				{
					searchInput = searchInput || " ";
					return this.urlPattern.replace("%searchString%",searchInput);
				}
			}
		);