var exerciseTime = [
	{minutes: '0', seconds: '3'},
	{minutes: '1', seconds: '00'},
	{minutes: '1', seconds: '30'},
	{minutes: '2', seconds: '00'},
	{minutes: '2', seconds: '30'},
	{minutes: '3', seconds: '00'}
];
var exerciseRest = [
	{minutes: '0', seconds: '2'},
	{minutes: '0', seconds: '15'},
	{minutes: '0', seconds: '30'},
	{minutes: '0', seconds: '45'},
	{minutes: '1', seconds: '00'},
	{minutes: '2', seconds: '00'}
];
var restRound = [
	{minutes: '0', seconds: '5'},
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
		var workoutData = setWorkout();
		TimeSlider.Start(workoutData);
		$('#start').attr('disabled', true);
	});
	$('#stop').click(function() {
		TimeSlider.Stop();
		$('#start').attr('disabled', false);
	});
});

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
	var	exerciseTimeI   = $('#exerciseTime option:selected').val(),
		exerciseRestI   = $('#exerciseRest option:selected').val(),
		restRoundI      = $('#restRound option:selected').val(),
		rounds          = $('#rounds option:selected').val(),
		exercises       = $('#exercises option:selected').val();

	return new WorkoutData(	rounds,
							exercises,
							exerciseTime[exerciseTimeI],
							exerciseRest[exerciseRestI],
							restRound[restRoundI]
							);
}