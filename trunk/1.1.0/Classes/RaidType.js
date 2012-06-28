		/************************************/
		/********** RaidType Class **********/
		/************************************/
		
		// The Raid Type class is the generic form of a raid
		/*public class*/
		window.RaidType = Class.create({
	    	
		    // Constructor
		    /*public RaidType*/
			initialize: function(id, zone, fullName, shortName, colloqName, time, size, stat, health, fairShare, target)
			{
				this.id = id;
				this.zone = zone;
				this.fullName = fullName;
				this.shortName = shortName;
				this.shortestName = "!"; // This will actually be calculated after all raids are known
				this.colloqName = colloqName;
				this.time = time;
				this.size = size;
				this.stat = stat;
				
				// Calculate Health
				if (typeof health == "number")
				{
					this.health = [health*RaidType.difficultyHealthFactor[1], 
								   health*RaidType.difficultyHealthFactor[2], 
								   health*RaidType.difficultyHealthFactor[3], 
								   health*RaidType.difficultyHealthFactor[4], 
								   ];
				}
				else if (typeof health == "string")
				{
					this.health = [health, health, health, health];
				}
				else if (typeof health == "object" && typeof health !== null)
				{
					this.health = health;
				}
				else
				{
					this.health = ["Unknown", "Unknown", "Unknown", "Unknown"];
				}
				
				// Calculate Fair Share
				if (typeof fairShare == "number" || typeof fairShare == "string")
				{
					this.fairShare = [fairShare, fairShare, fairShare, fairShare];
				}
				else if (typeof fairShare == "object" && fairShare !== null)
				{
					this.fairShare = fairShare;
				}
				//TODO: Cache this instead
				// Else, calculate FS inline


				// Calculate Target
				if (typeof target == "number" || typeof target == "string")
				{
					this.target = [target, target, target, target];
				}
				else if (typeof target == "object" && target !== null)
				{
					this.target = target;
				}
				//TODO: Cache this instead
				// Else, calcuate Target inline

			},
			
			// Get or calculate fair share for a given difficulty raid. 
			// Can be int or String (usually, if applicable, "Unknown")
			/*public int or String*/
			getFairShare: function (difficulty)
			{
				var fs = 0;
				
				// If there is a hardcoded fair share, use that
				if (typeof this.fairShare != "undefined")
				{
					fs = this.fairShare[difficulty-1];
				}
				// IF there is no hardcoded fair share, calculate it
				// Also, we must have healths, difficulty, and size to calculate it
				else if (typeof difficulty != "undefined" 
					  && typeof this.size == "number" 
					  && typeof this.getHealth(difficulty) == "number")
				{
					fs = this.getHealth(difficulty) / this.size;
				}
				
				return fs;
			},
			
			// Get pretty text for fair share
			/*public String*/
			getFairShareText: function(difficulty)
			{
				var fs = this.getFairShare(difficulty);
				
				return DC_LoaTS_Helper.prettyFormatNumber(fs);
			},
			
			// Get pretty text for target damange
			/*public String*/
			getTargetDamageText: function(difficulty)
			{
				var target = 0;
				
				// If non-standard target damage is set
				if (typeof this.target != "undefined")
				{
					target = this.target[difficulty-1];
				}
				// Otherwise assume usual calculation of target
				else
				{
					target = this.getFairShare(difficulty) * RaidType.targetDamageModifier[this.size];
				}
				
				return DC_LoaTS_Helper.prettyFormatNumber(target);
			},
			
			// Returns the int of the health or specified String (usually, if applicable, it's "Unknown")
			/*public int or String*/
			getHealth: function(difficulty)
			{
				return this.health[difficulty-1];
			},
			
			// Returns the health of the raid as friendly text
			/*public String*/
			getHealthText: function(difficulty)
			{
				var health = this.getHealth(difficulty);
				return (typeof health == "number")?DC_LoaTS_Helper.prettyFormatNumber(health):health;
			},
			
			// Returns the duration of the raid as text
			/*public String*/
			getTimeText: function()
			{
				return this.time + "H";
			},
			
			// Returns a combination of all acceptable names for the raid
			// So that the string can be searched
			/*public String*/
			getSearchableName: function()
			{
				return this.fullName + "_" + this.shortName + "_" + this.colloqName;
			},
			
			// Gets a big descriptive block of text for the raid
			// Difficulty is optional. If provided, narrows down output, otherwise gives all
			/*public String*/ 
			getVerboseText: function(difficulty)
			{
				// Put the name, size, and stat facts into the string
				var text = "<b title=\"" + this.id + "\">" + this.fullName + "</b> \n";
				text += "Raid Size: " + this.size + " \n";
				text += "Stat(s) Used: " + this.stat + " \n";
				text += "Duration: " + this.getTimeText() + " \n";
				text += "Zone: " + this.zone + "\n";

				// If the user passed in difficulty 0, they only want the above listed stuff
				if (difficulty != 0)
				{
					var difficulties;
					
					// If we're focusing on a single difficulty
					if (typeof difficulty != "undefined")
					{
						difficulties = [difficulty];
						
					}
					// If we didn't get a single difficulty, show all difficulties
					else
					{
						difficulties = [1, 2, 3, 4];
					}
					
					// For each of the difficulties we're addressing
					for (var i = 0; i < difficulties.length; i++)
					{
						var d = difficulties[i];
						
						if (difficulties.length > 1)
						{
							text += "\n--\n";
						}
						
						// Get text for the difficulty
						var diffText = RaidType.difficulty[d];
	
						if (typeof diffText == "undefined")
						{
							diffText = "Unknown";
						}
						
						var healthText = DC_LoaTS_Helper.prettyFormatNumber(this.getHealth(d));
						
						// Display the difficulty, health, fs, and target damage
						text += "Difficulty: " + diffText + " \n";
						text += "Health: " + healthText + " \n";
						text += "<acronym title=\"FS = Fair Share (of damage) = Raid Health (" + healthText + 
								") / Raid Size (" + this.size + ")\">FS</acronym>: " + this.getFairShareText(d) + " \n";
						text += "<span class=\"abbr\" title=\"Target Damage is FS * Raid Size Multiplier. The multiplier is calculated from user tests in the spreadsheet.\">Target</span>: " +  this.getTargetDamageText(d);
	
					}
				}
				
				return text;
			},
			
		});// End RaidType Class
		
		// List of possible difficulties, anything else will show up as Unknown
		RaidType.difficulty = {1: "Normal", 2: "Hard", 3: "Legendary", 4: "Nightmare"};
		
		// List of possible short name difficulties, anything else will show up as Unknown
		RaidType.shortDifficulty = {1: "N", 2: "H", 3: "L", 4: "NM"};
		
		// List of how much each difficulty modifies the base HP of the raid
		RaidType.difficultyHealthFactor = {1: 1, 2: 1.25, 3: 1.6, 4: 2};
		
		// List of *FS modifiers for Target Damage based on raid size.
		// From the raid spreadsheet:
		//		https://docs.google.com/spreadsheet/ccc?key=0AoPyAHGDsRjhdGYzalZZdTBpYk1DS1M3TjVvYWRwcGc&hl=en_US#gid=4
		RaidType.targetDamageModifier = {10: 1.25, 50: 2.2, 100: 2.3, 250: 1, 500: 1.5};

