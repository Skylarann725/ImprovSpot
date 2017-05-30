var $start = $("#start"),
    $stop = $("#stop"),
    $display = $("#display"),
    $colorChange = $(".colorChange"),
    playState = "-webkit-animation-play-state",
    intervalId,
    started = false;

// This code will run as soon as the page loads
window.onload = function () {
    $start.on("click", stopwatch.start);

    $stop.on("click", function () {
        if ($stop.text() === 'Stop') stopwatch.stop();
        else stopwatch.reset();
    });
};

// Our stopwatch object
var stopwatch = {
    time: 0,
    start: function () {
        $stop.text('Stop');
        if (started === false) {
            started = true;
            // DONE: Use setInterval to start the count here.
            intervalId = setInterval(stopwatch.count, 1000);
        }
        $colorChange.css(playState, 'running');
    },
    stop: function () {
        $stop.text('Reset');
        started = false;
        // DONE: Use clearInterval to stop the count here.
        clearInterval(intervalId);
        $colorChange.css(playState, 'paused');
    },
    reset: function () {
        stopwatch.time = 0;
        // DONE: Change the "display" div to "00:00."
        $display.html("00:00");
        this.colorReset();
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
    colorReset: function () {
        $colorChange.css('-webkit-animation', 'none');
        $colorChange.css('animation', 'none');
        setTimeout(function () {
            $colorChange.css('-webkit-animation', '');
            $colorChange.css('animation', '');
        }, 10);
    }

};