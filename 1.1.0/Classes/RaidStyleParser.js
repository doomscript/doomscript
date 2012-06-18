		/************************************/
		/********** RaidStyle Class *********/
		/************************************/
		
		// Class to parse raid style parameters into CSS stuff
		window.RaidStyleParser = Class.create({
			initialize: function(params)
			{
				// Variables
				this.filter;
				this.style;
				
				// Split the params at the + that divides the filter from the style
				var parts = params.split("\+");
				
				var raidFilter;
				var styleText;
				if (parts.length >= 1)
				{
					var filterText = params[0].trim();
					raidFilter = new RaidFilter(filterText); 
				}
				if (parts.length >= 2)
				{
					styleText = params[1].trim();
				}
				
				
			}
		});