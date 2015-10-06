var TimeSlider = {
	slider: null,
	Start: function(workoutData) {
		var singleTimer = workoutData.next();
		var minutes = singleTimer.minutes;
		var seconds = singleTimer.seconds;
		this.slider = setInterval(function(){ myTimer() }, 1000);
		$('#timer').text(minutes + ':' + seconds);
		var that = this;
		function myTimer() {
			if ( workoutData.empty() && minutes == 0 && seconds == 0) {
				that.Stop();
				$('#start').attr('disabled', false);
			} else if (minutes == 0 && seconds == 0) {
				singleTimer = workoutData.next();
				minutes = singleTimer.minutes;
				seconds = singleTimer.seconds;
			} else if (seconds == 0) {
				minutes -= 1;
				seconds = 59;
			} else {
				seconds -= 1;
			}
			$('#timer').text(minutes + ':' + seconds);
		}
	},
	Stop: function() {
		window.clearTimeout(this.slider);
	}
};