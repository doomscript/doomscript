		/************************************/
		/**** RaidLinkstateParser Class *****/
		/************************************/
		
		window.RaidLinkstateParser = Class.create({
			initialize: function(params)
			{
				var paramsParts = params.trim().replace(/\s+/g, " ").split(" ");
				var ret;
				if (paramsParts.length != 1 && paramsParts.length != 2)
				{
					ret.success = false;
					ret.statusMessage = "Could not understand <code>" + params + "</code>. Should have one or two parameters: url and optionally state.";
				}
				else
				{
					this.raidLink = new RaidLink(paramsParts[0]);
					this.state;
					var raidLinkIndex = 0;
					if (!this.raidLink.isValid())
					{
						if (paramsParts.length == 2)
						{
							this.raidLink = new RaidLink(paramsParts[1]);
							raidLinkIndex = 1;
						}
					}
					
					if (!this.raidLink.isValid())
					{
						ret.success = false;
						ret.statusMessage = "Could not parse raid link from <code>" + params + "</code>";
					}
					else
					{
						if (paramsParts.length == 2)
						{
							this.state = paramsParts[raidLinkIndex*-1+1];
						}
						
						DCDebug("LinkState: ");
						DCDebug("RaidLink for " + this.raidLink.getName());
						DCDebug("State Param: " + this.state);
					}
				}
				
				return ret;
			},
			
			getName: function()
			{
				return (typeof this.raidLink != "undefined")?this.raidLink.getName():"undefined";
			},
			
			getState: function()
			{
				return this.state;
			},
			
			isValid: function()
			{
				return this.raidLink != "undefined" && this.raidLink.isValid();
			}
		});
		
		// Parameter text for this parser
		RaidLinkstateParser.paramText = "url [newState]";

		
