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
  navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    var stad = "Antwerpen";

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
          window.open(l, "_blank");
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
          window.open(l, "_blank");
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
