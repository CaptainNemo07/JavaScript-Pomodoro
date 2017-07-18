//  responsive?
var timer = new Timer();
var userSeconds = 1500;
var startButtonOn = false;

// buttons
var starter = document.getElementById('startButton').addEventListener('click', changeButtonTitle);
var add5 = document.getElementById('addFive').addEventListener('click', addFiveMinutes);
var sub5 = document.getElementById('subFive').addEventListener('click', minusFiveMinutes);


// displays seconds correctly on timer
function formatSeconds(seconds)
{
    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

// buttons to add and minus 5 minutes
function addFiveMinutes() {
  if (userSeconds < 86100) {
  userSeconds += 300;
  document.getElementById('time').innerHTML = formatSeconds(userSeconds);
}
}

function minusFiveMinutes() {
  if (userSeconds > 300) {
  userSeconds -= 300;
  document.getElementById('time').innerHTML = formatSeconds(userSeconds);
}
}
// start/stop button title
function changeButtonTitle(){
  if(startButtonOn === false) {
  document.getElementById('startButton').innerHTML = "Stop";

} else {
    document.getElementById('startButton').innerHTML = "Start";
  }
}
// timer function; starts and stops timer depending on startButtonOn var.
$('#startButton').click(function () {
  if (startButtonOn === false) {
    disableButtons();
    startButtonOn = true;
    timer.start({countdown: true, startValues: {seconds: userSeconds}});
    $('#time').html(timer.getTimeValues().toString());
    timer.addEventListener('secondsUpdated', function (e) {
        $('#time').html(timer.getTimeValues().toString());
    });

  } else {
      timer.stop();
      document.getElementById('time').innerHTML = formatSeconds(userSeconds);
      startButtonOn = false;
      enableButtons()
    }
  });

  timer.addEventListener('targetAchieved', function (e) {
    changeButtonTitle();
    $('#time').html(formatSeconds(userSeconds));
    enableButtons();
    startButtonOn = false;
    alerted();

});

// alert when timer finishes
function alerted() {
  alert("Pomodoro has finished");
}

// disables buttons add and subtract
function disableButtons() {
  document.getElementById('addFive').disabled = true;
  document.getElementById('subFive').disabled = true;
}

// enables buttons add and subtracts
function enableButtons() {
  document.getElementById('addFive').disabled = false;
  document.getElementById('subFive').disabled = false;
}
