var AudioContext = window.AudioContext ||
    window.webkitAudioContext;

//Consts
const context = new AudioContext;
const master_volume = context.createGain();
const waveforms = document.getElementsByName('waveform');

//Buttons
const start_button  = document.querySelector('#start');
const stop_button   = document.querySelector('#stop');
const volume_slider = document.querySelector('#volume-control')

//Initialization
master_volume.connect(context.destination);
master_volume.gain.value = 0.1;
let waveform;

volume_slider.addEventListener("input", changeVolume);

function changeVolume() {
    master_volume.gain.value = this.value;
}

function setWaveform() {
    for(let i = 0; i < waveforms.length; i++){
        if(waveforms[i].checked){
            waveform = waveforms[i].value;
        }
    }
}

start_button.addEventListener('click', function() {
    const oscillator = context.createOscillator();
    oscillator.frequency.setValueAtTime(220, 0);
    oscillator.connect(master_volume);
    oscillator.start(0);
    oscillator.type = waveform;
    stop_button.addEventListener('click', function() {
        oscillator.stop(0);
        delete oscillator;
    });
    waveforms.forEach((waveformInput) => {
        waveformInput.addEventListener('change', function() {
            setWaveform();
            oscillator.type = waveform;
        });
    });
});



