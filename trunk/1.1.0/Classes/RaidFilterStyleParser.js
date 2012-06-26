		/************************************/
		/**** RaidFilterStyleParser Class ***/
		/************************************/
		
		// Class to parse raid link and style parameters
		window.RaidFilterStyleParser = Class.create({
			initialize: function(params)
			{
				// Split the params at the + that divides the filter from the style
				var parts = params.split("\+");
				console.log(parts)
				
				// Parse the first part as a raid filter
				if (parts.length >= 1)
				{
					this.raidFilter = new RaidFilter(parts[0].trim()); 
				}
				
				// The second part as the link style
				if (parts.length >= 2)
				{
					this.linkStyle = new RaidStyle(parts[1].trim());
				}
				
				// The third part as the message style
				if (parts.length >= 3)
				{
					this.messageStyle = new RaidStyle(parts[2].trim());
				}
				
				// The fourth part as the image style
				if (parts.length >= 4)
				{
					this.imageStyle = new RaidStyle(parts[3].trim());
				}
			},
			
			// Whether or not a link style exists for this parser
			hasLinkStyle: function()
			{
				return typeof this.linkStyle !== "undefined" && !this.linkStyle.isEmpty();
			},
			
			// Whether or not a message style exists for this parser
			hasMessageStyle: function()
			{
				return typeof this.messageStyle !== "undefined" && !this.messageStyle.isEmpty();
			},
			
			// Whether or not an image style exists for this parser
			hasImageStyle: function()
			{
				return typeof this.imageStyle !== "undefined" && !this.imageStyle.isEmpty();
			},
			
			// String describing this parser
			toString: function()
			{
				var ret;
				if (this.isValid())
				{
					ret = "Raids Matching <code>" + this.raidFilter.toString() + "</code> will have ";
					
					if (this.hasLinkStyle())
					{
						ret += "\nLink Style: <code>" + this.linkStyle.toString() + "</code>";
					}
					
					if (this.hasMessageStyle())
					{
						ret += "\nMessage Style: <code>" + this.messageStyle.toString() + "</code>";
					}
					
					if (this.hasImageStyle())
					{
						ret += "\nImage Style: <code>" + this.imageStyle.toString() + "</code>";
					}
				}
				else
				{
					ret = "Invalid Raid Filter Style Parser. Filter: " + (this.raidFilter?this.raidFilter.toString():"Not defined.");
				}
				
				return ret;
			},
			
			// Inject the styles from this parser into the page
			injectStyles: function()
			{
				// Create a class name for this set of styles
				this.className = "DCLH-RFSP-" + RaidFilterStyleParser._lastInjectedStyleId++;
				var rulesText = "";
				
				if (this.hasMessageStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + "{" + this.messageStyle.toString() + "}";
				}
				
				if (this.hasLinkStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + " a {" + this.linkStyle.toString() + "}";
				}
				
				if (this.hasImageStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + " img {" + this.imageStyle.toString() + "}";
				}
				
				
				// Locate/Create nodes
				var head = document.getElementsByTagName('head')[0],
				    style = document.createElement('style'),
				    rules = document.createTextNode(rulesText);
				
				// Style tag type
				style.type = 'text/css';
				
				// Browser dependencies
				if(style.styleSheet)
				{
				    style.styleSheet.cssText = rules.nodeValue;
				}
				else
				{
					style.appendChild(rules);
				}
				
				// Drop in the style node
				head.appendChild(style);
			},
			
			// Check validity of the parser
			isValid: function()
			{
				return typeof this.raidFilter !== "undefined" && this.raidFilter.isValid();
			}
		});
		
		RaidFilterStyleParser._lastInjectedStyleId = 0;

