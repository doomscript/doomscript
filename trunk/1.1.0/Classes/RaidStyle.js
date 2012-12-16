		/************************************/
		/********** RaidStyle Class *********/
		/************************************/
		
		// Class to parse raid style text of any form into CSS stuff
		window.RaidStyle = Class.create({
			initialize: function(styleText)
			{
				var naturalLanguage = "";
				var nativeCSS = "";
				this.css = "";

//				console.log("Parsing styleText: \"" + styleText + "\"")
				
				// Extract from the inputted text the various natural language and native CSS bits
				RaidStyle.parsePattern.lastIndex = 0;
				for (var match = RaidStyle.parsePattern.exec(styleText); match && match[0] != ""; match = RaidStyle.parsePattern.exec(styleText))
				{
					// Combine any natural language pieces together
					if (typeof match[1] !== "undefined")
					{
						naturalLanguage += match[1];
					}
					
					// Combine any native CSS pieces together
					if (typeof match[2] !== "undefined")
					{
						nativeCSS += match[2];
					}
				}
				
				// Trim out any extra whitespace
				naturalLanguage = naturalLanguage.trim().toLowerCase();
				nativeCSS = nativeCSS.trim();
				
//				console.log("styleText yielded naturalLanguage: \"" + naturalLanguage + "\" and nativeCSS: \"" + nativeCSS + "\"");
				
				// Try to parse the natural language bits
				// First, get a copy of the parsable bits
				var parseEls = RaidStyle.getNaturalLanguageParseElements();
				
				for (var i = 0; i < parseEls.length && naturalLanguage.length > 0; i++)
				{
					var el = parseEls[i];
					el.pattern.lastIndex = 0;
					var match = el.pattern.exec(naturalLanguage);
					if (match != null && match[0] != "")
					{
//						console.log(el.property + " captured \"" + match[el.capture] + "\" and will replace \"" + match[el.replace]) +"\"";
						this.css += el.property + ": " + match[el.capture] + "; ";
//						console.log("Natural language before: \"" + naturalLanguage + "\"");
						naturalLanguage = naturalLanguage.replace(match[el.replace], "").trim();
//						console.log("Natural language after: \"" + naturalLanguage + "\"");
					}
					else
					{
//						console.log(el.property + " did not match against \"" + naturalLanguage + "\"");
					}
				}
				
				this.css += nativeCSS;
				console.log("CSS: ");
				console.log(this.css);
			},
			
			toString: function()
			{
				return this.css;
			},
			
			isEmpty: function()
			{
				return typeof this.css === "undefined" || this.css.trim().length == 0;
			},
			
			isValid: function()
			{
				//TODO Will a style ever be not valid?
				return true;
			}
		});
		
		// General pattern to pick apart the natural language style from the native CSS styles
		RaidStyle.parsePattern = /([^"]*)?("[^"]*")?/gi;
		
		// Pattern to find bits of text that are colors. Can find #FFF, #FFFFFF, rgb(255,255,255), or white as the color white
		RaidStyle.baseColorPattern = /#[0-9a-f]{3}(?:[0-9a-f]{3})?\b|rgb\((?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),(?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),(?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)|\b(?:black|white|red|yellow|lime|aqua|blue|fuchsia|orange|gray|silver|maroon|olive|green|teal|navy|purple)\b/i;
		RaidStyle.colorPattern = new RegExp("(?:(?:(?!on +).. )|^)(" + RaidStyle.baseColorPattern.source + ")", "i");
		RaidStyle.backgroundColorPattern = new RegExp("\\bon +(" + RaidStyle.baseColorPattern.source + ")", "i");
		
		// These are the current natural language features we're going to support for now
		RaidStyle.naturalLanguageParseElements = [
												 	{property: "font-weight", 		capture: 0, replace: 0, pattern: /\b(?:[1-9]00(?!px|pt|em|en|%)|bold(?:er)?|lighter|normal)\b/i},
												 	{property: "background-color", 	capture: 1, replace: 0, pattern: RaidStyle.backgroundColorPattern},
												 	{property: "color", 			capture: 1, replace: 1, pattern: RaidStyle.colorPattern},
												 	{property: "font-size", 		capture: 0, replace: 0, pattern: /\b[0-9]?[0-9]?[0-9]?[0-9] ?(?:(?:px|pt|em|en)\b|%)|\bx?x-small\b|\bsmall(?:er)?\b|\bmedium\b|\blarger?\b|\bx?x-large\b/i},
												 	{property: "text-decoration", 	capture: 0, replace: 0, pattern: /\bunderline(?: overline)\b/i},												 	
												 	{property: "font-style", 		capture: 0, replace: 0, pattern: /\b(?:italic|oblique|normal)\b/i},												 	
												 	{property: "whitespace", 		capture: 0, replace: 0, pattern: /\b(?:pre|pre-wrap|pre-line|-moz-pre-wrap|-o-pre-wrap|nowrap|normal)\b/i},												 	
												 	{property: "display", 			capture: 0, replace: 0, pattern: /\b(?:none|inline|block|inline-block|list-item|marker|compact|run-in|table-header-group|table-footer-group|table|inline-table|table-caption|table-cell|table-row|table-row-group|table-column|table-column-group)\b/i}
												 ];
		
		RaidStyle.getNaturalLanguageParseElements = function()
		{
			var el = [];
			for (var i = 0; i < RaidStyle.naturalLanguageParseElements.length; i++)
			{
				el.push(RaidStyle.naturalLanguageParseElements[i]);
			}
			
			return el;
		}
		
												 
