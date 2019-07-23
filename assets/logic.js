// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBF_2-PgHfdWJhwvMN6XjNIjYwa-Vnlq1w",
    authDomain: "train-schedular-962b0.firebaseapp.com",
    databaseURL: "https://train-schedular-962b0.firebaseio.com",
    projectId: "train-schedular-962b0",
    storageBucket: "",
    messagingSenderId: "1063934526222",
    appId: "1:1063934526222:web:2fe03650263124a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainStart);
    console.log(newTrain.trainFrequency);

    alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);

    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("HH/mm");

    // Calculate the next arrival using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment(empStart, "X"), "months");
    //console.log(empMonths);

    // Calculate the minutes away
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});


