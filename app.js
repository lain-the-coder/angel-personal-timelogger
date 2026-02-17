//Declared variables
let currentTask = null;
let timerInterval = null;
const start = document.getElementById("start-btn");
const taskName = document.getElementById("task-name");
const taskNotes = document.getElementById("task-notes");
const timerForm = document.getElementById("timer-form");
const timerDisplay = document.getElementById("timer-display");
const currentTracking = document.getElementById("current-task-name");
const timerValue = document.getElementById("timer-value");
const startTimeRef = document.getElementById("start-time");

function StartTracking() {
  //Form validation for required field
  if (taskName.value.trim().length === 0) {
    alert("Please enter a task name");
    //exit early
    return;
  }

  //Save field values and start time into an object
  currentTask = {
    task: taskName.value,
    notes: taskNotes.value,
    startTime: new Date(),
  };

  //To display the current tracking field on UI
  currentTracking.textContent = currentTask.task;

  //To display the start time of tracking on UI
  startTimeRef.textContent = currentTask.startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    // second: '2-digit', // optional, if you need seconds
  });

  //block switch to timer upon click of Start Tracking button
  timerDisplay.style.display = "block";
  timerForm.style.display = "none";

  //Start Interval
  function CountTimer() {
    //TimeStamp approach as opposed to counter-based approach; accurate based on actual clock time, immune to interval drift, and can survive page refresh; Calculate: now - startTime
    const currentTime = new Date();
    const milliseconds = currentTime.getTime();
    const timeElapsed = (milliseconds - currentTask.startTime.getTime()) / 1000;

    //Convert to HH:MM:SS format using mathematical operations
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor((timeElapsed % 3600) / 60);
    const seconds = Math.floor(timeElapsed % 60);

    // Use String.padStart() to ensure two-digit formatting
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    timerValue.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  //Set Interval Callback function, run function every 1000 milliseconds
  timerInterval = setInterval(CountTimer, 1000);

  //Console statements
  console.log("Start Tracking button clicked");
  console.log(currentTask);
}

//Event Listener for Start Tracking click button
start.addEventListener("click", StartTracking);
