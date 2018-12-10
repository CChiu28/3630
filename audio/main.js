
function getInput() {
  let noun1 = document.getElementById('noun1').value;
  let occupation = document.getElementById('occupation').value;
  let animal = document.getElementById('animal').value;
  let place = document.getElementById('place').value;
  let verb1 = document.getElementById('verb1').value;
  let noun2 = document.getElementById('noun2').value;
  let sentence = "In the book War of the "+noun1+", the main character is an anonymous "+occupation+" who records the arrival of "+animal+" in "+place+". Needless to say, havoc reigns as the "+animal+" continue to "+verb1+" everything in sight, until they are killed by the common "+noun2;
  // console.log(name+body_part+fluid+substance);
  outVoice(sentence);
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