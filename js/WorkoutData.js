var WorkoutData = function (rounds, exercises, exerciseTime, exerciseRest, roundRest) {
	this.rounds           = rounds;
	this.exercises        = exercises * 2 - 1;
	this.currentExercises = this.exercises;
	this.exerciseTime     = exerciseTime;
	this.exerciseRest     = exerciseRest;
	this.roundRest        = roundRest;
}

WorkoutData.prototype.next = function() {
	if (this.currentExercises == 0) {
		this.currentExercises = this.exercises;
		this.rounds--;
		return this.roundRest;
	}
	if (this.currentExercises % 2 == 0) {
		this.currentExercises--;
		return this.exerciseRest;
	} else {
		this.currentExercises--;
		return this.exerciseTime;
	}
};

WorkoutData.prototype.empty = function() {
	return this.rounds == 1 && this.currentExercises == 0;
};