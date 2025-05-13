let eternity = parseInt(localStorage.getItem("eternity")) || 0;
let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
let autoClick = parseInt(localStorage.getItem("autoClick")) || 0;

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

// Автоклик
setInterval(() => {
  eternity += autoClick;
  updateUI();
}, 1000);

updateUI();
