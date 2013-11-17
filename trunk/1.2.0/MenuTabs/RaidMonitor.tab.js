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
            var wrapper = document.createElement("div");
            var me = this;




            this.pane.appendChild(wrapper);
        }

    });
		
