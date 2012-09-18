		/************************************/
		/** PasteBinLinkParsingFilter Class */
		/************************************/
		
		window.PasteBinLinkParsingFilter = Class.create({
			initialize: function(params)
			{
				var paramsClean = params.trim().replace(/\s+/g, " ");
				var indexOfSpace = paramsClean.indexOf(" ");
				var pastebinURL = paramsClean.substring(0, indexOfSpace > 0 ? indexOfSpace : paramsClean.length);
				if (PasteBinLinkParsingFilter.pastebinPattern.test(pastebinURL))
				{
					this.pastebinURL = pastebinURL;
				}
				if (indexOfSpace > 0)
				{
					this.raidFilter = new RaidFilter(paramsClean.substring(indexOfSpace))
				}
			},
			getPasteLink: function()
			{
				return "<a href=\"" + this.pastebinURL + "\" target=\"_blank\">" + this.pastebinURL + "</a>";
			},
			
			isValid: function()
			{
				return typeof this.pastebinURL !== "undefined";
			}
		});
		
		// Parameter text for this parser
		PasteBinLinkParsingFilter.paramText = "pastebinURL [raidFilter]";
		
		// Pattern to match pastebin links
		PasteBinLinkParsingFilter.pastebinPattern = /(?:http:\/\/)?(?:www\.)?pastebin\.com\/(.+)/i;
		
		// Where to get raw pastebin data
		PasteBinLinkParsingFilter.rawBase = "http://pastebin.com/raw.php?i=";

		
