
// Manage data related to the Raid Monitor API
window.RaidMonitorAPI = {

    lastQueryTimeKey: DC_LoaTS_Properties.storage.raidMonitorLastQueryTime,
    useQueryTimeDeltaPrefKey: "UseQueryTimeDelta",

    baseUrl: "http://getKongE.org/games/lots/raids/",
    raidListUrl: "raidPoller.php?age=%AGE%&id=%ID%&hash=%HASH%&agent=ds_%VERSION%",
    cooldownsUrl: "cooldowns.php?username=%USER%",

    wiggleRoom: 2, // Number of hours to allow summons after cooldown expires

    setLastQueryTime: function(lastQueryTime) {
        GM_setValue(this.lastQueryTimeKey, lastQueryTime);
    },

    getRaidListUrl: function() {
        var raidListUrl = this.baseUrl + this.raidListUrl;
        raidListUrl = raidListUrl.replace("%AGE%", this.getRaidListQueryHours());
        raidListUrl = raidListUrl.replace("%VERSION%", DC_LoaTS_Properties.version);
        raidListUrl = raidListUrl.replace("%ID%", active_user.id());
        raidListUrl = raidListUrl.replace("%HASH%", active_user.gameAuthToken());
        return raidListUrl;
    },

    getRaidListQueryHours: function()
    {
        return DC_LoaTS_Helper.getPref(this.useQueryTimeDeltaPrefKey, true) ? this.getHoursSinceLastQuery() : 168;
    },

    getHoursSinceLastQuery: function() {
        var elapsedMs = new Date() - GM_getValue(this.lastQueryTimeKey, 0),
            elapsedHrs = elapsedMs / 1000 / 60 / 60; // Convert ms to hours
        return Math.min(168, Math.ceil(elapsedHrs * 1000)/1000); // Round to 3 decimals, take 168 or lower
    },

    getCooldownsUrl: function() {
        var cooldownsUrl = this.baseUrl + this.cooldownsUrl;
        cooldownsUrl = cooldownsUrl.replace("%USER%", active_user.username());
        return cooldownsUrl;
    }
};
		
