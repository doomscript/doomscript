		/************************************/
		/****** RaidCommandFactory Class ****/
		/************************************/

		window.RaidCommandFactory = Class.create({
			
			/*public constructor*/ initialize: function(raidCommandClass, context)
			{
				this.raidCommandClass = raidCommandClass;
				this.context = context;
			},
			
			/*public RaidCommand*/ createCommand: function(text)
			{
				return new this.raidCommandClass(this.context, text);
			},
			
			// Returning true will send the message on to Kongregate chat
			// Returning false will stop the message from being sent
			/*public boolean*/ createAndExecuteCommand: function(deck, text)
			{
				var command = this.createCommand(text);
				DCDebug("Created Command " + this.raidCommandClass.commandName);
				var commandRet = command.execute();
				
				// If the commandRet has sendToChat set to true, the command text typed by the user,
				// 		(Not the command output text) will forward on to chat
				// otherwise, we default to absorbing the command locally
				return commandRet.sendToChat || false;
			}
			
			
		});
		
