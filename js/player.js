var audio = document.getElementById('sources');

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');
var volumeInput = document.getElementById('volume');
var volume = document.querySelector('#player .volume');

playButton.addEventListener('click', playerStart);
pauseButton.addEventListener('click', playerPause);
volumeInput.addEventListener('mousedown', changeVolume);

function initPlayer() {
    var vol = localStorage.getItem('volume');
    if (vol) {
        var volObj = JSON.parse(vol)
        audio.volume = volObj.vol;
        volume.style.width = volObj.off + 'px';
    }
    playerStart();
}

function playerStart() {
    var promise = audio.play();
    
    if (promise !== undefined) {
        promise.then(_ => {
            play.style.display = 'none';
            pause.style.display = 'block';
        });
    }
}

function playerPause(){
    var promse = audio.pause();
    if (promise !== undefined) {
        promise.then(_ => {
             pause.style.display = 'none';
             play.style.display = 'block';
        });
    }
}

function changeVolume(e){
    localStorage.setItem('volume', JSON.stringify({vol: audio.volume, off: e.offsetX}));
    volume.style.width = e.offsetX + 'px';
    audio.volume = parseFloat(e.offsetX / (volumeInput.offsetWidth - 1));
}

initPlayer();
