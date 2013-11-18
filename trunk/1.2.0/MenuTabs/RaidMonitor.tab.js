/************************************/
/********* Preferences Tab **********/
/************************************/

    // Class to manage a tab in the raid tab in the popup menu
RaidMenuTab.create(
    {
        tabName: "Raid Monitor",
        tabPosition: 70,

        initPane: function()
        {
            var wrapper = document.createElement("div"),
                me = this,
                lists = DC_LoaTS_Helper.getRaidMonitorLists(),
                i;

            for (i = 0; i < lists.length; i++) {
                var list = lists[i];
                wrapper.appendChild(this.createRow(i, list));
            }



            this.pane.appendChild(wrapper);
        },

        createRow: function(rowId, listElem) {

        }

    });
		
