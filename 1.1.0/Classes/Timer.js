		/************************************/
		/********** Timing Utility **********/
		/************************************/
				
		window.Timer = {
			
			start: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					timer = {name: timerName, start: 0, totalTime: 0, longestTime: 0, numTimes: 0};
					window.Timer[timerName] = timer;
				}
				timer.start = new Date()/1;
			},
			
			stop: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					console.log("Can't stop a timer (" + timerName + ") that wasn't started");
				}
				else
				{
					var elapsed = (new Date()/1) - timer.start;
					timer.totalTime += elapsed;
					if (timer.longestTime < elapsed) {timer.longestTime = elapsed;}
					timer.numTimes++;
					timer.start = 0;
				}
			},
			
			getTimer: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					console.log("Can't get a timer (" + timerName + ") that wasn't started");
				}
				else
				{
					timer.getAverage = function()
					{
						return this.totalTime / this.numTimes;
					}.bind(timer);
				}
				
				return timer;
			},
			
			getReport: function()
			{
				var report = "";
				for (var timerName in window.Timer)
				{
					var timer = window.Timer.getTimer(timerName);
					if (typeof timer != "function" && typeof timer != "undefined")
					{
						report += timerName + " > Average: " + timer.getAverage().toFixed(5) + "ms - Total: " + timer.totalTime + "ms - # " + timer.numTimes + "\n\n";
					}
				}
				
				return report;
			},
			
			printReport: function()
			{
				console.log(Timer.getReport());
			}
		};

