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
				
				var filterText = params[0].trim();
				var styleText = params[1].trim();
				
				
			}
		});