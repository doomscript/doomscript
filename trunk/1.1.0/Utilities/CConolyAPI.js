		
		// Manage data related to the CConoly API
		window.CConolyAPI = {
				
			lastQueryTimeKey: DC_LoaTS_Properties.storage.cconolyLastQueryTime,
			useQueryTimeDeltaPrefKey: "UseQueryTimeDelta",
			
			baseUrl: "http://cconoly.com/lots/",
			markDeadUrl: "markDead.php?kv_raid_id=%RAID_ID%&doomscript=%VERSION%",
			raidListUrl: "raidlinks.php?hrs=%TIME%&doomscript=%VERSION%",
			
			setLastQueryTime: function(lastQueryTime) {
				GM_setValue(this.lastQueryTimeKey, lastQueryTime);
			},
			
			getMarkDeadUrl: function(raidID) {
				var reportUrl = this.baseUrl + this.markDeadUrl;
				reportUrl = reportUrl.replace("%RAID_ID%", raidID);
				reportUrl = reportUrl.replace("%VERSION%", this.getVersionString());
				return reportUrl;
			},
			
			getRaidListUrl: function() {
				var raidListUrl = this.baseUrl + this.raidListUrl;
				raidListUrl = raidListUrl.replace("%TIME%", this.getRaidListQueryHours());
				raidListUrl = raidListUrl.replace("%VERSION%", this.getVersionString());
				return raidListUrl;
			},
			
			getVersionString: function() {
				return DC_LoaTS_Properties.version.toString().replace(/\./g, "");
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
		
