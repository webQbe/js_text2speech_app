// Initialize SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// Initialize Voices Array
let voices = [];

// 
const getVoices = () => {

    // add voices from API to voices array
    voices = synth.getVoices();

    // log voice list
    console.log(voices);

}  

getVoices();

// avoid getting empty array
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}