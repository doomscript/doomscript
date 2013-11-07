    /************************************/
    /****** RaidMonitorTools Class ******/
    /************************************/

    window.RaidMonitorTools = Class.create({

        sizes: ["Small", "Medium", "Large", "Epic", "Colossal"],
        blocks: {},


        initialize: function()
        {
            var mg = $("maingame"),
                sizes = this.sizes,
                i;

            // Create the overall block
            var rmBlock = document.createElement("div");
            rmBlock.className = "RaidMonitor-Block";

            rmBlock.style.top = mg.offsetTop + mg.offsetHeight - 350 + "px";
            rmBlock.style.left = mg.offsetLeft + mg.offsetWidth + "px";

            for (i = 0; i < sizes.length; i++) {
                rmBlock.appendChild(this._createBlock(sizes[i]));
            }

            rmBlock.appendChild(this._createBlock("Settings"));
            rmBlock.appendChild(this._createBlock("Help"));

            document.body.appendChild(rmBlock);
            this.rmBlock = rmBlock;
        },

        _createBlock: function(size) {
            var sizeBlock, sizeBlockInner, contents, icon;
            sizeBlock = document.createElement("div");
            sizeBlock.className = "RaidMonitor-SizeBlock RaidMonitor-SizeBlock-" + size;

            sizeBlockInner = document.createElement("div");
            sizeBlockInner.className = "RaidMonitor-SizeBlockInner";
            sizeBlock.appendChild(sizeBlockInner);

            contents = document.createElement("div");
            contents.className = "RaidMonitor-SizeBlockContents";
            sizeBlockInner.appendChild(contents);

            icon = document.createElement("div");
            icon.className = "RaidMonitor-SizeBlockIcon";
            sizeBlockInner.appendChild(icon);

            this.blocks[size] = contents;

            return sizeBlock;
        },

        show: function() {
            this.rmBlock.show();
        }
    });

    RaidMonitorTools.show = function() {
        if (!window.raidMonitorTools) {
            window.raidMonitorTools = new RaidMonitorTools();
            DC_LoaTS_Helper.registerEventHandler(window, "resize", RaidMonitorTools.adjustLocation)
        }
        RaidMonitorTools.adjustLocation();
        raidMonitorTools.show();
    };

    RaidMonitorTools.adjustLocation = function() {
        if (raidMonitorTools) {
            var mg = $("maingame"),
                pos = RaidMonitorTools.getPosition();

            if (pos === "right") {
                raidMonitorTools.rmBlock.style.top = DC_LoaTS_Helper.getRealOffsetTop(mg) + mg.offsetHeight/2 - 200 + "px";
                raidMonitorTools.rmBlock.style.left = mg.offsetLeft + mg.offsetWidth + "px";
                raidMonitorTools.rmBlock.className = raidMonitorTools.rmBlock.className.replace("horizontal", "");
                raidMonitorTools.rmBlock.style.display = "block";
            }
            else if (pos === "bottom") {
                raidMonitorTools.rmBlock.style.top = DC_LoaTS_Helper.getRealOffsetTop(mg) + mg.offsetHeight + "px";
                raidMonitorTools.rmBlock.style.left = mg.offsetLeft + mg.offsetWidth/2 - 200 + "px";
                if (raidMonitorTools.rmBlock.className.indexOf("horizontal") < 0) {
                    raidMonitorTools.rmBlock.className += " horizontal";
                }
                raidMonitorTools.rmBlock.style.display = "block";
            }
            else if (pos === "hidden") {
                raidMonitorTools.rmBlock.style.display = "none";
            }
            else {
                console.log("Did not understand setting position to: " + pos);
            }
        }
    };

    RaidMonitorTools.getPosition = function() {
        return DC_LoaTS_Helper.getPref("RaidMonitorToolsLocation", "right");
    };

    RaidMonitorTools.setLocation = function(location) {
        DC_LoaTS_Helper.setPref("RaidMonitorToolsLocation", location);
        RaidMonitorTools.adjustLocation();
    };

    RaidMonitorTools.refresh = function() {
        var i, size, cooldown, block, blockp;
        for (i = 0; i < raidMonitorTools.sizes.length; i++) {
            size = raidMonitorTools.sizes[i];
            cooldown = RaidMonitorAPI.cooldowns[size];
            block = raidMonitorTools.blocks[size];
            blockp = block.parentNode;

            // Empty out the contents block for regeneration
            $(block).empty();
            console.log("Refreshing cooldown: ", size, cooldown, block);
            // If there's a cooldown object
            if (cooldown) {
                var parts = cooldown.lastUpdateTime.split(" ");
                var sdd = parts[0].split("-");
                var sdt = parts[1].split(":");

                cooldown.lastUpdate = new Date(sdd[0], sdd[1]-1, sdd[2], sdt[0], sdt[1], sdt[2]);
                cooldown.endDate = new Date(cooldown.lastUpdate.getTime() + (cooldown.cooldown + RaidMonitorAPI.wiggleRoom)*60*60*1000);

                var cdPreface = "";

                if (cooldown.dead === 'Yes') {
                    console.log("Cooldown: ", cooldown, "Behind? ", (cooldown.endDate < new Date())?"Yes":"No");
                    if (cooldown.endDate < new Date()) {
                        if (blockp.className.indexOf("behind") < 0) {
                            blockp.className += " behind";
                        }
                        cdPreface = "Access Expired ";
                    }
                    else {
                        if (blockp.className.indexOf("behind") >= 0) {
                            blockp.className = blockp.className.replace("behind", "");
                        }
                        cdPreface = "Access Expires ";
                    }
                }
                // Not dead and cooldown obj does exist
                else {
                    if (blockp.className.indexOf("behind") >= 0) {
                        blockp.className = blockp.className.replace("behind", "");
                    }
                    cdPreface = "Access Expired ";
                }

                var cd = document.createElement("p");
                cd.appendChild(document.createTextNode(cdPreface + moment(cooldown.endDate).fromNow()));
                block.appendChild(cd);

                var lastSummon = document.createElement("p");
                lastSummon.appendChild(document.createTextNode("Last Summoned: " + DC_LoaTS_Helper.raids[cooldown.boss].shortName));
                block.appendChild(lastSummon);
            }
            // No raids ever summoned in this category
            else {
                if (blockp.className.indexOf("behind") < 0) {
                    blockp.className += " behind";
                }
                var lastSummon = document.createElement("p");
                lastSummon.appendChild(document.createTextNode("You haven't posted any raids!"));
                block.appendChild(lastSummon);
            }
        }
    };