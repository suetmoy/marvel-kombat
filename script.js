let eternity = Number(localStorage.getItem("eternity")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let autoClick = Number(localStorage.getItem("autoClick")) || 0;

console.log("Loaded from localStorage:", { eternity, clickPower, autoClick });

const eternityDisplay = document.getElementById("eternity");
const fightBtn = document.getElementById("fightBtn");
const upgradeClickBtn = document.getElementById("upgradeClick");
const autoClickBtn = document.getElementById("autoClick");

function updateUI() {
  eternityDisplay.textContent = eternity;
  localStorage.setItem("eternity", eternity);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("autoClick", autoClick);
}

fightBtn.onclick = () => {
  eternity += clickPower;
  updateUI();
};

upgradeClickBtn.onclick = () => {
  if (eternity >= 50) {
    eternity -= 50;
    clickPower += 1;
    updateUI();
  } else {
    alert("Not enough eternity!");
  }
};

autoClickBtn.onclick = () => {
  if (eternity >= 100) {
    eternity -= 100;
    autoClick += 1;
    updateUI();
  } else {
    alert("Not enough eternity!");
  }
};

setInterval(() => {
  eternity += autoClick;
  updateUI();
}, 1000);

updateUI();

