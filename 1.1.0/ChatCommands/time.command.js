		RaidCommand.create( 
			{
				commandName: "time",
				aliases: ["servertime"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					ret.statusMessage = "Local Time is approximately: " + this.getLocalDateText() + "\n";
					ret.statusMessage += "Server Time is approximately: " + this.getServerDateText();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						config: {
							refreshEvery: 1000,
						},
						initialText: {
							text: "Local Time: " + this.getLocalDateText() + "<br>Server Time: " + this.getServerDateText()
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/time</code>\n";
					helpText += "Estimates the current server time (GMT) based on local system time.\n";
					
					return helpText;
				},
				
				getLocalDateText: function()
				{
					return new Date().toLocaleString();
				},
				getServerDateText: function()
				{
					var localDate = new Date();
					var serverDate =  new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000);
					return serverDate.toLocaleString().substring(0,25) + "GMT+0000 (UTC)";
				}
			}
		);
		
