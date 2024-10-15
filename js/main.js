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

    // loop through voices and create an option for each one
    voices.forEach(voice => {

        // create <option> element
        const option =  document.createElement('option');

        // fill <option> with voice & language
        option.textContent = voice.name + '('+ voice.lang +')';

        // set <option> attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        // append <option> to <select> list
        voiceSelect.appendChild(option);

    });

}  

getVoices();

// avoid getting empty array
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}