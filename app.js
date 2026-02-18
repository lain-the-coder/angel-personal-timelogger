//Declared variables
let currentTask = null;
let timerInterval = null;
let completedTask = null;
const start = document.getElementById("start-btn");
const stop = document.getElementById("stop-btn");
const taskName = document.getElementById("task-name");
const taskNotes = document.getElementById("task-notes");
const timerForm = document.getElementById("timer-form");
const timerDisplay = document.getElementById("timer-display");
const currentTracking = document.getElementById("current-task-name");
const timerValue = document.getElementById("timer-value");
const startTimeRef = document.getElementById("start-time");
const tableBody = document.getElementById("tasks-tbody");
const emptyState = document.getElementById("empty-state");
const tasksContainer = document.getElementById("tasks-container");
const totalHoursElement = document.getElementById("total-hours");
const clientName = document.getElementById("client-name");
const projectName = document.getElementById("project-name");

function StartTracking() {
  //Form validation for required fields
  if (
    taskName.value.trim().length === 0 ||
    clientName.value.trim().length === 0 ||
    projectName.value.trim().length === 0
  ) {
    alert("Please fill in all required fields");
    return;
  }

  //Save field values and start time into an object
  currentTask = {
    client: clientName.value,
    project: projectName.value,
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

  //Calculates elapsed = NOW - startTime = 0 seconds, updates display to "00:00:00"
  CountTimer();

  //Set Interval Callback function, run function every 1000 milliseconds
  timerInterval = setInterval(CountTimer, 1000);

  //Console statements
  console.log("Start Tracking button clicked");
  console.log(currentTask);
}

//Event Listener for Start Tracking click button
start.addEventListener("click", StartTracking);

function StopTracking() {
  //Stop timer after clicking Stop Tracking button
  clearInterval(timerInterval);

  //Capture endtime and duration in seconds along with round off
  const endTime = new Date();
  const durationInSeconds = Math.floor(
    (endTime.getTime() - currentTask.startTime.getTime()) / 1000,
  );

  //Store final task data in an object
  completedTask = {
    clientName: currentTask.client,
    projectName: currentTask.project,
    taskName: currentTask.task,
    notes: currentTask.notes,
    startTime: currentTask.startTime,
    endTime: endTime,
    duration: durationInSeconds,
  };

  //Retrieve existing data from localstorage
  const existingTasks = localStorage.getItem("tasks");

  let savedTasks = [];

  //Check if key already exists
  if (existingTasks === null) {
    savedTasks = [];
  } else {
    savedTasks = JSON.parse(existingTasks);
  }

  //Push the new object into the array
  savedTasks.push(completedTask);

  //Stringify the updated array  back into a JSON string
  const savedTasksString = JSON.stringify(savedTasks);

  //Save the updated string to localstorage
  localStorage.setItem("tasks", savedTasksString);

  //Hide timer display and display form
  timerDisplay.style.display = "none";
  timerForm.style.display = "block";

  //Clear form values
  clientName.value = "";
  projectName.value = "";
  taskName.value = "";
  taskNotes.value = "";

  //Reset current task to null
  currentTask = null;

  //Console statements
  console.log(completedTask);
  console.log("Stop button clicked");

  //Calling LoadTasks so new tasks show immediately
  LoadTasks();
}

//Event Listener for Stop Tracking click button
stop.addEventListener("click", StopTracking);

//function to get all tasks from Localstorage for displaying in table
function LoadTasks() {
  //Get all task from localStorage
  const getTasks = localStorage.getItem("tasks");

  //Declare array to hold all tasks
  let allTasks = [];

  if (getTasks === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(getTasks);
  }

  //Step 1: Get today and day of week
  const today = new Date();
  const dayOfWeek = today.getDay();

  //Step 2: Calculate how many days to go back to Monday
  const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  //Step 3: Calculate Monday's Date
  const mondayThisWeek = new Date(today); // Start with the same today moment we already captured
  mondayThisWeek.setDate(today.getDate() - daysToGoBack); // Set the date to this week's Monday's date
  mondayThisWeek.setHours(0, 0, 0, 0); // Feb 15, 2026 at 00:00:00, so we catch ALL tasks from Monday, even if logged at 1am

  //Step 4: Filtering all tasks to only tasks from Monday 12 AM
  const currentWeekTasks = allTasks.filter((task) => {
    const taskDate = new Date(task.startTime);
    return taskDate >= mondayThisWeek;
  });

  //Set it as empty during every load
  tableBody.innerHTML = "";

  currentWeekTasks.forEach((currentWeekTask, index) => {
    // Create a <tr> element
    const row = document.createElement("tr");

    // Format times
    const startFormatted = new Date(
      currentWeekTask.startTime,
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endFormatted = new Date(currentWeekTask.endTime).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    // Format duration (seconds → "Xh Ym Zs")
    const hours = Math.floor(currentWeekTask.duration / 3600);
    const minutes = Math.floor((currentWeekTask.duration % 3600) / 60);
    const seconds = currentWeekTask.duration % 60;
    const durationFormatted = `${hours} hr ${minutes} min ${seconds} sec`;

    // Create the row
    row.innerHTML = `
  <td>${currentWeekTask.clientName}</td>
  <td>${currentWeekTask.projectName}</td>
  <td>${currentWeekTask.taskName}</td>
  <td>${currentWeekTask.notes || "-"}</td>
  <td>${startFormatted}</td>
  <td>${endFormatted}</td>
  <td>${durationFormatted}</td>
  <td class="table-actions">
  <button class="btn-icon" title="Delete task" onclick="deleteTask(${index})">
    <i class="bi bi-trash"></i>
  </button>
</td>
`;

    // Append the row to the table body
    tableBody.appendChild(row);
  });

  if (currentWeekTasks.length > 0) {
    tasksContainer.style.display = "block";
    emptyState.style.display = "none";
  } else {
    tasksContainer.style.display = "none";
    emptyState.style.display = "block";
  }

  // Sum all durations
  const totalSeconds = currentWeekTasks.reduce(
    (sum, task) => sum + task.duration,
    0,
  );

  // Convert to hours/minutes
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Display
  totalHoursElement.textContent = `${hours} hr ${minutes} min`;

  //Console statements
  console.log("All tasks upto date", allTasks);
  console.log("Number of all tasks:", allTasks.length);
  console.log("All tasks for this week", currentWeekTasks);
  console.log("Number of tasks for this week:", currentWeekTasks.length);
  console.log("Monday was:", mondayThisWeek);
}

//Calling it so task loads on page refresh
LoadTasks();

//Delete Task function
function deleteTask(index) {
  //Get tasks from local storage
  const getTasks = localStorage.getItem("tasks");

  //Declare array to hold all tasks
  let allTasks = [];

  if (getTasks === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(getTasks);
  }

  //Remove per index
  allTasks.splice(index, 1);

  //Stringify the updated array  back into a JSON string
  const updatedAllTasksString = JSON.stringify(allTasks);

  //Save the updated string to localstorage
  localStorage.setItem("tasks", updatedAllTasksString);

  //Re-render table
  LoadTasks();
}
