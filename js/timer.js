var exerciseTime = [
	{minutes: '0', seconds: '30'},
	{minutes: '1', seconds: '00'},
	{minutes: '1', seconds: '30'},
	{minutes: '2', seconds: '00'},
	{minutes: '2', seconds: '30'},
	{minutes: '3', seconds: '00'}
];
var exerciseRest = [
	{minutes: '0', seconds: '10'},
	{minutes: '0', seconds: '15'},
	{minutes: '0', seconds: '30'},
	{minutes: '0', seconds: '45'},
	{minutes: '1', seconds: '00'},
	{minutes: '2', seconds: '00'}
];
var restRound = [
	{minutes: '0', seconds: '30'},
	{minutes: '1', seconds: '00'},
	{minutes: '1', seconds: '30'},
	{minutes: '2', seconds: '00'},
	{minutes: '3', seconds: '00'},
	{minutes: '4', seconds: '00'}
];

$(document).ready(function() {
	setTimeInterval(exerciseTime, '#exerciseTime');
	setTimeInterval(exerciseRest, '#exerciseRest');
	setTimeInterval(restRound, '#restRound');
	setCount(10, '#rounds');
	setCount(10, '#exercises');
	$('#exerciseTime').change(function() {
		var i = $(this).val();
		$('#timer').text(exerciseTime[i].minutes + ':' + exerciseTime[i].seconds);
	});
	$('#start').click(function() {
		var workoutDuration = setWorkout();
		console.log(workoutDuration);
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

function setCount(to, id) {
	for (var i = 1; i < to + 1; i++) {
		$(id).append("<option value=" + i + ">" + i + "</option>");
	}
}

function setWorkout() {
	var workoutDuration = [],
		exerciseTimeI = $('#exerciseTime option:selected').val(),
		exerciseRestI = $('#exerciseRest option:selected').val(),
		restRoundI = $('#restRound option:selected').val(),
		rounds = $('#rounds option:selected').val(),
		exercises = $('#exercises option:selected').val();

	for (var i = 0; i < rounds; i++) {
		for (var j = 0; j < exercises; j++) {
			workoutDuration.push(exerciseTime[exerciseTimeI]);
			workoutDuration.push(exerciseRest[exerciseRestI]);
		}
		workoutDuration.pop();
		workoutDuration.push(restRound[restRoundI]);
	}
	workoutDuration.pop();
	console.log(workoutDuration);
	return workoutDuration;
}