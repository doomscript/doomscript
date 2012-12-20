		/************************************/
		/** UrlParsingFilter Class */
		/************************************/
		
		window.UrlParsingFilter = Class.create({
			initialize: function(params)
			{
				// Capture input params
				this.params = params;
				
				// Default to not forced and not cancelled
				this.force = false;
				this.cancel = false;
				
				// Type is other unless we match something specific
				this.type = "other";
				
				// Break apart the params to find out what this filter is supposed to represent
				var paramsParts = params.trim().replace(/\s+/g, " ").split(" ");
				
				// If we're supposed to force this filter
				if (paramsParts[0] === "force" || paramsParts[0] === "!") {
					this.force = true;
					this.url = paramsParts[1];
					if (paramsParts[2]) {
						this.raidFilter = new RaidMultiFilter(paramsParts.slice(2).join(" "));
					}
				}
				// If we're supposed to cancel this filter
				else if (paramsParts[0] === "cancel") {
					this.cancel = true;
				}
				// Neither forced nor cancelled, just a URL and maybe a RaidFilter
				else {
					this.url = paramsParts[0];
					if (paramsParts[1]) {
						this.raidFilter = new RaidMultiFilter(paramsParts.slice(1).join(" "));
					}
				}
				
				// Does this match the url of any service we already know about? Assume not
				this.known = false;
				
				var match;
				// Try the various urls that this parser knows about
				// Even if we're forcing it, we still need to run this to resolve the regexMatch
				for (var type in UrlParsingFilter.urlPatterns) {
					if ((match = UrlParsingFilter.urlPatterns[type].exec(this.url)) !== null) {
						this.known = true;
						this.type = type;
						this.regexMatch = match;
						break;
					}
				}
			},
			getUrlLink: function()
			{
				return "<a href=\"" + this.getWorkingUrl() + "\" target=\"_blank\">" + this.getWorkingUrl() + "</a>";
			},
			
			getWorkingUrl: function ()
			{
				return this.convertedUrl || this.url;
			},
			
			// It's valid if it provides a url or is a cancel
			isValid: function()
			{
				return this.getWorkingUrl() || this.cancel;
			}
		});
		
		// Parameter text for this parser
		UrlParsingFilter.paramText = "url [raidFilter]";
		
		// Pattern to match different link types
		UrlParsingFilter.urlPatterns = {
				"pastebin": /(?:http:\/\/)?(?:www\.)?pastebin\.com\/(.+)/i, 
				"cconoly": /(?:http:\/\/)?(?:www\.)?cconoly\.com\/lots\/raidlinks\.php/i
			};		
		
