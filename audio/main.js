function test() {
var u = new SpeechSynthesisUtterance();
  u.text = 'Hello World';
  u.lang = 'en-US';
  u.rate = 1.2;
  speechSynthesis.speak(u);
}