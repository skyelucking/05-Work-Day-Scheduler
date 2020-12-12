//Declare TimeBlocks Array
var timeBlocksObj = {
  9: {
    displayHour: "9 am",
    reminder: "",
  },
  10: {
    displayHour: "10 am",
    reminder: "",
  },
  11: {
    displayHour: "11 am",
    reminder: "",
  },
  12: {
    displayHour: "12 pm",
    reminder: "",
  },
};

//Declare Date and Time Variables//
var now = moment();
console.log(now);
var currentHeaderDate = moment().format("dddd, MMMM Do");
console.log("Current date: " + currentHeaderDate);
var currentTime = moment().format("hh:mm A");
console.log("Current timee: " + currentTime);
var currentHour = moment().format("H");
console.log("Current hour: " + currentHour);

//Get Current Day and TIme
function getCurrentDay() {
  $("#currentDay").html(currentHeaderDate);
}
function getCurrentTime() {
  $("#currentTime").text(currentTime);
}
{
  /* <div class="row">
       <div class="col-1 hour">9am</div>
        <div id="block9" class="col-10 time-block past"></div>
        <div id="saveBtn9" class="col-1 saveBtn"><br><i class="fas fa-pencil-alt" ></i> </div>
      </div> */
}

//Render Time Blocks
function renderTimeBlocks() {
  var timeBlockContainer = $("#timeBlockContainer");
  var row, col1, col2, col3, textArea, i;

  for (const [key, value] of Object.entries(timeBlocksObj)) {
    row = $("<div></div>").addClass("row time-block");
    col1 = $("<div></div>").addClass("col-1 hour").text(value.displayHour);
    row.append(col1);
    col2 = $("<div></div>")
      .addClass("col-10 description")
      .attr("id", "block" + value.hour);
    textArea = $("<textarea><textarea>")
      .attr("id", "reminder" + key)
      .addClass("description")
      .val(value.reminder);
    col2.append(textArea);
    row.append(col2);
    col3 = $("<div></div>")
      .addClass("col-1 saveBtn")
      .attr("id", "saveBtn" + key);
    i = $("<i></i>").addClass("fas fa-pencil-alt").data("hour", key);
    i.data("reminder-id", "reminder" + key);
    //     <i data-hour='9' data-reminder-id='reminder9'>
    i.on("click", function (e) {
      //update Reminder for hour
      var hour = $(e.target).data("hour");
      var reminderId = $(e.target).data("reminder-id");
      var reminderText = $("#" + reminderId).val();
      timeBlocksObj[hour].reminder = reminderText;
      // TODO: Save to local storage
    });
    col3.append(i);
    row.append(col3);
    timeBlockContainer.append(row);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("timeblocks", JSON.stringify(timeBlocksObj));
}

var hour = "10";
var timeBlocksObj = {
  9: {
    displayHour: "9 am",
    reminder: "",
  },
  10: {
    displayHour: "10 am",
    reminder: "",
  },
  11: {
    displayHour: "11 am",
    reminder: "",
  },
  12: {
    displayHour: "12 pm",
    reminder: "",
  },
};
// timeBlocksObj[hour].reminder;
function renderTimeBlocks() {
  var timeBlockContainer = $("#timeBlockContainer");
  var row, col1, col2, col3, textArea, i;
  for (const [key, value] of Object.entries(timeBlocksObj)) {
    row = $("<div></div>").addClass("row time-block");
    col1 = $("<div></div>").addClass("col-1 hour").text(value.displayHour);
    row.append(col1);
    col2 = $("<div></div>")
      .addClass("col-10 description")
      .attr("id", "block" + value.hour);
    textArea = $("<textarea><textarea>")
      .attr("id", "reminder" + key)
      .addClass("description")
      .val(value.reminder);
    col2.append(textArea);
    row.append(col2);
    col3 = $("<div></div>")
      .addClass("col-1 saveBtn")
      .attr("id", "saveBtn" + key);
    i = $("<i></i>").addClass("fas fa-pencil-alt").data("hour", key);
    i.data("reminder-id", "reminder" + key);
    //     <i data-hour='9' data-reminder-id='reminder9'>
    i.on("click", function (e) {
      saveReminder(e);
    });
    col3.append(i);
    row.append(col3);
    timeBlockContainer.append(row);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("timeblocks", JSON.stringify(timeBlocksObj));
}

function getFromLocalStorage() {
  // Check if local storage (LS) key exists
  if (localStorage.getItem("timeblocks")) {
    // Then retrieve the associated value from LS
    timeBlocksObj = JSON.parse(localStorage.getItem("timeblocks"));
  }
}

// Set Reminders for Button Clicks
function saveReminder(e) {
  //update Reminder for hour
  var hour = $(e.target).data("hour");
  var reminderId = $(e.target).data("reminder-id");
  var reminderText = $("#" + reminderId).val();
  timeBlocksObj[hour].reminder = reminderText;
  //Save to local storage
  saveToLocalStorage();
}

function initialize() {
  getFromLocalStorage();
  renderTimeBlocks();
}
// Format Time Blocks to Past, Present, Future
function formatTimeBlocks() {}

$(document).ready(function () {
  getCurrentDay();
  getCurrentTime();
  initialize();
});
