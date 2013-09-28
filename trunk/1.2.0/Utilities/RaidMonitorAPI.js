
// Manage data related to the Raid Monitor API
window.RaidMonitorAPI = {

    lastQueryTimeKey: DC_LoaTS_Properties.storage.raidMonitorLastQueryTime,
    useQueryTimeDeltaPrefKey: "UseQueryTimeDelta",

    baseUrl: "http://getKongE.org/games/lots/raids/",
    raidListUrl: "?format=json&since=%TIME%&agent=ds_%VERSION%",

    setLastQueryTime: function(lastQueryTime) {
        GM_setValue(this.lastQueryTimeKey, lastQueryTime);
    },

    getRaidListUrl: function() {
        var raidListUrl = this.baseUrl + this.raidListUrl;
        raidListUrl = raidListUrl.replace("%TIME%", this.getRaidListQueryHours());
        raidListUrl = raidListUrl.replace("%VERSION%", this.getVersionString());
        return raidListUrl;
    },

    getVersionString: function() {
        return this.versionString || (this.versionString = DC_LoaTS_Properties.version.toString().replace(/\./g, ""));
    },

    getRaidListQueryHours: function()
    {
        return DC_LoaTS_Helper.getPref(this.useQueryTimeDeltaPrefKey, true) ? this.getHoursSinceLastQuery() : 168;
    },

    getHoursSinceLastQuery: function() {
        var elapsedMs = new Date()/1 - GM_getValue(this.lastQueryTimeKey, 0);
        elapsedHrs = elapsedMs / 1000 / 60 / 60; // Convert ms to hours
        return Math.min(168, Math.ceil(elapsedHrs * 1000)/1000); // Round to 3 decimals, take 168 or lower
    }
};
		
