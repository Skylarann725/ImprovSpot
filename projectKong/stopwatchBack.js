// STOPWATCH ACTIVITY (SOLUTION)
// =============================

var $start = $("#start"),
    $stop = $("#stop"),
    $display = $("#display");


// This code will run as soon as the page loads
window.onload = function () {
    $stop.on("click", function() {
        if($stop.text() === 'Stop') stopwatch.stop();
        else stopwatch.reset();
    });
    $start.on("click", stopwatch.start);
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId,
    started = false,
    start = 0;

// Our stopwatch object
var stopwatch = {

    time: 0,
    lap: 1,

    reset: function () {

        stopwatch.time = 0;
        stopwatch.lap = 1;

        // DONE: Change the "display" div to "00:00."
        $display.html("00:00");

        // DONE: Empty the "laps" div.
        $("#laps").html("");
    },
    start: function () {
        $stop.text('Stop');
        if (start === 0) {
            start = 1;
        }
        if (started === false) {
            started = true;
            console.log(started);
            // DONE: Use setInterval to start the count here.
            intervalId = setInterval(stopwatch.count, 1000);
        }
        stopwatch.colorTrans();
    },
    stop: function () {
        $stop.text('Reset');
        started = false;
        // DONE: Use clearInterval to stop the count here.
        clearInterval(intervalId);
        stopwatch.colorTrans();
    },
    count: function () {

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time++;

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $display.html(converted);
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },
    colorTrans: function () {
        if ($("body").css("animation-play-state") === "running") {
            console.log("is running");
            $("body").css("animation-play-state", "pause");
            $("body").css("-webkit-animation-play-state", "pause");
        }else{
            $("body").css("animation-play-state", "running");
        }
    }
};