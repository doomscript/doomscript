		/************************************/
		/********** Formatting Tab **********/
		/************************************/
		
		// Class to manage the formatting tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Formatting",
				tabPosition: 30,
				
				initPane: function()
				{
					var messageFormatHeader = document.createElement("h2");
					messageFormatHeader.className = "RaidMenuTab-SectionHeader";
					messageFormatHeader.update("Message Format");
					this.pane.appendChild(messageFormatHeader);
					
					var messageFormatDescription = document.createElement("p");
					messageFormatDescription.className = "RaidMenuTab-SectionDescription";
					messageFormatDescription.update("The format of raid links as they will appear in chat.");
					this.pane.appendChild(messageFormatHeader);
					
					this.messageFormatTextArea = document.createElement("textarea");
					this.messageFormatTextArea.id = "FormattingTab-MessageFormatTextArea";
					this.messageFormatTextArea.setAttribute("placeholder", RaidLink.defaultMessageFormat);
					this.currentMessageFormat = DC_LoaTS_Helper.getMessageFormat();
					this.messageFormatTextArea.value = this.currentMessageFormat.replace("{line}", "\n");
					DC_LoaTS_Helper.registerEventHandler(this.messageFormatTextArea, "input", this.handleMessageFormatInput.bind(this));
					this.pane.appendChild(this.messageFormatTextArea);					
					
					var saveButton = document.createElement("button");
					saveButton.update("Save");
					saveButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(saveButton, "click", 
						function()
						{
							holodeck.processChatCommand("/raidformat " + this.currentMessageFormat);
						}.bind(this)
					);
					this.pane.appendChild(saveButton);
					
					var cancelButton = document.createElement("button");
					cancelButton.update("Cancel");
					cancelButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(cancelButton, "click", 
						function()
						{
							this.currentMessageFormat = DC_LoaTS_Helper.getMessageFormat();
							this.messageFormatTextArea.value = this.currentMessageFormat.replace("{line}", "\n");
							this.handleMessageFormatInput();
						}.bind(this)
					);
					this.pane.appendChild(cancelButton);
					
					var defaultButton = document.createElement("button");
					defaultButton.update("Reset to default");
					defaultButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(defaultButton, "click", 
						function()
						{
							holodeck.processChatCommand("/raidformat reset");
						}.bind(this)
					);
					this.pane.appendChild(defaultButton);
					
					
					
					
					
					var samplePostHeader = document.createElement("h2");
					samplePostHeader.className = "RaidMenuTab-SectionHeader";
					samplePostHeader.update("Sample Post");
					samplePostHeader.style.marginTop = "15px";
					this.pane.appendChild(samplePostHeader);

					// --- Sample Link --- \\
					// Create the sample raid link area to display the results of the format
					var raidStorage = RaidManager.fetchStorage();
					
					// Find any valid link to use as a sample
					//TODO: Customizable sample
					for (var id_hash in raidStorage)
					{
						this.sampleRaidLink = raidStorage[id_hash].raidLink;
						var tmpRaid = this.sampleRaidLink.getRaid();
						// Don't sample with invalid links (same full name and id, essentially Unknown raids)
						// Don't pick raids with the same FS and OS (size 250 raids)
						if (tmpRaid.fullName === tmpRaid.id || tmpRaid.size === 250)
						{
							continue;
						}
						break;
					}
					
					// If there wasn't a valid sample in the local storage, generate one
					if (typeof this.sampleRaidLink === "undefined")
					{
						// Will not have state info, though
						this.sampleRaidLink = new RaidLink(9999999999, "hash11hash", 4, "ragebeasts");
					}

					this.messageFormatExampleLinkContainer = document.createElement("div");
					
					var p = document.createElement("p");
					p.className = "even";
					this.messageFormatExampleLinkContainer.appendChild(p);
					
					var username = holodeck._active_user._attributes._object.username;
					var usernameSpan = document.createElement("span");
					usernameSpan.setAttribute("username", username);
					usernameSpan.className = "username chat_message_window_username";
					usernameSpan.update(username);
					p.appendChild(usernameSpan);
					
					var separatorSpan = document.createElement("span");
					separatorSpan.className = "separator";
					separatorSpan.update(": ");
					p.appendChild(separatorSpan);
					
					this.messageSpan = document.createElement("span");
					this.className = "message";
					this.messageSpan.innerHTML = this.sampleRaidLink.getFormattedRaidLink();
					p.appendChild(this.messageSpan);
					
					var clearSpan = document.createElement("span");
					clearSpan.className = "clear";
					p.appendChild(clearSpan);
					
					
					this.pane.appendChild(this.messageFormatExampleLinkContainer);

				},
				
				handleMessageFormatInput: function()
				{
					this.currentMessageFormat = this.messageFormatTextArea.value.replace(/(?:\r\n|\r|\n)/g, "{line}");
					this.messageSpan.innerHTML = this.sampleRaidLink.getFormattedRaidLink(this.currentMessageFormat);
				}
		});
		
