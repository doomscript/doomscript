		RaidCommand.create( 
			{
				commandName: "farmvalue",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};

					var farmText = "<table>";
					farmText += "<tr><th>Stamina Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Void Killer</td><td>19.8</td><td>6.6</td></tr>";
					farmText += "<tr><td>Ragebeasts</td><td>12.6</td><td>6.3</td></tr>";
					farmText += "<tr><td>Telemachus</td><td>11.0</td><td>3.7</td></tr>";
					farmText += "<tr><td>CC Colonel</td><td>9.3</td><td>2.3</td></tr>";
					farmText += "<tr><td>Supreme Cybertollahs</td><td>8.4</td><td>2.1</td></tr>";
					farmText += "<tr><td>Carnus</td><td>6.6</td><td>2.6</td></tr>";
					farmText += "<tr><td>Carnifex</td><td>6.3</td><td>2.5</td></tr>";
					farmText += "<tr><td>Rautha</td><td>5.9</td><td>1.5</td></tr>";
					farmText += "<tr><td>Vespasia's Android</td><td>5.6</td><td>1.6</td></tr>";
					farmText += "<tr><td>CC Cruiser</td><td>5.3</td><td>1.3</td></tr>";
					farmText += "<tr><td>Assassin</td><td>4.5</td><td>1.4</td></tr>";
					farmText += "<tr><td>Vorden</td><td>4.2</td><td>1.4</td></tr>";
					farmText += "<tr><td>CC General</td><td>4.0</td><td>1.0</td></tr>";
					farmText += "<tr><td>Warmaster </td><td>3.7</td><td>0.8</td></tr>";
					farmText += "<tr><td>Robotic Rautha</td><td>3.7</td><td>0.9</td></tr>";
					farmText += "<tr><td>CC Sentinel</td><td>3.4</td><td>0.8</td></tr>";
					farmText += "<tr><td>Mermara</td><td>3.3</td><td>0.7</td></tr>";
					farmText += "<tr><td>Purple Lion</td><td>3.2</td><td>1.1</td></tr>";
					farmText += "<tr><td>Cybersmash</td><td>3.1</td><td>1.0</td></tr>";
					farmText += "<tr><td>Blood Alley Gang</td><td>2.8</td><td>0.9</td></tr>";
					farmText += "<tr><td>Tulk</td><td>2.2</td><td>0.6</td></tr>";
					farmText += "<tr><td>Scarlet Harlot</td><td>2.0</td><td>0.6</td></tr>";
					farmText += "<tr><td>Agony Ecstacy</td><td>1.8</td><td>0.7</td></tr>";
					farmText += "<tr><td>Sludge Serpent</td><td>1.8</td><td>0.7</td></tr>";
					farmText += "<tr><td>Lupin</td><td>1.7</td><td>0.7</td></tr>";
					farmText += "<tr><td>Mercury</td><td>1.6</td><td>0.6</td></tr>";
					farmText += "<tr><td>Storm Commander</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Sun-Xi</td><td>1.5</td><td>0.6</td></tr>";
					farmText += "<tr><td>Lt. Targe</td><td>1.4</td><td>0.6</td></tr>";
					farmText += "<tr><td>Guldax Quibberath</td><td>1.4</td><td>0.5</td></tr>";
					farmText += "<tr><td>Warden Ramiro</td><td>1.3</td><td>0.5</td></tr>";
					farmText += "<tr><td>Nemo</td><td>1.3</td><td>0.5</td></tr>";
					farmText += "<tr><td>Vulture Gunship</td><td>1.2</td><td>0.5</td></tr>";
					farmText += "<tr><td>Caligula</td><td>1.2</td><td>0.4</td></tr>";
					farmText += "<tr><td>Dule's</td><td>0.3</td><td>0.1</td></tr>";
					farmText += "<tr><td>Sigurd</td><td>3.2</td><td>1.6</td></tr>";
					farmText += "<tr><td>Fleet Com.</td><td>2.8</td><td>1.4</td></tr>";
					farmText += "<tr><td>Reaver</td><td>3.1</td><td>1.6</td></tr>";
					farmText += "<tr><td>Councilor</td><td>1.6</td><td>0.8</td></tr>";
					farmText += "<tr><td>Centurian Commander</td><td>0.0</td><td>0.0</td></tr>";
					farmText += "<tr><td></td><td></td><td></td></tr>"
					farmText += "<tr><th>Energy Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Vince Vortex</td><td>1.7</td><td>0.3</td></tr>";
					farmText += "<tr><td></td><td></td><td></td></tr>"
					farmText += "<tr><th>Honor Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Krakak Swarm</td><td>5.6</td><td>1.9</td></tr>";
					farmText += "<tr><td>Infected Squad</td><td>4.4</td><td>1.3</td></tr>";
					farmText += "<tr><td>Flying Saucers</td><td>4.0</td><td>1.6</td></tr>";
					farmText += "<tr><td>Lurking Horror</td><td>3.7</td><td>0.9</td></tr>";
					farmText += "<tr><td>Kang</td><td>3.4</td><td>1.0</td></tr>";
					farmText += "<tr><td>Tourniquet 7</td><td>2.4</td><td>0.9</td></tr>";
					farmText += "<tr><td>Ship of the Damned</td><td>2.3</td><td>0.8</td></tr>";
					farmText += "<tr><td>Wyrm</td><td>2.0</td><td>0.7</td></tr>";
					farmText += "<tr><td>Death Flora</td><td>1.9</td><td>0.6</td></tr>";
					farmText += "<tr><td>Crossbones Squadron</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Shadows</td><td>1.4</td><td>0.5</td></tr>";
					farmText += "<tr><td>Mr. Justice</td><td>1.1</td><td>0.3</td></tr>";
					farmText += "<tr><td>Rylattu Exterminators</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Colonel Mustard</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Luna</td><td>1.0</td><td>0.4</td></tr>";
					farmText += "<tr><td>Genesis</td><td>0.9</td><td>0.5</td></tr>";
					farmText += "<tr><td>Grislak</td><td>0.9</td><td>0.3</td></tr>";
					farmText += "<tr><td>Interceptor</td><td>0.9</td><td>0.2</td></tr>";
					farmText += "<tr><td>Peacemaker 500</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Qin Legion</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Juggernaut</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Squid</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Death Squadron</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Devourer</td><td>0.6</td><td>0.2</td></tr>";
					farmText += "<tr><td>Colby</td><td>0.5</td><td>0.2</td></tr>";
					farmText += "<tr><td>Legacy Bot</td><td>0.4</td><td>0.2</td></tr>";
					farmText += "</table>";
					farmText += "<a href=\"" + DC_LoaTS_Properties.farmSpreadsheetURL + "\" target=\"_blank\">Source</a>\n";

					deck.activeDialogue().raidBotMessage(farmText);
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display farm values"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/farmvalue</code>\n";
					helpText += "Displays the farm value of the raids per <a href=\"" + 
								DC_LoaTS_Properties.farmSpreadsheetURL + "\" target=\"_blank\">this spreadsheet</a>\n";
					
					return helpText;
				}
			}
		);
		
