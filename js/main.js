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
const body = document.querySelector('body');

// Initialize Voices Array
let voices = [];



// ADD VOICES TO SELECT LIST
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


// SPEAK
const speak = () => {

    // Add background animation
    body.style.background = '#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x'; // repeat only horizontally
    body.style.backgroundSize = '100% 100%'; // cover everything


    // Check if speaking
    if(synth.speaking){

        console.error('Already Speaking...');
        return;

    }

    if(textInput !== ''){

        // Pass text for reading : textInput.value
        // Get speech response back to variable: speakText
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Run when reading is finished
        speakText.onend = e => {

            console.log('Done speaking...');

        }

        // Read error
        speakText.onerror = e => {

            console.error('Something went wrong');

        } 

        // Get Selected voice from select list
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {

            // if current voice matches selectedVoice
            if(voice.name === selectedVoice){

                speakText.voice = voice

            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;    
        speakText.pitch = pitch.value;

        // Read
        synth.speak(speakText);

    }

};


// EVENT LISTENERS

// On Submit button click
textForm.addEventListener('submit', e => {

    e.preventDefault(); // prevent submission
    speak(); // call speak function
    textInput.blur();

});

// On Rate Value Change
// Update #rateValue element text
rate.addEventListener('change', e => rateValue.textContent = rate.value)

// On Pitch Value Change
// Update #pitchValue element text
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)




// READING STARTS WHEN VOICE IS SELECTED (NO BUTTON CLICK NEEDED)

voiceSelect.addEventListener('change', e => speak());

