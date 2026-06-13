var themes = ["Q-ocean", "sakura", "lilClaw", "vdb"];
var themeLink = document.getElementById("theme-link");
var dropdown = document.getElementById("theme-dropdown");

var themeIndex = Number(localStorage.getItem("themeIndex")) || 0;
dropdown.selectedIndex = themeIndex;
setTheme(themes[themeIndex]);

dropdown.addEventListener("change", function () {
  var index = dropdown.selectedIndex;
  setTheme(themes[index]);
  localStorage.setItem("themeIndex", index);
});

function setTheme(theme) {
  if (theme === "Q-ocean") {
    themeLink.href = "";
  } else {
    themeLink.href = "Themes/" + theme + ".css";
  }
}
