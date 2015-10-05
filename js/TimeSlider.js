var TimeSlider = {
	slider: null,
	Start: function(workoutDuration) {
		var singleTimer = workoutDuration.pop();
		var minutes = singleTimer.minutes;
		var seconds = singleTimer.seconds;
		this.slider = setInterval(function(){ myTimer() }, 1000);
		$('#timer').text(minutes + ':' + seconds);
		var that = this;
		function myTimer() {
			if ( workoutDuration.length == 0 && minutes == 0 && seconds == 0) {
				that.Stop();
				$('#start').attr('disabled', false);
			} else if (minutes == 0 && seconds == 0) {
				singleTimer = workoutDuration.pop();
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