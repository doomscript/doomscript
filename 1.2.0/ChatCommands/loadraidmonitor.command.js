        // Load RaidMonitor command
        RaidCommand.create(
            {
                commandName: "loadraidmonitor",
                aliases: ["loadrm", "lrm", "raidmonitor", "rm", "loadraidmonitorraids", "loadrmraids"],
                parsingClass: RaidFilter,

                paramText: "[filter]",

                handler: function(deck, parser, params, text, context)
                {
                    var ret = {success: true};
                    DC_LoaTS_Helper.ajax({
                        url: "http://getKongE.org/games/lots/raids?format=json&",
                        onload: function(response) {
                            var message;
                            if (response.status === 200) {
                                var resp = JSON.parse(response.responseText),
                                    raids = resp.raids;

                                if (false === resp.success) {
                                    holodeck.activeDialogue().raidBotMessage("Error loading from RaidMonitor: " +
                                        resp.error);
                                }
                                else {
                                    var buckets = {
                                        private: {
                                            header: "Private Raids",
                                            key: "PrivateRaid",
                                            raids: []
                                        },
                                        alliance: {
                                            header: "AAL Raids",
                                            key: "AllianceRaid",
                                            raids: []
                                        },
                                        public: {
                                            header: "Public Raids",
                                            key: "PublicRaid",
                                            raids: []
                                        }
                                    };

                                    var i, raid;
                                    for (i in raids) {
                                        if (!raids.hasOwnProperty(i)) continue;
                                        raid = raids[i];
                                        raid.def = DC_LoaTS_Helper.raidDefs[raid.boss];

                                        if (!raid.def) {
                                            console.log("No def", i, raid);
                                        }

                                        if (raid.def && "Alliance" === raid.def.type) {
                                            buckets.alliance.raids.push(raid);
                                        }
                                        else if (!raid.pass) {
                                            buckets.public.raids.push(raid);
                                        }
                                        else {
                                            buckets.private.raids.push(raid);
                                        }
                                    }

                                    var processBucket = function(bucket) {
                                        var matchedRaids = [];
                                        for (i in bucket.raids) {
                                            if (!bucket.raids.hasOwnProperty(i)) continue;
                                            raid = bucket.raids[i];

                                            var now = new Date();
                                            var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                                            var remainingSecs = -1,
                                                elapsedSecs = -1;

                                            if (raid.summonDate && raid.def) {
                                                var summonDateParts = raid.summonDate.split(" ");
                                                var sdd = summonDateParts[0].split("-");
                                                var sdt = summonDateParts[1].split(":");

                                                var totalSecs = raid.def.duration*60*60;
                                                elapsedSecs = Math.ceil((now_utc - new Date(sdd[0], sdd[1]-1, sdd[2], sdt[0], sdt[1], sdt[2])) / 1000);
                                                remainingSecs = totalSecs - elapsedSecs;
                                            }

                                            var dcRaidDef = DC_LoaTS_Helper.raids[raid.boss];
                                            if (parser.matches({
                                                age: elapsedSecs,
                                                difficulty: raid.diff,
                                                fs:  dcRaidDef.getFairShare(raid.diff),
                                                os:  dcRaidDef.getOptimalShare(raid.diff),
                                                name: dcRaidDef.getSearchableName(),
                                                size: dcRaidDef.size,
                                                zone: dcRaidDef.zone
                                            })) {
                                                matchedRaids.push(raid);
                                            }
                                        }

                                        var joinResults = {joined: 0, visited: 0, dead: 0, invalid: 0};

                                        function loadMatchedRaids() {
                                            if (matchedRaids.length > 0) {
                                                raid = matchedRaids.pop();
                                                DC_LoaTS_Helper.ajax({
                                                    url: DC_LoaTS_Properties.joinRaidURL + "?kongregate_user_id=" + active_user.id() + "&kongregate_game_auth_token=" + active_user.gameAuthToken() + "&kv_raid_id=" + raid.raid_id + "&kv_hash=" + raid.hash,
                                                    onload: function(response) {
                                                        var responseText = response.responseText;
                                                        if (responseText.indexOf("You have successfully joined the raid!") >= 0 || responseText.indexOf("You have successfully re-joined the raid!") >= 0)
                                                        {
                                                            // Joined
                                                            joinResults.joined++;
                                                        }
                                                        else if (responseText.indexOf("You are already a member of this raid!") >= 0)
                                                        {
                                                            // Already visited / rejoined
                                                            joinResults.visited++;
                                                        }
                                                        else if (responseText.indexOf("This raid is already completed!") >= 0)
                                                        {
                                                            // Raid is dead
                                                            joinResults.dead++;
                                                        }
                                                        else
                                                        {
                                                            // Invalid response (bad hash, wrong alliance, or otherwise broken link)
                                                            joinResults.invalid++;
                                                        }
                                                        setTimeout(loadMatchedRaids, 10);
                                                    }
                                                });
                                            }
                                            else {
                                                var msg = "Raid Monitor loading results for " + bucket.header + ":";
                                                msg += "\nJoined: " + joinResults.joined;
                                                msg += "\nVisited: " + joinResults.visited;
                                                msg += "\nDead: " + joinResults.dead;
                                                msg += "\nInvalid: " + joinResults.invalid;

                                                holodeck.activeDialogue().raidBotMessage(msg);
                                            }
                                        }

                                        loadMatchedRaids();
                                    };

                                    processBucket(buckets.private);
                                    processBucket(buckets.alliance);

                                    // TODO: For now, don't worry about public raids
                                    //processBucket(buckets.public);
                                }
                            }
                            else if (response.status > 200 && response.status < 400) {
                                message = "No new raids was returned."
                            }
                            else {
                                message = "Unable to retrieve raids. (status: " + response.status + ")";
                            }

                            if (message && holodeck.activeDialogue()) {
                                holodeck.activeDialogue().raidBotMessage(message);
                            }
                        }
                    });
                    return ret;
                },


                getOptions: function()
                {
                    var commandOptions = {
                        initialText: {
                            text: "Load RaidMonitor raids"
                        }
                    };

                    return commandOptions;
                },

                buildHelpText: function()
                {
                    var helpText = "<b>Raid Command:</b> <code>/loadraidmonitor</code>\n";

                    return helpText;
                }
            }
        );