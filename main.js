class ADSR {
    constructor (atk, dec, sus, rel) {
        this.attack = atk;
        this.decay = dec;
        this.sustain = sus;
        this.release = rel;
    }
}


var AudioContext = window.AudioContext ||
    window.webkitAudioContext;

//Consts
const context = new AudioContext;
const master_volume = context.createGain();
const waveforms = document.getElementsByName('waveform');


//Buttons
const start_button  = document.querySelector('#start');

//Sliders
const volume_slider  = document.querySelector('#volume-control');
const attack_slider  = document.querySelector('#attack-control');
const decay_slider   = document.querySelector('#decay-control');
const sustain_slider = document.querySelector('#sustain-control');
const release_slider = document.querySelector('#release-control');

//Initialization
const envelope = new ADSR(parseFloat(attack_slider.value),
    parseFloat(decay_slider.value),
    parseFloat(sustain_slider.value),
    parseFloat(release_slider.value));
master_volume.connect(context.destination);
master_volume.gain.value = parseFloat(volume_slider.value);
let waveform;
volume_slider.addEventListener('input', function(){
    master_volume.gain.value = this.value;
});
attack_slider.addEventListener('input', function(){
    envelope.attack = (parseFloat(this.value));
});
decay_slider.addEventListener('input', function(){
    envelope.decay = (parseFloat(this.value));
});
sustain_slider.addEventListener('input', function(){
    envelope.sustain = (parseFloat(this.value));
});
release_slider.addEventListener('input', function(){
    envelope.release = (parseFloat(this.value));
});

function setWaveform() {
    for(let i = 0; i < waveforms.length; i++){
        if(waveforms[i].checked){
            waveform = waveforms[i].value;
        }
    }
}

start_button.addEventListener('click', function() {
    let osc = context.createOscillator();
    let note_gain = context.createGain();

    note_gain.gain.setValueAtTime(0,0);
    note_gain.gain.linearRampToValueAtTime(envelope.sustain, context.currentTime + envelope.attack);
    note_gain.gain.setValueAtTime(envelope.sustain, context.currentTime + 1 - envelope.release);
    note_gain.gain.linearRampToValueAtTime(0, context.currentTime+1);

    osc.frequency.setValueAtTime(220, 0);

    osc.connect(note_gain);
    osc.start(0);
    osc.stop(context.currentTime + 1);
    osc.type = waveform;
    waveforms.forEach((waveformInput) => {
        waveformInput.addEventListener('change', function() {
            setWaveform();
            osc.type = waveform;
        });
    });
    note_gain.connect(master_volume);
});



