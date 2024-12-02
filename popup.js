const textInput = document.getElementById("text-input");
const voicesSelect = document.getElementById("voices");
const rateInput = document.getElementById("rate");
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

let voices = [];
const synth = window.speechSynthesis;

// Load available voices
function loadVoices() {
  voices = synth.getVoices();
  voicesSelect.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join("");
}

// Speak text
function speakText() {
  const text = textInput.value;
  if (text.trim() === "") return;

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices.find(voice => voice.name === voicesSelect.value);
  utterance.voice = selectedVoice;
  utterance.rate = rateInput.value;

  synth.speak(utterance);
}

// Stop speaking
function stopSpeaking() {
  synth.cancel();
}

// Event listeners
speakButton.addEventListener("click", speakText);
stopButton.addEventListener("click", stopSpeaking);

// Populate voices when available
synth.onvoiceschanged = loadVoices;
loadVoices();
