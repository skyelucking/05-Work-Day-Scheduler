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
  13: {
    displayHour: "1 pm",
    reminder: "",
  },
  14: {
    displayHour: "2 pm",
    reminder: "",
  },
  15: {
    displayHour: "3 pm",
    reminder: "",
  },
  16: {
    displayHour: "4 pm",
    reminder: "",
  },
  17: {
    displayHour: "5 pm",
    reminder: "",
  }
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
console.log(timeBlockContainer);

//Get Current Day and TIme
function getCurrentDay() {
  $("#currentDay").html(currentHeaderDate);
}
function getCurrentTime() {
  $("#currentTime").text(currentTime);
}
{
  
}

//Render Time Blocks
function renderTimeBlocks() {
  var timeBlockContainer = $("#timeBlockContainer");
  var row, col1, col2, col3, textArea, i;
 
  for (const [key, value] of Object.entries(timeBlocksObj)) {
 
    row = $("<div></div>").addClass("row time-block");
    col1 = $("<div></div>").addClass("col-1 hour").text(value.displayHour);
    console.log([key] )
    console.log([key] - currentHour)
    row.append(col1);
    col2 = $("<div></div>")
    .attr("id", [key]);
    if ([key] ==+ currentHour) {
        col2.addClass("col-10 description present")
    } else if ([key] > currentHour) {
        col2.addClass("col-10 description past")
    } else if ([key] < currentHour) {
        col2.addClass("col-10 description future")
    }
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
// Format Time Blocks to Past, Present, Future
function formatTimeBlocks() {
    console.log(timeBlockContainer)
    console.log("current hour2 " + currentHour)
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
  formatTimeBlocks();
}

$(document).ready(function () {
  getCurrentDay();
  getCurrentTime();
  initialize();
});