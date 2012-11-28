		/************************************/
		/********* RaidFilter Class *********/
		/************************************/
		
		// This class represents a filter on a raid search
		window.RaidFilter = Class.create({
			
			// Constructor
			initialize: function(filterText)
			{
				Timer.start("RaidFilter init");
				try
				{
					// Declare some vars for later
					this.name;
					this.difficulty;
					this.state;
					this.inverseState = false;
					this.age;
					this.count;
					this.page;
					this.fs;
					this.valid = true;
	
					// Capture original filterText
					this.filterText = filterText;
					
					// Pattern to pick apart the command for the name and id
					//TODO: /((?:[^{}\d]|[5-9]|\d*\.\d*)+)?\s*([0-4](?:\s*\|\s*[0-4]){0,4})?/
					var commandPattern = /([^0-4{}]+)? ?([0-4])? ?/;
	
					// Attempt to find the matches
					var match = commandPattern.exec(filterText);
					
					// If there were some matches
					if (match != null)
					{
						// If the raid command had a name
						if (typeof match[1] != "undefined")
						{
							this.name = match[1].trim();
						}
						
						// If the raid command had a difficulty
						if (typeof match[2] != "undefined")
						{
							this.difficulty = parseInt(match[2]);
						}
						
					}
					
					// Pattern to match everything that's currently in {filterType: paramValue} form
					var extraFiltersPattern = /(?:{(\w+)[:=]([^{}]+)} ?)/g;
					
					// For every additional parameter type
					while ((match = extraFiltersPattern.exec(filterText)) != null)
					{
						// Name of the param
						var filterType = match[1].trim().toLowerCase();
						
						// Value of the param
						var paramValue = match[2].trim();
						
						// Trace statement
						var traceStatement = "<code>{" + filterType + ":" + paramValue + "}</code> in <code>" + filterText + "</code>";
						
						// Based on the param type, parse the param value
						switch (filterType)
						{
							case "age":
								// Get the pieces of the age
								var match = RaidFilter.numberExpressionPattern.exec(paramValue);
								
								// If there were pieces to get
								if (match != null)
								{
									var condition = match[1];
									var num = parseInt(match[2]);
									
									// If the number wasn't really a number
									if (isNaN(num))
									{
										// Go to the next one.
										continue;
									}
									var period = match[3];
									
									// If there was a period
									if (typeof period != "undefined")
									{
										switch (period.toLowerCase())
										{
											case "d":
												// 24 hours in a day
												num *= 24;
											case "h":
												// 60 minutes in an hour
												num *= 60;
											case "m":
												// 60 seconds in a minute
												num *= 60;
											case "s":
												// 1000 ms in a second
												num *= 1000;
												break;
											case "ms":
												break;
											default:
												holodeck.activeDialogue().raidBotMessage("Did not understand unit of time <code>" + period + "</code>  for " + traceStatement);
												this.valid = false;
										}
									}
									// else no period, assume ms
									
									// Sanitize the condition. Default to <=
									condition = this.sanitizeConditional(condition, "<=");
									
									if (condition == "undefined")
									{
										holodeck.activeDialogue().raidBotMessage("Did not understand condition <code>" + condition + "</code>  for " + traceStatement);
										this.valid = false;
									}
								}
								else
								{
									// Notify the user that we don't know what that age is
									holodeck.activeDialogue().raidBotMessage("Did not understand " + filterType + " expression <code>" + paramValue + "</code> for " + traceStatement);
									this.valid = false;
								}
								this.age = condition + num;
								break;
							case "count":
								// If the number wasn't really a number
								if (isNaN(parseInt(paramValue)))
								{
									// Go to the next one.
									continue;
								}
								
								this.count = parseInt(paramValue);
								break;
							case "page":
								// If the number wasn't really a number
								if (isNaN(parseInt(paramValue)))
								{
									// Go to the next one.
									continue;
								}
								
								this.page = parseInt(paramValue);
								break;
							case "fs":
								var match = RaidFilter.numberExpressionPattern.exec(paramValue);
								
								if (match != null)
								{
									var condition = match[1];
									var num = parseInt(match[2]);
									
									// If the number wasn't really a number
									if (isNaN(num))
									{
										// Go to the next one.
										continue;
									}
									
									var magnitude = match[3];
									
									// If there was a magnitude
									if (typeof magnitude != "undefined")
									{
										switch (magnitude.toLowerCase())
										{
											case "t":
												num *= 1000;
											case "b":
												num *= 1000;
											case "m":
												num *= 1000;
											case "k":
												num *= 1000;
												break;
											default:
												holodeck.activeDialogue().raidBotMessage("Did not understand magnitude <code>" + magnitude + "</code>  for " + traceStatement);
												this.valid = false;
										}
									}
									// else no magnitude, assume fully written out damage
									
									// Sanitize the condition. Default to ==
									condition = this.sanitizeConditional(condition, "==");
									
									if (condition == "undefined")
									{
										holodeck.activeDialogue().raidBotMessage("Did not understand condition <code>" + condition + "</code>  for " + traceStatement);
										this.valid = false;
									}
								}
								else
								{
									// Notify the user that we don't know what that fs is
									holodeck.activeDialogue().raidBotMessage("Did not understand " + filterType + " expression " + traceStatement);
									this.valid = false;
								}
								this.fs = condition + num;
								break;
							case "state":
								var tmpStateText = paramValue;
							
								// Are we doing invese state?
								if (tmpStateText.charAt(0) == '!')
								{
									this.inverseState = true;
									tmpStateText = tmpStateText.substring(1);
								}
								
								// Lookup the state enum from the text
								this.state = RaidManager.STATE.valueOf(tmpStateText);
								
								// If the text didn't match any known state
								if (typeof this.state == "undefined")
								{
									// Notify the user that we don't know what that state is
									holodeck.activeDialogue().raidBotMessage("Did not understand state for "  + traceStatement);
									
									// No longer valid
									this.valid = false;
								}
								break;
							default:
								console.warn("Did not understand filter param " + match[1] + ":" + match[2]);
						}
					}
				}
				catch(ex)
				{
					console.warn("Failed to initialize RaidFilter with text " + filterText);
				}
				Timer.stop("RaidFilter init");
			},
			
			// Takes in a condition and sanitizes it for use in the filter
			sanitizeConditional: function(condition, defaultTo)
			{
				if (typeof condition != "undefined")
				{
					switch (condition)
					{
						case "=": 
							condition = "==";
							break;
						case "!":
							condition = "!=";
							break;
						case "<=":
						case ">=":
						case "==":
						case "!=":
						case "<":
						case ">":
							break;
						default:
							// Print warning to console
							console.warn("Could not parse condition: " + condition);
							
							// Return undefined since there was a problem
							return;
					}
				}
				// If there was no condition passed in
				else
				{
					// Set it to the default
					condition = defaultTo;
				}
				
				// Return the correct condition
				return condition;
			},
			
			// Based on this filter, does a given property match the filter
			matches: function(params)
			{				
				// Init matched to true
				var matched = true;
				
				// Shortcut to fail any visited, completed, or ignored raids unless you're specifically filtering those
				if (typeof params.state !== "undefined" && 
						(
								(RaidManager.STATE.equals(params.state, RaidManager.STATE.VISITED) && !RaidManager.STATE.equals(this.state, RaidManager.STATE.VISITED)) ||
								(RaidManager.STATE.equals(params.state, RaidManager.STATE.COMPLETED) && !RaidManager.STATE.equals(this.state, RaidManager.STATE.COMPLETED)) ||
								(RaidManager.STATE.equals(params.state, RaidManager.STATE.IGNORED) && !RaidManager.STATE.equals(this.state, RaidManager.STATE.IGNORED))
						)
					) {
					return false;
				}
				
				// Iterate over all the params
				for (var field in params)
				{
					// Grab the value of the field
					var value = params[field];
					
					// If the field is not part of the filter or was undefined in the params
					if (typeof value != "undefined" && typeof this[field] != "undefined")
					{
						switch(field.toLowerCase())
						{
							case "name":
								// Dirty pi hacks. TODO: Do this better
								var tmpName = (this.name.toLowerCase() === "pi")?"^pi_":this.name;
								// If the user's text matches this raid name
								matched = matched && new RegExp(tmpName, "i").test(value);
								break;
							case "difficulty":
								// If the user's difficulty matches the raid
								matched = matched && this.difficulty == value
								break;
							case "state":
								// If the state matches and shouldn't be inverted
								// Or of the state doesn't match and should be inverted
								matched = matched && ((RaidManager.STATE.equals(value, this.state) && !this.inverseState)
										|| 
										(!RaidManager.STATE.equals(value, this.state) && this.inverseState));
								break;
							case "age":
								// Check against the age condition
								matched = matched && eval(value + this.age);
								break;
							case "fs":
								// Check against the fs condition
								matched = matched && eval(value + this.fs);
								break;
							case "count":
								// Check against the count condition
								matched = matched && value < this.count;
								break;
							default:
								// Didn't find the field
								console.warn("Couldn't match RaidFilter property to " + field);
								matched = false;
								break;
						}
					}
				}
				
				return matched;
			},
			
			// Gets a key to define this filter
			getKey: function()
			{
				return 	((typeof this.name 			!= "undefined")?"n=" + this.name + ";":"") + 
						((typeof this.difficulty 	!= "undefined")?"d=" + this.difficulty + ";":"") +
						((typeof this.state 		!= "undefined")?"s=" + this.state + ";":"") +
						((typeof this.inverseState 	!= "undefined")?"i=" + this.inverseState + ";":"") +
						((typeof this.age 			!= "undefined")?"a=" + this.age + ";":"") +
						((typeof this.count 		!= "undefined")?"c=" + this.count + ";":"") +
						((typeof this.page 			!= "undefined")?"p=" + this.page + ";":"") +
						((typeof this.fs 			!= "undefined")?"f=" + this.fs + ";":"");
			},
			
			// If it has a name and optionally a difficulty and nothing else, it's simple
			isSimple: function()
			{
				return typeof this.name != "undefined" && 
					 (typeof this.state			== "undefined" &&
					  typeof this.inverseState 	== "undefined" &&
					  typeof this.age			== "undefined" &&
					  typeof this.count			== "undefined" &&
					  typeof this.page			== "undefined" &&
					  typeof this.fs			== "undefined");
			},
			
			isEmpty: function()
			{
				return 	(typeof this.name 			== "undefined") &&
						(typeof this.difficulty 	== "undefined") &&
						(typeof this.state 			== "undefined") &&
						(typeof this.inverseState 	== "undefined") &&
						(typeof this.age 			== "undefined") &&
						(typeof this.count 			== "undefined") &&
						(typeof this.page 			== "undefined") &&
						(typeof this.fs 			== "undefined");
	
			},
			
			isValid: function()
			{
				return this.valid;
			},
			
			getDifficultyText: function()
			{
				return RaidType.difficulty[this.difficulty];
			},
			
			toString: function()
			{
				return 	(((typeof this.name 			!= "undefined")? this.name + " ":"") +
						 ((typeof this.difficulty 		!= "undefined")? this.difficulty + " ":"") +
						 ((typeof this.state 			!= "undefined")? "{state: " + 
						 
						 ((typeof this.inverseState 	!= "undefined" && this.inverseState == true)? "!":"")
						 + this.state.text + "}"+ " ":"") +
						 ((typeof this.fs 				!= "undefined")? "{fs: " + this.fs + "} ":"") + 
						 ((typeof this.age 				!= "undefined")? "{age: " + this.age + "ms} ":"") +
						 ((typeof this.count 			!= "undefined")? "{count: " + this.count + "} ":"") +
						 ((typeof this.page 			!= "undefined")? "{page: " + this.page + "} ":"")).trim();
			},
			
			toPrettyString: function() {
				var ret = "";

				// Find the matching raid types
				var matchedTypes = DC_LoaTS_Helper.getRaidTypes(this);

				if (matchedTypes.length > 0)
				{
					// If there's a difficulty
					if (typeof this.difficulty !== "undefined") {
						if (this.difficulty >= 1 && this.difficulty <= 4) {
							ret += RaidType.difficulty[this.difficulty] + " ";
						}
						else {
							return "Filter does not match any raid difficulties";
						}
					}

					// If there's a name
					if (typeof this.name !== "undefined") {

						// If we matched some raid types
						var raids = [];
						for (var i = 0; i < matchedTypes.length; i++)
						{
							// Grab this raid
							raids.push(matchedTypes[i].fullName);
						}

						if (raids.length == 1) {
							ret += raids[0];
						}
						else if (raids.length == 2) {
							ret += raids[0] + " and " + raids[1];
						}
						else {
							var tmp = raids.join(", ");
							ret += tmp.substring(0, tmp.lastIndexOf(", ") + 2) + "and " + tmp.substring(tmp.lastIndexOf(", ") + 2);
						}

					}
				}
				else {
					return "Filter does not match any raid types";
				}					
				
				return ret;
			}
		});
		
		// Parameter text for this parser
		RaidFilter.paramText = "[raidName] [raidDifficulty] [{state: stateParam}] [{fs: fsParam}] [{age: ageParam}] [{count: countParam} [{page: pageParam}]]";
		
		// Regex to parse number expressions
		RaidFilter.numberExpressionPattern = /(<=?|>=?|==?|!=?)?\s*(\d+)\s*(\w\w?)?/;
		
