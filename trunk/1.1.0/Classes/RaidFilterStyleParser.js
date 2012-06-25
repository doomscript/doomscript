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

				if (parts.length >= 1)
				{
					this.raidFilter = new RaidFilter(parts[0].trim()); 
				}
				
				if (parts.length >= 2)
				{
					this.linkStyle = new RaidStyle(parts[1].trim());
				}
				
				if (parts.length >= 3)
				{
					this.messageStyle = new RaidStyle(parts[2].trim());
				}
				
				if (parts.length >= 4)
				{
					this.imageStyle = new RaidStyle(parts[3].trim());
				}
			},
			
			hasLinkStyle: function()
			{
				return typeof this.linkStyle !== "undefined" && !this.linkStyle.isEmpty();
			},
			
			hasMessageStyle: function()
			{
				return typeof this.messageStyle !== "undefined" && !this.messageStyle.isEmpty();
			},
			
			hasImageStyle: function()
			{
				return typeof this.imageStyle !== "undefined" && !this.imageStyle.isEmpty();
			},
			
			toString: function()
			{
				var ret;
				if (this.isValid())
				{
					ret = "Raids Matching <code>" + this.raidFilter.toString() + "</code> will have ";
					
					if (parser.hasLinkStyle())
					{
						ret += "\nLink Style: <code>" + parser.linkStyle.toString() + "</code>";
					}
					
					if (parser.hasMessageStyle())
					{
						ret += "\nMessage Style: <code>" + parser.messageStyle.toString() + "</code>";
					}
					
					if (parser.hasImageStyle())
					{
						ret += "\nImage Style: <code>" + parser.imageStyle.toString() + "</code>";
					}
				}
				else
				{
					ret = "Invalid Raid Filter Style Parser. Filter: " + (this.raidFilter?this.raidFilter.toString():"Not defined.");
				}
				
				return ret;
			},
			
			isValid: function()
			{
				return typeof this.raidFilter !== "undefined" && this.raidFilter.isValid();
			}
		});