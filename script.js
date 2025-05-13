// Загрузка данных из localStorage или установка по умолчанию
let eternity = Number(localStorage.getItem("eternity")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let autoClick = Number(localStorage.getItem("autoClick")) || 0;

const eternityDisplay = document.getElementById("eternity");
const fightBtn = document.getElementById("fightBtn");
const upgradeClickBtn = document.getElementById("upgradeClick");
const autoClickBtn = document.getElementById("autoClick");

// Обновление интерфейса и сохранение данных
function updateUI() {
  eternityDisplay.textContent = eternity;
  localStorage.setItem("eternity", eternity);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("autoClick", autoClick);
}

// Обработка клика по кнопке
fightBtn.onclick = () => {
  eternity += clickPower;
  updateUI();
};

// Улучшение клика
upgradeClickBtn.onclick = () => {
  if (eternity >= 50) {
    eternity -= 50;
    clickPower += 1;
    updateUI();
  } else {
    alert("Not enough eternity!");
  }
};

// Автоклик покупка
autoClickBtn.onclick = () => {
  if (eternity >= 100) {
    eternity -= 100;
    autoClick += 1;
    updateUI();
  } else {
    alert("Not enough eternity!");
  }
};

// Автоклики раз в секунду
setInterval(() => {
  eternity += autoClick;
  updateUI();
}, 1000);

// Первичная инициализация интерфейса
updateUI();
