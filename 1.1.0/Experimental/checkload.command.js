		RaidCommand.create( 
			{
				commandName: "checkload",
				aliases: ["loadcheck", "check", "load"],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					var data = DC_LoaTS_Helper.autoLoader;
						
					if (data) {
						var fractionComplete = data.raidLinks.length / data.startingLinkCount,
						    percentComplete = Math.round(fractionComplete * 100);
						    timeElapsed = new Date()/1 - data.startTime,
						    timeRemaining = timeElapsed / fractionComplete;
						ret.statusMessage = "Attempted " + data.counter.attempted + " of " + data.startingLinkCount + " raids (" + percentComplete + "%) in " + timeElapsed + "ms.";
						ret.statusMessage += "\nEstimated Time Remaining: " + timeRemaining + " ms."
						ret.statusMessage += "\nCurrent Report: \n" + data.counter._generateReportText();
					}
					else {
						ret.statusMessage = "No load being performed at this time.";
					}
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Print the timer report"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/timerdata</code>\n";
					helpText += "Prints out timing and performance data about the script\n";
					
					return helpText;
				}
			}
		);
		
