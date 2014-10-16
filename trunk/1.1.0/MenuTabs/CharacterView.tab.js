        /************************************/
        /*********** Styles Tab *************/
        /************************************/

		RaidMenuTab.create(
			{
				tabName: "Profile View",
				tabHeader: "UGUP Character Profile Viewer",
				tabPosition: 40,

				initPane: function()
				{
                    var wrapper = document.createElement("div");

                    var entryArea = document.createElement("div");
                    entryArea.id = "CharacterViewMenu-EntryArea";

                    var usernameLabel = document.createElement("label");
                    usernameLabel.id = "CharacterViewMenu-UsernameLabel";
                    usernameLabel.appendChild(document.createTextNode("Username: "));
                    usernameLabel.title = "This is the name of the user on their platform, not their in game character name";

                    var usernameBox = document.createElement("input");
                    usernameBox.type = "text";
                    usernameBox.id = "CharacterViewMenu-UsernameBox";

                    usernameLabel.appendChild(usernameBox);
                    entryArea.appendChild(usernameLabel);

                    var platformPicker = document.createElement("select");
                    platformPicker.id = "CharacterViewMenu-PlatformSelect";

                    var opt;
                    for (var platform in UGUP.PLATFORM) {
                        if (UGUP.PLATFORM.hasOwnProperty(platform) && typeof UGUP.PLATFORM[platform] !== "function") {
                            opt = document.createElement("option");
                            opt.value = platform;
                            opt.appendChild(document.createTextNode(UGUP.PLATFORM[platform].name));
                            opt.platform = UGUP.PLATFORM[platform];
                            platformPicker.appendChild(opt);
                        }
                    }

                    platformPicker.value = "KONG";

                    entryArea.appendChild(platformPicker);

                    var connector = DC_LoaTS_Helper.getUGUPConnector(null, UGUP.PLATFORM.KONG);
                    var renderArea = document.createElement("div");
                    renderArea.id = "CharacterViewMenu-RenderArea";

                    var runQueryButton = document.createElement("button");
                    runQueryButton.appendChild(document.createTextNode("Lookup User Profile"));
                    runQueryButton.id = "CharacterViewMenu-RunQueryButton";
                    runQueryButton.className = "CharacterViewMenu-Button";
                    runQueryButton.onclick = function() {
                        console.log("Running User Profile Lookup", this, arguments);
                        var platformOpt = platformPicker.selectedOptions[0],
                            username = usernameBox.value.trim();

                        DC_LoaTS_Helper.removeAllChildren(renderArea);
                        var loadingImg = document.createElement("img");
                        loadingImg.id = "CharacterViewMenu-RenderLoadingImg";
                        loadingImg.src = "http://i.imgur.com/NyArTaF.gif";
                        renderArea.appendChild(loadingImg);

                        connector.cfg.platform = platformOpt.platform;
                        console.log("About to fetch profile by username", connector);

                        connector.fetchUserProfileByUsername(username, function(response, model) {
                            console.log("Fetched Profile: ", response, model);
                            model._modelType.render(model, connector, function(el){
                                console.log("Rendered Profile", el);
                                DC_LoaTS_Helper.removeAllChildren(renderArea);
                                renderArea.appendChild(el);
                            });
                        });
                    };
                    entryArea.appendChild(runQueryButton);
                    wrapper.appendChild(entryArea);

                    var facebookLookupLink = document.createElement("a");
                    facebookLookupLink.href = "http://findmyfacebookid.com/";
                    facebookLookupLink.target = "_blank";
                    facebookLookupLink.appendChild(document.createTextNode("Lookup a Facebook Username (id) from Profile Url"));
                    wrapper.appendChild(facebookLookupLink);

                    wrapper.appendChild(renderArea);

                    this.pane.appendChild(wrapper);
                }
		});

