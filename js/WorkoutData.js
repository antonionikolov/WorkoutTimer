var WorkoutData = function (rounds, exercises, exerciseTime, exerciseRest, roundRest) {
	this.rounds           = rounds;
	this.exercises        = exercises * 2 - 1; // exercises + rest
	this.currentExercises = this.exercises;
	this.exerciseTime     = exerciseTime;
	this.exerciseRest     = exerciseRest;
	this.roundRest        = roundRest;
	this.roundCount      = 1;
	this.exerciseCount   = 0;
}

WorkoutData.prototype.next = function() {
	if (this.currentExercises == 0) {
		this.currentExercises = this.exercises;
		this.rounds--;
		this.roundCount++;
		this.exerciseCount = 0;
		$('#infoRound').text('Round ' + this.roundCount);
		$('#infoExercise').text('Long rest');
		$('#timer').css('color', '#3225E4');
		return this.roundRest;
	}
	if (this.currentExercises % 2 == 0) {
		this.currentExercises--;
		$('#infoRound').text('Round ' + this.roundCount);
		$('#infoExercise').text('Rest');
		$('#timer').css('color', '#3225E4');
		return this.exerciseRest;
	} else {
		this.currentExercises--;
		this.exerciseCount++;
		$('#infoRound').text('Round ' + this.roundCount);
		$('#infoExercise').text('Exercise ' + this.exerciseCount);
		$('#timer').css('color', '#FF0000');
		return this.exerciseTime;
	}
};

WorkoutData.prototype.empty = function() {
	return this.rounds == 1 && this.currentExercises == 0;
};