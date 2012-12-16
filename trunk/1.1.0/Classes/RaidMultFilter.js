		/************************************/
		/********* RaidMultiFilter Class *********/
		/************************************/
		
		// This class represents a group of filters
		window.RaidMultiFilter = Class.create({
			
			// Constructor
			initialize: function(filterText)
			{
				Timer.start("RaidMultiFilter init");

				// Declare some vars for later
				this.valid = true;

				// Capture original filterText
				this.filterText = filterText;
				
				// Break out any bunch
				var filterTexts = this.filterText.split("||");
				
				// Prepare the filters
				this.filters = [];
				
				for (var i = 0; i < filterTexts.length; i++) {
					this.filters.push(new RaidFilter(filterTexts[i]));
				}

				Timer.stop("RaidMultiFilter init");
			},
			
			// Based on this filter, does a given property match the filter
			matches: function(params)
			{				
				var matched = false;
				
				for (var i = 0; i < this.filters.length; i++) {
					matched = matched || this.filters[i].matches(params);
				}
				
				return matched;
			},
			
			// Gets a key to define this filter
			getKey: function()
			{
				var key = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					key += (i>0?"||":"") + this.filters[i].getKey()
				}
				
				return key;
			},
			
			// If it has a name and optionally a difficulty and nothing else, it's simple
			isSimple: function()
			{
				var simple = true;
				
				for (var i = 0; i < this.filters.length; i++) {
					simple = simple && this.filters[i].isSimple();
				}
				
				return simple;
			},
			
			isEmpty: function()
			{
				var empty = true;
				
				for (var i = 0; i < this.filters.length; i++) {
					empty = empty && this.filters[i].isEmpty();
				}
				
				return empty;

			},
			
			isValid: function()
			{
				var valid = true;
				
				for (var i = 0; i < this.filters.length; i++) {
					valid = valid && this.filters[i].isValid();
				}
				
				return valid;
			},
			
			getDifficultyText: function()
			{
				var text = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					text += (i>0?"||":"") + this.filters[i].getDifficultyText()
				}
				
				return text;
			},
			
			toString: function()
			{
				var str = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					str += (i>0?"||":"") + this.filters[i].toString()
				}
				
				return str;
			},
			
			toPrettyString: function() {
				var pretty = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					pretty += (i>0?"||":"") + this.filters[i].toPrettystring()
				}
				
				return pretty;

			}
		});

		RaidMultiFilter.paramText = "[raidName] [raidDifficulty] [{state: stateParam}] [{fs: fsParam}] [{age: ageParam}] [{count: countParam} [{page: pageParam}]]";

		