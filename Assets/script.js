var buttonVal = "false";
var reminders = JSON.parse(localStorage.getItem("timeblocks"));
//Declare TimeBlocks Array
var timeBlocksObj = {
  09: {
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
  },
};



// Check Local Storage for Reminders
function checkTimeBlocks() {
   if (reminders === null) {
    console.log("Reminder" + reminders);
    console.log("Reminder" + reminders[0].reminder);
  }
}
console.log(reminders);

//Declare Date and Time Variables//
var now = moment();
var currentHeaderDate = moment().format("dddd, MMMM Do");
var currentTime = moment().format("hh:mm A");
var currentHour = moment().format("HH");

//Get Current Day and TIme
function getCurrentDay() {
  $("#currentDay").html(currentHeaderDate);
}
function getCurrentTime() {
  $("#currentTime").text(currentTime);
}

//Render Time Blocks
function renderTimeBlocks() {
  var timeBlockContainer = $("#timeBlockContainer");
  var row, col1, col2, col3, textArea, i;

  for (const [key, value] of Object.entries(timeBlocksObj)) {
    row = $("<div></div>").addClass("row time-block");

    col1 = $("<div></div>").addClass("col-1 hour").text(value.displayHour);
    row.append(col1);
    col2 = $("<div></div>").attr("id", [key]);

    //Parsing key into a number and Formats Timeblocks for Past, Present, and Future
    if (parseInt([key]) < currentHour) {
      col2.addClass("col-10 description past");
    } else if (parseInt([key]) > currentHour) {
      col2.addClass("col-10 description future");
    } else if (parseInt([key]) == currentHour) {
      col2.addClass("col-10 description present");
    }
    if (reminders[key].reminder !== null) {
      timeBlocksObj[key].reminder = reminders[key].reminder;
      textArea = $("<textarea><textarea>")
        .attr("id", "reminder" + key)
        .addClass("description")
        .val(value.reminder);
      col2.append(textArea);
      row.append(col2);
    } else {
      textArea = $("<textarea><textarea>")
        .attr("id", "reminder" + key)
        .addClass("description")
        .val(value.reminder);
       col2.append(textArea);
        row.append(col2);
    }
    
    col3 = $("<div></div>")
      .addClass("col-1 saveBtn")
      .attr("id", "saveBtn" + key);
    i = $("<i></i>").addClass("fas fa-pencil-alt").data("hour", key);
    i.data("reminder-id", "reminder" + key);
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
    timeBlocksStore = JSON.parse(localStorage.getItem("timeblocks"));
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
//Initializes Page
function initialize() {
  getFromLocalStorage();
  renderTimeBlocks();
}
function heroModeOn() {
  $("#style").attr("href", "Assets/stylehero.css");
  $("#simple")
    .text("A HEROIC APP FOR SAVING THE WOOOORRRRLLLDDD!")
    .css("font-size", "2em");
}

function heroModeOff() {
  $("#style").attr("href", "Assets/style.css");
  $("#simple").text("A simple calendar app for scheduling your work day");
}

$(document).ready(function () {
  
  getFromLocalStorage();
  heroModeOn();
  heroModeOff();
  getCurrentDay();
  getCurrentTime();
  initialize();
});

function saveToLocalStorage() {
  localStorage.setItem("timeblocks", JSON.stringify(timeBlocksObj));
  console.log("storage set")
}

// if (timeBlocksStore !== null) {
//   timeBlocksObj.reminder = timeBlocksStore.reminder
//   console.log(timeBlocksObj[9].reminder + "||" + timeBlocksStore[9].reminder )
// }