var min;
var sec;
var IntervalID;
var timer;
$(document).ready(function () {
    // initTimer();
});

$("a.soc").each(function () {
    var _href = $(this).attr("href");
    $(this).attr("href", _href + document.location.pathname);
});

function initTimer() {
    if (!timer) {
        timer = $('#time').html();
    }

    IntervalID = setInterval(
        function () {
            timer--;
            sec = timer % 60;
            min = (timer - sec) / 60;
            if (sec < 10) sec = '0' + sec;
            //$('#time').html( min + ':' + sec );

            if (timer <= 0) {
                clearInterval(IntervalID);
                //$('#time').html('');
                if (timer <= -100) {
                    setTimeout(function () {
                        getSong();
                    }, 10000);
                }
                else {
                    //$('#song').html('');
                    getSong();
                }
            }
        },
        ( timer < 0 ? 2000 : 1000 )
    );
}

function updateSongNew(song, time) {
    $('#song').html(song);
    if (!time || !song) {
        setTimeout(function () {
            getSong();
        }, 5000);
    }
    else {
        timer = time;
        clearInterval(IntervalID);
        initTimer();
    }
}

function getSong() {
    $.ajax(
        {
            url: '/ajax.php',
            data: {getSong: "ok"},
            dataType: 'json',
            type: 'POST',
            scriptCharset: 'utf-8',

            success: function (json, textStatus) {
                updateSongNew(json.song, json.time);

            }
        }
    );
}




