let currentTask = null;
const start = document.getElementById("start-btn");
const taskName = document.getElementById("task-name");
const taskNotes = document.getElementById("task-notes");
const timerForm = document.getElementById("timer-form");
const timerDisplay = document.getElementById("timer-display");

function StartTracking() {
  //Form validation for required field
  if (taskName.value.trim().length === 0) {
    alert("Please enter a task name");
    return;
  }
  currentTask = {
    task: taskName.value,
    notes: taskNotes.value,
    startTime: new Date(),
  };
  const currentTracking = document.getElementById("current-task-name");
  currentTracking.textContent = currentTask.task;
  //block switch to timer upon click of Start Tracking button
  timerDisplay.style.display = "block";
  timerForm.style.display = "none";

  console.log("Start Tracking button clicked");
  console.log(currentTask);
}

//Event Listener for Start Tracking click button
start.addEventListener("click", StartTracking);
