
function getInput() {
  console.log();
  let verb = $("#verb").val();
  let noun = $("#noun").val();
  let adjective = $("#adjective").val();
  if ($("#ownsentence").val()!="") {
     var sentence = $("#ownsentence").val();
  } else var sentence = `There are too many ${verb} ${noun} on this ${adjective} plane!", he screamed.`;
  console.log(sentence);
  $("#result").empty().append(sentence);
  outVoice(sentence);
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