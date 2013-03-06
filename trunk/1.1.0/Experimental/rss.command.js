		RaidCommand.create( 
			{
				commandName: "rss",
				aliases: ["forums", "threads", "posts"],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true, statusMessage: "Reading RSS feed..."};

					DC_LoaTS_Helper.ajax({
						url: "http://www.legacyofathousandsuns.com/forum/external.php?type=RSS2",
						onload:function(response) {
							var xmlDoc = (new DOMParser()).parseFromString(response.responseText, "text/xml"),
							    items = xmlDoc.getElementsByTagName("item"),
							    i, item, j, child, threads = [], thread, 
							    str = "Recent posts (as of " + DC_LoaTS_Helper.getCurrentPrettyDate() + ")";
							
							for (i = 0; i < items.length; i++) {
								item = items[i];
                                threads.push({
                                    title: getNodeValue(item, "title"),
                                    url: getNodeValue(item, "link"),
                                    date: getNodeValue(item, "pubDate"),
                                    relativeDate: DC_LoaTS_Helper.timeDifference(new Date()/1, new Date(getNodeValue(item, "pubDate"))/1),
                                    description: getNodeValue(item, "description"),
                                    category: getNodeValue(item, "category"),
                                    categoryUrl: getNodeValue(item, "category", "domain"),
                                    creator: getNodeValue(item, "creator")
                                });
							}

                            function getNodeValue(parent, tagName, attribute) {
                                tags = parent.getElementsByTagNameNS("*", tagName);
                                if (tags && tags[0]) {
                                	if (attribute) {
                                		return tags[0].attributes[attribute].nodeValue;
                                	}
                                	else {
                                		return tags[0].childNodes[0].nodeValue;
                                	}
                                }
                                
                                return "<i>Unable to locate in RSS feed</i>";
                            }

                            for (i = 0; i < threads.length; i++) {
                            	thread = threads[i];
                            	str += "\n--------------------------------------------------\n"
                                str += thread.relativeDate + " ";
                            	str += "<a href='" + thread.categoryUrl + "' target='_blank'>" + thread.category + "</a>";
                            	str += " &gt; <a href='" + thread.url + "' target='_blank'>" + thread.title + "</a>";
                            }
                            
                            holodeck.activeDialogue().raidBotMessage(str);
                            
						} // end onload
					});					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Lists recent threads from the forums"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/threads</code>\n";
					helpText += "Lists recent threads from the forums\n";
					
					return helpText;
				}
			}
		);
		
