RaidCommand.create(
	{
		commandName: "clearchat",
		aliases: ["cc", "cls", "clear", "clean"],
		// No parsing
		//parsingClass: ,
		handler: function(deck, raidLink, params, text, context)
		{
			// Declare ret object
			var ret = {success: true, statusMessage: "Chat cleared at " + (new Date().toLocaleString())};

			// Load the raid from the link's url
			holodeck.activeDialogue().clear();

			return ret;
		},
		getOptions: function()
		{
			var commandOptions = {
				initialText: {
					text: "Clear chat?"
				}
			};

			return commandOptions;
		},
		buildHelpText: function()
		{
			var helpText = "<b>Raid Command:</b> <code>/clearchat</code>\n";
			helpText += "Clears the text of the chat.\n";
			helpText += "\n";
			helpText += this.getCommandLink("","Clear chat now?") + "\n";


			return helpText;
		}
	}
);
		
