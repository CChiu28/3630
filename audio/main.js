
function getInput(form) {
  let name = document.getElementById('name').value;
  let body_part = document.getElementById('body_part').value;
  let fluid = document.getElementById('fluid').value;
  let substance = document.getElementById('substance').value;
  let sentence = name+" is sick with the "+body_part+" flu. Drink more "+fluid+" and take "+substance+" as needed.";
  console.log(name+body_part+fluid+substance);
  outVoice(sentence)
  document.getElementById("output").innerHTML = sentence;
}

function outVoice(sentence) {
  var v = speechSynthesis.getVoices();
  var voicechange = document.querySelector('select');
  var selectedOption = voicechange.selectedOptions[0].getAttribute('data-name');
  var u = new SpeechSynthesisUtterance();
  for(i = 0; i < v.length ; i++) {
    if(v[i].name === selectedOption) {
      u.voice = v[i];
    }
  }
  u.text = sentence;
  u.lang = 'en-US';
  u.rate = 1.0;
  speechSynthesis.speak(u);
}

function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  let voices = speechSynthesis.getVoices();

  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}