// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAvbcWKBcuAyiDvXVbE6iPi22bnrwsw_vQ",
    authDomain: "trainschedularv2.firebaseapp.com",
    databaseURL: "https://trainschedularv2.firebaseio.com",
    projectId: "trainschedularv2",
    storageBucket: "",
    messagingSenderId: "378938428206",
    appId: "1:378938428206:web:f0ada61b18016d47"
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
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    //console.log(trainName)
    //console.log(trainDestination)
    //console.log(trainStart)
    //console.log(trainFrequency)

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
    //console.log(newTrain.name);
    //console.log(newTrain.destination);
    //console.log(newTrain.trainStart);
    //console.log(newTrain.trainFrequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    //console.log(trainName);
    //console.log(trainDestination);
    //console.log(trainStart);
    //console.log(trainFrequency);

    // fix the train start
    // var trainStartFixed = moment(trainStart, "hh:mm").format("hh:mm")
    // console.log(trainStartFixed)

    // Calculate the next arrival using hardcore math
    var nextArrival = moment().diff(moment(trainStart, "X"), "hh:mm");
    console.log(moment.unix(nextArrival).format('hh:mm'));

    // Calculate the minutes away
    var minutesAway = 0;
    //var minutesAway = nextArrival - ;
    //console.log(minutesAway);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});


