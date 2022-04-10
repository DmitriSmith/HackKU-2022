import React from "react";
import {WebMidi} from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import CircularSlider from '@fseehawer/react-circular-slider';

class Module extends React.Component {
    constructor(props){
        super(props)
        this.audio_context = props.audio_context;
        this.inputs = [];
        this.outputs = [];
    }

    render() {
        return (
            <div className="moduleContainer">

            </div>
        );
    }
}

class ADSR extends Module {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    attack: "attack",
                    value: 0.1
                },
                {
                    name: "decay",
                    value: 0.1
                },
                {
                    name: "sustain",
                    value: 0.1
                },
                {
                    name: "release",
                    value: 0.1
                },
            ],
            outputs: [
                {
                    name: "envelope",
                    value: 0.1
                }
            ]
        }
    }
}

class Rack extends React.Component {
    constructor(props) {
        super(props)
        this.audio_context = window.AudioContext || window.webkitAudioContext
    }

    render() {

    }

}