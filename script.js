function updateKlok() {
  var now = new Date();
  var h = String(now.getHours()).padStart(2, "0");
  var m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("klok").innerHTML = h + ":" + m;
}

setInterval(updateKlok, 1000);
updateKlok();
function updateWeer() {
  navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    fetch(
      "https://nominatim.openstreetmap.org/reverse?lat=" +
        lat +
        "&lon=" +
        lon +
        "&format=json&accept-language=nl",
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (locData) {
        var stad =
          locData.address.city ||
          locData.address.town ||
          locData.address.village;

        fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=" +
            lat +
            "&longitude=" +
            lon +
            "&current_weather=true",
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var temp = Math.round(data.current_weather.temperature);
            var code = data.current_weather.weathercode;

            var vertalingen = {
              0: "Helder",
              1: "Overwegend helder",
              2: "Half bewolkt",
              3: "Bewolkt",
              45: "Mist",
              48: "Mist",
              51: "Lichte motregen",
              53: "Motregen",
              55: "Zware motregen",
              61: "Lichte regen",
              63: "Regen",
              65: "Zware regen",
              71: "Lichte sneeuw",
              73: "Sneeuw",
              75: "Zware sneeuw",
              80: "Lichte regenbui",
              81: "Regenbui",
              82: "Zware regenbui",
              95: "Onweer",
              96: "Onweer met hagel",
              99: "Zwaar onweer",
            };

            var iconen = {
              0: "fa-sun",
              1: "fa-sun",
              2: "fa-cloud-sun",
              3: "fa-cloud",
              45: "fa-smog",
              48: "fa-smog",
              51: "fa-cloud-rain",
              53: "fa-cloud-rain",
              55: "fa-cloud-rain",
              61: "fa-cloud-sun-rain",
              63: "fa-cloud-rain",
              65: "fa-cloud-showers-heavy",
              71: "fa-snowflake",
              73: "fa-snowflake",
              75: "fa-snowflake",
              80: "fa-cloud-sun-rain",
              81: "fa-cloud-showers-heavy",
              82: "fa-cloud-showers-heavy",
              95: "fa-bolt",
              96: "fa-bolt",
              99: "fa-bolt",
            };

            var beschrijving = vertalingen[code] || "Onbekend";
            var icoon = iconen[code] || "fa-temperature-half";
            document.getElementById("weer-icoon").className =
              "fa-solid " + icoon;
            document.getElementById("weer-tekst").innerHTML =
              stad + " · " + temp + "°C · " + beschrijving;
          });
      });
  });
}

updateWeer();

var teller = parseInt(localStorage.getItem("teller")) || 0;

function laadKoppelingen() {
  var wrap = document.getElementById("wrapper");
  var plus = document.getElementById("nieuweK");
  for (var i = 0; i < teller; i++) {
    var link = localStorage.getItem("koppeling_" + i);
    if (link) {
      var snelK = document.createElement("div");
      snelK.classList.add("koppeling");
      var img = document.createElement("img");
      img.src = "https://www.google.com/s2/favicons?domain=" + link + "&sz=32";
      img.style.width = "32px";
      img.style.height = "32px";
      snelK.appendChild(img);
      (function (el, index, l) {
        el.onclick = function () {
          window.open(l, "_self");
        };
        el.oncontextmenu = function (e) {
          e.preventDefault();
          if (confirm("Verwijderen?")) {
            localStorage.removeItem("koppeling_" + index);
            el.remove();
            teller--;
            localStorage.setItem("teller", teller);
            document.getElementById("nieuweK").style.display = "flex";
          }
        };
      })(snelK, i, link);
      wrap.insertBefore(snelK, plus);
    }
  }
  if (teller >= 9) {
    document.getElementById("nieuweK").style.display = "none";
  }
}

function newSnelkopeling() {
  if (teller < 10) {
    var wrap = document.getElementById("wrapper");
    var plus = document.getElementById("nieuweK");
    var link = prompt("Voer een link in:");
    if (link) {
      var snelK = document.createElement("div");
      snelK.classList.add("koppeling");
      var img = document.createElement("img");
      img.src = "https://www.google.com/s2/favicons?domain=" + link + "&sz=32";
      img.style.width = "32px";
      img.style.height = "32px";
      snelK.appendChild(img);
      localStorage.setItem("koppeling_" + teller, link);
      teller++;
      localStorage.setItem("teller", teller);
      (function (el, index, l) {
        el.onclick = function () {
          window.open(l, "_self");
        };
        el.oncontextmenu = function (e) {
          e.preventDefault();
          if (confirm("Verwijderen?")) {
            localStorage.removeItem("koppeling_" + index);
            el.remove();
            teller--;
            localStorage.setItem("teller", teller);
            document.getElementById("nieuweK").style.display = "flex";
          }
        };
      })(snelK, teller - 1, link);
      wrap.insertBefore(snelK, plus);
      if (teller === 9) {
        document.getElementById("nieuweK").style.display = "none";
      }
    }
  }
}

laadKoppelingen();

function updateGroet() {
  var naam = localStorage.getItem("naam");
  if (!naam) {
    naam = prompt("Wat is je naam?");
    localStorage.setItem("naam", naam);
  }

  var ochtend = [
    "Good morning <i class='fa-solid fa-sun'></i>",
    "Rise and shine <i class='fa-solid fa-cloud-sun'></i>",
    "Morning <i class='fa-solid fa-mug-hot'></i>",
  ];
  var middag = [
    "Good afternoon <i class='fa-solid fa-utensils'></i>",
    "Hey <i class='fa-solid fa-hand-wave'></i>",
    "Afternoon <i class='fa-solid fa-sun'></i>",
  ];
  var namiddag = [
    "Good afternoon <i class='fa-solid fa-clock'></i>",
    "Almost done for today <i class='fa-solid fa-flag-checkered'></i>",
    "Hey <i class='fa-solid fa-bolt'></i>",
  ];
  var avond = [
    "Good evening <i class='fa-solid fa-moon'></i>",
    "Evening <i class='fa-solid fa-stars'></i>",
    "Hey night owl <i class='fa-solid fa-crow'></i>",
  ];
  var nacht = [
    "Still awake? <i class='fa-solid fa-bed'></i>",
    "Go to sleep <i class='fa-solid fa-moon'></i>",
    "Late night grind <i class='fa-solid fa-fire'></i>",
  ];

  var now = new Date();
  var h = now.getHours();
  var lijst;

  if (h >= 6 && h < 12) lijst = ochtend;
  else if (h >= 12 && h < 14) lijst = middag;
  else if (h >= 14 && h < 18) lijst = namiddag;
  else if (h >= 18 && h < 23) lijst = avond;
  else lijst = nacht;

  var groet = lijst[Math.floor(Math.random() * lijst.length)];
  document.getElementById("groet").innerHTML = groet + ", " + naam;
}

updateGroet();
glitchHover("groet");

var zoekbalk = document.getElementById("zoekbalk");
var geschiedenisBox = document.getElementById("zoek-geschiedenis");

zoekbalk.addEventListener("focus", function () {
  var geschiedenis = JSON.parse(localStorage.getItem("zoekgeschiedenis")) || [];
  if (geschiedenis.length === 0) return;
  geschiedenisBox.innerHTML = "";
  geschiedenis
    .slice(-5)
    .reverse()
    .forEach(function (term) {
      var item = document.createElement("div");
      item.classList.add("geschiedenis-item");

      var tekst = document.createElement("span");
      tekst.innerHTML = term;
      tekst.onclick = function () {
        window.open(
          "https://www.google.com/search?q=" + encodeURIComponent(term),
          "_self",
        );
      };

      var kruis = document.createElement("span");
      kruis.innerHTML = "×";
      kruis.classList.add("geschiedenis-verwijder");
      kruis.onclick = function (e) {
        e.stopPropagation();
        var g = JSON.parse(localStorage.getItem("zoekgeschiedenis")) || [];
        g = g.filter(function (t) {
          return t !== term;
        });
        localStorage.setItem("zoekgeschiedenis", JSON.stringify(g));
        item.remove();
      };

      item.appendChild(tekst);
      item.appendChild(kruis);
      geschiedenisBox.appendChild(item);
    });
  geschiedenisBox.style.display = "block";
});

zoekbalk.addEventListener("blur", function () {
  setTimeout(function () {
    geschiedenisBox.style.display = "none";
  }, 200);
});

document.getElementById("zoekform").addEventListener("submit", function () {
  var term = zoekbalk.value.trim();
  if (!term) return;
  var geschiedenis = JSON.parse(localStorage.getItem("zoekgeschiedenis")) || [];
  geschiedenis.push(term);
  localStorage.setItem("zoekgeschiedenis", JSON.stringify(geschiedenis));
});
