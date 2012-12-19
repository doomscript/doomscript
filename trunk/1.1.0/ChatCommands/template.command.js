		// This is the general template which chat commands should follow
		RaidCommand.create( 
			{
				commandName: "template", // This is the /template command
				aliases: ["templateCommand", "commandTemplate"], // Also, /templateCommand and /commandTemplate
				parsingClass: RaidMultiFilter, // Comment out this line, and a parser will not be created
				myCustomAttribute: "Foo",
				doNotEnumerateInHelp: true, // Don't list this in the help
				
				
				// It's highly advised to just delete this function entirely
				// but I've left it here, commented out, to show that it
				// can be used if you know what you're doing										
//					initialize: function($super, context, commandText)
//					{
//						// Do some special constructor logic here
//						
//						// In the name of all that is good, call the superclass constructor
//						// somewhere in here
//						$super(context, commandText);
//					},

				
				// Handle the execution of this command
				// Parameters:
				//		deck - The Kongregate holodeck
				//		parser - If there is a parsing class, this parser was run with the params
				// 		params - Command text stripped of /commandName from the front
				//		text - Full text of the command as it was called
				//		context - Where this command was called from, either chat or omnibox
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// The work should be done in here
					
					// Explicitly posting as the RaidBot to the chat
					// This only shows for the current user. This message is not sent to everyone.
					deck.activeDialogue().raidBotMessage("Hello World!");

					
					// Always set the success state
					// If the command succeeeded, set the status to true
					// If it failed, set it to false
					ret.success = true;
					
					// If you want to display a message to the user after the command
					// finishes, put the text of the message in ret.statusMessage
					// Unrelatedly, we can also access custom attributes like this.myCustomAttribute
					ret.statusMessage = this.myCustomAttribute;
					
					// Always way to return the ret object
					return ret;
				},
				
				// These options are what the omnibox uses to determine how to display
				// this command as an autocomplete option
				getOptions: function()
				{
					// Typically, there is just a single commandOptions object that is returned
					var commandOptions = {	
						// This option is a clickable link that will load
						// a page in a new window/tab like a real link				
						initialText: {
							// Text of the link
							text: "Open script homepage",
							// Attributes of the <a> tag of this link
							// If there are linkParams, the option will call the handler
							// unless doNotCallHandler is true
							linkParams: {href: this.myCustomFunction(), target: "_blank"},
							// Do not call the above handler function
							doNotCallHandler: true,
							// Actually let the browser load the link
							followLink: true
						},
						
						// This option is just text. It doesn't do anything
						otherOption: {
							text: "Not clickable",
							// Sets this option to do nothing
							executable: false
						},
						
						// This command actually runs the template command
						thirdOption: {
							// Text of the command button
							text: "Run Template Command",
							// If there's a callback, the option will call the handler
							// unless doNotCallHandler is true.
							callback: function()
									  {
									  	// Do work in here. Usually just minor
									  	// set up work since the handler is going
									  	// to be called next. 
									  	// If this code starts to get long, you
									  	// might consider going about it differently.
									  }
						}
					};
					
					// Make sure to return the options we just made
					return commandOptions;
				},
				
				// Custom functions go in just like needed functions
				myCustomFunction: function()
				{
					return DC_LoaTS_Properties.scriptURL;
				},
				
				// Here you simply construct the help text for when a user calls /template help
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/template</code>\n";
					helpText += "Prints hello world, or does something else\n";
					
					// Aliases for the command will be automatically appended to the bottom
					
					return helpText;
				}
			}
		);
		
