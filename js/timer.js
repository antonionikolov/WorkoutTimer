$(document).ready(function() {
	var workoutTime = [
		{minutes: '0', seconds: '30'},
		{minutes: '1', seconds: '00'},
		{minutes: '1', seconds: '30'},
		{minutes: '2', seconds: '00'},
		{minutes: '2', seconds: '30'},
		{minutes: '3', seconds: '00'}
	];
	var restTime = [
		{minutes: '0', seconds: '10'},
		{minutes: '0', seconds: '15'},
		{minutes: '0', seconds: '30'},
		{minutes: '0', seconds: '45'},
		{minutes: '1', seconds: '00'},
		{minutes: '2', seconds: '00'}
	];
	setTimeInterval(workoutTime, '#time');
	setTimeInterval(restTime, '#timeRest');
	$('#time').change(function() {
		var i = $(this).val();
		$('#timer').text(workoutTime[i].minutes + ':' + workoutTime[i].seconds);
	});
	$('#start').click(function() {
		var selectedTimer = $('#time option:selected').val();
		var selectedRest = $('#timeRest option:selected').val();
		var workoutDuration = [
			workoutTime[selectedTimer],
			restTime[selectedRest],
			workoutTime[selectedTimer],
			restTime[selectedRest],
			workoutTime[selectedTimer]
		];
		Slider.Start(workoutDuration);
		$('#start').attr('disabled', true);
	});
	$('#stop').click(function() {
		Slider.Stop();
		$('#start').attr('disabled', false);
	});
});

var Slider = {
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

function setTimeInterval(intervals, id) {
	for (var i = 0; i < intervals.length; i++) {
		$(id).append("<option value=" + i + ">" + intervals[i].minutes + ":" + intervals[i].seconds + "</option>");
	}
}