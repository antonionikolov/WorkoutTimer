$(document).ready(function() {
	var avaliableTimers = [
		{minutes: '0', seconds: '30'},
		{minutes: '1', seconds: '00'},
		{minutes: '1', seconds: '30'},
		{minutes: '2', seconds: '00'},
		{minutes: '2', seconds: '30'},
		{minutes: '3', seconds: '00'}
	];
	for (var i = 0; i < avaliableTimers.length; i++) {
		$('#time').append("<option value=" + i + ">" + avaliableTimers[i].minutes + ":" + avaliableTimers[i].seconds + "</option>");
	}
	$('#time').change(function() {
		var i = $(this).val();
		$('#timer').text(avaliableTimers[i].minutes + ':' + avaliableTimers[i].seconds);
	});
	$('#start').click(function() {
		var selectedTimer = $('#time option:selected').val();
		Slider.Start(avaliableTimers[selectedTimer].minutes, avaliableTimers[selectedTimer].seconds);
		$('#start').attr('disabled', true);
	});
	$('#stop').click(function() {
		Slider.Stop();
		$('#start').attr('disabled', false);
	});
});

var Slider = {
	slider: null,
	Start: function(minutes, seconds) {
		$('#timer').text(minutes + ':' + seconds);
		this.slider = setInterval(function(){ myTimer() }, 1000);
		var that = this;
		function myTimer() {
			if (minutes == 0 && seconds == 0) {
				that.Stop();
				$('#start').attr('disabled', false);
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