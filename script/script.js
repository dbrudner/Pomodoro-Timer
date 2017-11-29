//delete this


//declaring element variables

var start = document.getElementById("start");
var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var addTimeSession = document.getElementById("add-time-session");
var minusTimeSession = document.getElementById("minus-time-session");
var addTimeBreak = document.getElementById("add-time-break");
var minusTimeBreak = document.getElementById("minus-time-break");
var reset = document.getElementById("reset");
var stop = document.getElementById("stop");
var breakMinutes = document.getElementById("break-minutes");
var breakSeconds = document.getElementById("break-seconds");
var status = document.getElementById("status");

//declaring time vars
var setDefaults = function(){
	totalSeconds = 0;
	totalMinutes = 25;
	totalSecondsBreak = 0;
	totalMinutesBreak = 5;
	timerCheck = false;
	breakTimerActive = false;
	setWorkTime = 0;
	setBreakTime = 0;
}

setDefaults();

var showTime = function() {
	breakMinutes.innerHTML = totalMinutesBreak;
	breakSeconds.innerHTML = totalSecondsBreak;
	minutes.innerHTML = totalMinutes;
	seconds.innerHTML = totalSeconds;
}

showTime();
//function to countdown seconds. When seconds = 0, subtract 1 minute and countdown seconds again starting from 60
var currentSeconds = function () {
	if (totalSeconds  === 1 && totalMinutes === 0) {
		minutes.innerHTML = "0";
		seconds.innerHTML = "00";
		totalSeconds = 0
		stopCountDown();
		countdownSecondsBreak();
		breakTimerActive = true;
		return;
	}
	if (totalSeconds >= 0) {
		totalSeconds--;
		seconds.innerHTML = totalSeconds;
	}
	if (totalSeconds < 0) {
		totalMinutes --;
		totalSeconds = 59;

		showMinutes();
	}
	
}

// function to solve problem of seconds showing only 1 digit when less than 10 (i.e., timer showing 1:5 instead of 1:05)
// var showSeconds = function() {
// 	if (totalSeconds.toString.length > 1) {
// 		seconds.innerHTML = totalSeconds;
// 	}
// 	if (totalSeconds.toString.length < 1) {
// 		seconds.innerHTML = "0" + totalSeconds.toString;
// 	}

// }

var sessionFinished = function () {
	stopCountDown();
	startBreakTimer();
	totalSeconds = 0;
	totalMinutes = 0;
	showMinutes();
}

//sets header to either work or play depending on which clock is running
var changeStatus = function(string) {
	header.innerHTML = string;
}

//show minutes = 0 on load
var showMinutes = function() {
	minutes.innerHTML = totalMinutes;
}

//tie start button to start countdown
start.onclick = function() {
	if (timerCheck === false && breakTimerActive === false){
		countdownSeconds();
	//this prevents being able to start the clock more than once
		timerCheck = true;
		changeStatus("work");
	}
	if (breakTimerActive === true) {
		countdownSecondsBreak()
	}

}
//starts countdown
function countdownSeconds() {
	startCount = setInterval(currentSeconds, 30);
	showMinutes();
}



//stops countdown
function stopCountDown () {
	clearInterval(startCount);
}

//add a minute
addTimeSession.onclick = function() {
	totalMinutes++;
	showMinutes();
}

//subtract a minute
minusTimeSession.onclick = function() {
	if (totalMinutes > 0) {
		totalMinutes--;
		showMinutes();
	}
}


//stop button - stops clock
stop.onclick = function() {
	stopCountDown();
	timerCheck = false;
	changeStatus("paused")
	stopCountDownBreak();
}


//resets clock to zero
reset.onclick = function() {
	setDefaults();
	showTime();
	showMinutesBreak();
}



//current seconds of break timer
var currentSecondsBreak = function () {
	if (totalSecondsBreak  === 1 && totalMinutesBreak === 0) {
		breakSeconds.innerHTML = "00"
		stopCountDownBreak();
		breakTimerActive = false;
		timerCheck = false;
		finished();
		return;
	}
	if (totalSecondsBreak > 0) {
		totalSecondsBreak--;
		breakSeconds.innerHTML = totalSecondsBreak;
	}
	if (totalSecondsBreak <= 0) {
		totalMinutesBreak --;
		totalSecondsBreak = 59;

		showMinutesBreak();
	}
}

function showMinutesBreak() {
	breakMinutes.innerHTML = totalMinutesBreak;
}

function countdownSecondsBreak() {
	startCountBreak = setInterval(currentSecondsBreak, 30);
	showMinutesBreak();
	changeStatus("play");
}

//stops countdown
function stopCountDownBreak () {
	clearInterval(startCountBreak);
}

//session length +; adds a minute to session
addTimeBreak.onclick = function() {
	totalMinutesBreak++;
	showMinutesBreak();

}
//session length -; subtract a minute to session
minusTimeBreak.onclick = function() {
	if (totalMinutesBreak > 0) {
		totalMinutesBreak--;
		showMinutesBreak();
	}
}

var finished = function() {
	alert("finished");
}