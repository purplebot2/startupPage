function updateKlok() {
  var now = new Date();
  var h = String(now.getHours()).padStart(2, "0");
  var m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("klok").innerHTML = h + ":" + m;
}

setInterval(updateKlok, 1000);
updateKlok();

function updateDate() {
  var dagen = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
  ];
  var maanden = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  var nowD = new Date();
  var d = dagen[nowD.getDay()].toUpperCase();
  var n = nowD.getDate();
  var m = maanden[nowD.getMonth()].toUpperCase();
  document.getElementById("datum").innerHTML = d + " " + n + " " + m;
}

setInterval(updateDate, 1000);
updateDate();

function updateWeer() {
  fetch("https://ipapi.co/json/")
    .then(function (response) {
      return response.json();
    })
    .then(function (locData) {
      var stad = locData.city;
      var lat = locData.latitude;
      var lon = locData.longitude;

      fetch("https://wttr.in/" + lat + "," + lon + "?format=j1")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var vertalingen = {
            Sunny: "Zonnig",
            Clear: "Helder",
            "Partly Cloudy": "Half bewolkt",
            Cloudy: "Bewolkt",
            Overcast: "Zwaar bewolkt",
            "Light Drizzle": "Nieselregen",
            Drizzle: "Nieselregen",
            "Drizzle And Rain": "Zachte regen",
            "Light Drizzle And Rain": "Zachte regen",
            "Light Rain": "Lichte regen",
            Rain: "Regen",
            "Heavy Rain": "Zware regen",
            "Light Snow": "Lichte sneeuw",
            Snow: "Sneeuw",
            "Thundery Outbreaks Possible": "Onweer mogelijk",
            Blizzard: "Sneeuwstorm",
            Fog: "Mist",
            "Light Rain Shower": "Lichte regenbui",
            "Rain Shower": "Regenbui",
            "Heavy Rain Shower": "Zware regenbui",
            "Patchy Rain Nearby": "Plaatselijk regen",
            "Patchy Light Rain": "Plaatselijk lichte regen",
          };
          var iconen = {
            Sunny: "fa-sun",
            Clear: "fa-moon",
            "Partly Cloudy": "fa-cloud-sun",
            Cloudy: "fa-cloud",
            Overcast: "fa-cloud",
            "Light Drizzle": "fa-cloud-rain",
            Drizzle: "fa-cloud-rain",
            "Drizzle And Rain": "fa-cloud-rain",
            "Light Drizzle And Rain": "fa-cloud-rain",
            "Light Rain": "fa-cloud-sun-rain",
            Rain: "fa-cloud-rain",
            "Heavy Rain": "fa-cloud-showers-heavy",
            "Light Snow": "fa-snowflake",
            Snow: "fa-snowflake",
            "Thundery Outbreaks Possible": "fa-bolt",
            Blizzard: "fa-snowflake",
            Fog: "fa-smog",
            "Light Rain Shower": "fa-cloud-sun-rain",
            "Rain Shower": "fa-cloud-showers-heavy",
            "Heavy Rain Shower": "fa-cloud-showers-heavy",
            "Patchy Rain Nearby": "fa-cloud-sun-rain",
            "Patchy Light Rain": "fa-cloud-sun-rain",
          };
          var temp = data.current_condition[0].temp_C;
          var engelse = data.current_condition[0].weatherDesc[0].value
            .split(",")[0]
            .trim();
          var beschrijving = vertalingen[engelse] || engelse;
          var icoon = iconen[engelse] || "fa-temperature-half";
          document.getElementById("weer-icoon").className = "fa-solid " + icoon;
          document.getElementById("weer-tekst").innerHTML =
            stad + " · " + temp + "°C · " + beschrijving;
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
      item.innerHTML = term;
      item.onclick = function () {
        window.open(
          "https://www.google.com/search?q=" + encodeURIComponent(term),
          "_self",
        );
      };
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
