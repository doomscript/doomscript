/************************************/
/********* RaidCommand Class ********/
/************************************/

// Mainly located by the omnibox iterating over all commands checking to see what matches
// and each of these being hard assigned to their names for the chat commands

window.RaidCommand = Class.create({
	initialize: function(context, commandText)
	{
		this.context = context;
		this.isHelp = false;

		if (typeof commandText != "undefined")
		{
			this.processText(commandText);
		}
	},

	processText: function (commandText)
	{
		this.commandText = commandText;
		this.processedText = this.commandText;

		if (this.processedText.charAt(0) == '/')
		{
			this.processedText = this.processedText.substring(1);
		}

		// If the command was explicitly provided, we need to strip it
		if (this.processedText.toLowerCase().indexOf(this.getName()) == 0)
		{
			this.processedText = this.processedText.substring(this.getName().length);
		}
		else
		{
			for (var i = 0; i < this.aliases.length; i++)
			{
				var alias = this.aliases[i];
				if (this.processedText.toLowerCase().indexOf(alias) == 0)
				{
					this.processedText = this.processedText.substring(alias.length);
				}
			}
		}

		// Now processed text should just be the params. Need to trim the whitespace
		this.processedText = this.processedText.trim();

		// Reassemble the normalized commandText
		this.commandText = "/" + this.getName() + " " + this.processedText;

		// Check for help
		if (this.processedText.toLowerCase() == "help")
		{
			this.isHelp = true;
		}
		// Not a help command
		else
		{
			// With the params, get the parser
			if (typeof this.parsingClass != "undefined")
			{
				this.parser = new this.parsingClass(this.processedText);
			}
		}
	},

	// Get the param text for help
	getParamText: function()
	{
		return this.constructor.getParamText();
	},

	// Get all the names for this command, including both it's actual name and aliases
	getNames: function()
	{
		return [this.getName()].concat(this.aliases);
	},

	// Get the name of this command
	getName: function()
	{
		return this.constructor.commandName;
	},

	// Get the help text for the command
	getHelpText: function()
	{
		// Default help text to say there isn't help text
		var helpText = "This command does not have any additional help.";

		// If the subclass has help text
		if (typeof this.buildHelpText != "undefined")
		{
			// Grab it and set it to be our returned help text
			helpText = this.buildHelpText();
		}

		// Append any aliases this command has
		helpText += "\n"
		helpText += "<b>Aliases:</b> " + this.getAliasesText() + "\n";

		return helpText;
	},

	// See if the assigned parser has valid params
	//FIXME - Does not work and/or is not used
	isValid: function()
	{
		var valid = true;
		if (typeof this.parsingClass != "undefined")
		{
			var parser = new this.parsingClass(params);
			valid = parser.isValid();
		}

		return valid;
	},

	// Get the text for all the aliases of this command. Aliases are wrapped in <code></code>tags
	getAliasesText: function()
	{
		var aliasesText = "";

		// If there are any aliases
		if (typeof this.aliases != "undefined" && this.aliases.length > 0)
		{
			// Add all the aliases in
			for (var i = 0; i < this.aliases.length; i++)
			{
				// Format the alias
				aliasesText += "<code>/" + this.aliases[i] + "<code>";

				// Add commas as necessary
				if (i < this.aliases.length - 1)
				{
					aliasesText += ", ";
				}
			}
		}
		// No aliases
		else
		{
			aliasesText = "None.";
		}

		return aliasesText;
	},

	// Get a text link to this command
	getCommandLink: function(params, displayText)
	{
		return DC_LoaTS_Helper.getCommandLink("/" + this.getName() + (params ? " " + params:""), displayText);
	},

	// Get the drop down menu options for this command
	getOptions: function()
	{
		var commandOptions = {

			initialText: {
				text: this.commandName,
				callback: function()
				{
					console.log("mainOption " + this.commandName);
				}
			},

			secondOption: {
				text: "Option #2",
				callback: function()
				{
					console.log("secondOption " + this.commandName);
				}
			}

		};

		return commandOptions;
	},

	// Gets the full HTML line for this command's options
	getOptionLine: function(oldLine)
	{
		var commandOptions = this.getOptions();

		var line;
		// If we're operating on an existing line
		if (typeof oldLine != "undefined")
		{
			// Put new stuff back into this line
			line = oldLine;

			// Clear everything old from this line
			line.childElements().invoke("remove");
		}
		// If there is no existing line
		else
		{
			// Make a new line
			line = new Element("li");
		}

		var subOptions = new Element("div", {style: "float: right;"});

		var config = commandOptions.config || {};

		for (var optionName in commandOptions)
		{
			// Configuration is obviously not a real option
			if (optionName.toLowerCase() == "config")
			{
				continue;
			}

			var option = commandOptions[optionName];

			var textHolder;
			if (typeof option.callback != "undefined" || typeof option.linkParams != "undefined" || false !== option.executable)
			{

				var linkParams = {"href": "#", "class": "DC_LoaTS_omniboxOption DC_LoaTS_" + optionName.toLowerCase()};
				if (typeof option.linkParams != "undefined")
				{
					for (var paramName in option.linkParams)
					{
						linkParams[paramName] = option.linkParams[paramName];
					}
				}

				textHolder = new Element("a", linkParams);


				textHolder.onclick = function(option)
				{
					if (typeof option.callback != "undefined")
					{
						option.callback.apply(this);
					}
					this.execute(option.doNotCallHandler);
					return (typeof option.followLink != "undefined")?option.followLink:false;
				}.bind(this, option);
			}
			else
			{
				textHolder = new Element("div", {"class": "DC_LoaTS_" + optionName.toLowerCase()});
			}

			if (typeof option.text != "undefined")
			{
				textHolder.update(option.text);
			}

			if (optionName == "initialText")
			{
				line.insert({bottom: textHolder});
			}
			else
			{
				subOptions.insert({bottom: textHolder});
			}
		}

		if (subOptions.children.length > 0)
		{
			line.insert({bottom: subOptions});
		}
		else
		{
			line.children[0].setStyle({"float":"none"});
		}
//				
//				var children = $A(line.immediateDescendants());
//				var currentTallest = 0;
//				
//				for (i = 0; i < children.length; i++)
//				{
//			        if (children[i].getHeight() > currentTallest)
//			        {
//		                currentTallest = children[i].getHeight();
//			        }
//				}
//				
//				for (i = 0; i < children.length; i++)
//				{
//			        children[i].setStyle({ height: (currentTallest + 'px') });
//				}
//				
//				
		if (typeof config.refreshEvery == "number" && typeof this.omniboxOptionRefreshInterval == "undefined")
		{
			this.omniboxOptionRefreshInterval = setInterval(this.getOptionLine.bind(this, line), config.refreshEvery);
		}

		return line;
	},

	// Run this command
	execute: function(doNotCallHandler)
	{
		var ret = {};

		// Check for help
		if (this.isHelp == true)
		{
			DCDebug("Executing help for " + this.commandName);
			if (this.context == "chat" || true) //TODO: Remove || true
			{
				holodeck.activeDialogue().raidBotMessage(this.getHelpText());
			}
			else if (this.context == "omnibox")
			{
				console.log("Display help for " + this.commandName);
			}
			else
			{
				console.warn("Could not find help for command " + this.commandText + " in context " + this.context);
			}
		}
		// Not a help command
		else if (typeof doNotCallHandler === "undefined" || !doNotCallHandler)
		{
			DCDebug("Executing non-help for " + this.commandName + " doNotCallHandler: " + doNotCallHandler)
			if (typeof this.parser === "undefined" || (typeof this.parser.isValid === "function" && this.parser.isValid()))
			{
				ret = this.handler(holodeck, this.parser, this.processedText, this.commandText, this.context);

				if (typeof ret.statusMessage != "undefined")
				{
					if (this.context == "chat" || true) //TODO: Remove || true
					{
						holodeck.activeDialogue().raidBotMessage(ret.statusMessage);
					}
					else if (this.context == "omnibox")
					{
						console.log("Display status message: " + ret.statusMessage);
					}
					else
					{
						console.warn("Could not display message " + ret.statusMessage + " for command " + this.commandText + " in context " + this.context);
					}
				}

				DCDebug("Command " + this.commandText + (ret.success===true?" Succeeded":" Failed"));
			}
			else
			{
				console.warn("Could not parse text " + this.commandText + " as command " + this.commandName + " in context " + this.context);
			}
		}

		ret.sendToChat = this.sendToChat && this.context == "chat";

		// Regardless of execution, we need to hide the command options
		RaidToolbar.hideCommandOptions();

		// Clear the omnibox, needs work
//				RaidToolbar.resetOmnibox();

		return ret;
	},

	// Called when the option is no longer in the suggested box
	onRemovedFromOmnibox: function()
	{
		DCDebug("Deactivating " + this.commandName);
		if (typeof this.omniboxOptionRefreshInterval != "undefined")
		{
			clearInterval(this.omniboxOptionRefreshInterval);
			delete this.omniboxOptionRefreshInterval;
		}
	}
});

RaidCommand.create = function(classObject)
{
	if (typeof classObject.commandName === "undefined") {
		throw {message: "Cannot create command without name", cls: classObject};
	}

	if (typeof classObject.aliases === "undefined") {
		classObject.aliases = [];
		console.warn(classObject.commandName + " did not define its aliases");
	}

	var commandClass = Class.create(RaidCommand, classObject);
	//TODO: Need to clean this up
	commandClass.commandName = classObject.commandName;
	commandClass.aliases = classObject.aliases;
	commandClass.paramText = classObject.paramText;
	commandClass.parsingClass = classObject.parsingClass;
	//TODO Implement OO framework at some point
	if (typeof commandClass.parsingClass !== "undefined" && typeof commandClass.parsingClass.prototype.isValid !== "function")
	{
		console.warn(commandClass.commandName + " Command Creation Error: Parser must have isValid method!");
	}
	commandClass.doNotEnumerateInHelp = classObject.doNotEnumerateInHelp;
	commandClass.getParamText = function()
	{
		// Assume empty
		var params = "";

		// If the command provided text, use that
		if (typeof this.paramText != "undefined")
		{
			params = this.paramText;
		}
		// If the parser can provide us param text, that's great, too
		else if (typeof this.parsingClass != "undefined" && typeof this.parsingClass.paramText == "string")
		{
			params = this.parsingClass.paramText;
		}
		else
		{
			DCDebug("No param text for " + this.commandName);
		}

		return params;
	}.bind(commandClass);



	DC_LoaTS_Helper.chatCommands[classObject.commandName] = commandClass;
};
		
