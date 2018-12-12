

function getInput() {
  let verb = $("#verb").val();
  let noun = $("#noun").val();
  let adjective = $("#adjective").val();
  if ($("#ownsentence").val()!="") {
     var sentence = $("#ownsentence").val();
  } else var sentence = randomSentence(noun,verb,adjective);
  console.log(verb+noun+adjective);
  console.log(sentence);
  $("#result").empty().append(sentence);
  outVoice(sentence);
}

function randomSentence(noun,verb,adjective) {
  let sentences = [`"There are too many ${verb} ${noun} on this ${adjective} plane!", he screamed.`,
    `She was ${verb} ${noun} on the ${adjective} beach.`,
    `How are there so many ${noun} ${verb} on this ${adjective} boat?`];
  return sentences[Math.floor(Math.random()*3)];
}

function outVoice(sentence) {
  $("#output").show();
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
  console.log(u);
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