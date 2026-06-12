function glitchHover(id) {
  var el = document.getElementById(id);
  var origineel = el.innerHTML;
  var chars = "!#$%&/\\[]{}?@*<>^~";

  var frame = 0;
  var totalFrames = 70;

  var interval = setInterval(function () {
    var progress = frame / totalFrames;
    var intensity = Math.sin(progress * Math.PI);

    var tekst = "";
    for (var i = 0; i < origineel.length; i++) {
      if (origineel[i] === " ") {
        tekst += " ";
      } else if (Math.random() < intensity * 0.6) {
        var r = Math.floor(Math.random() * 3);
        var kleur = r === 0 ? "#61A69C" : r === 1 ? "#98d4cc" : "#3d8c85";
        tekst +=
          '<span style="color:' +
          kleur +
          '">' +
          chars[Math.floor(Math.random() * chars.length)] +
          "</span>";
      } else {
        tekst += origineel[i];
      }
    }
    el.innerHTML = tekst;

    var shift = Math.floor(intensity * 8);
    el.style.textShadow = shift + "px 0 #61A69C, -" + shift + "px 0 #98d4cc";

    frame++;
    if (frame >= totalFrames) {
      clearInterval(interval);
      el.innerHTML = origineel;
      el.style.textShadow = "";
    }
  }, 20);
}
