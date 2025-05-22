// Telegram WebApp инициализация
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем на полный экран

// Получаем user_id
const user = tg.initDataUnsafe.user || { id: "test_user_" + Math.random() }; // Для тестов вне Telegram
const userId = user.id;

// Начальные значения
let eternity = 0;
let clickPower = 1;
let autoClick = 0;

// URL твоего Google Apps Script (замени на твой!)
const API_URL = "https://script.google.com/macros/s/XXXX/exec"; // Вставь свою ссылку

// Элементы интерфейса
const eternityDisplay = document.getElementById("eternity");
const fightBtn = document.getElementById("fightBtn");
const upgradeClickBtn = document.getElementById("upgradeClick");
const autoClickBtn = document.getElementById("autoClick");

// Загрузка данных игрока
async function loadUserData() {
  try {
    const response = await fetch(`${API_URL}?user_id=${userId}`);
    const data = await response.json();
    eternity = data.eternity || 0;
    clickPower = data.clickPower || 1;
    autoClick = data.autoClick || 0;
    updateUI();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Сохранение данных
async function saveUserData() {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        eternity,
        clickPower,
        autoClick,
      }),
    });
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// Обновление интерфейса
function updateUI() {
  eternityDisplay.textContent = Math.floor(eternity);
  localStorage.setItem("eternity", eternity.toString()); // Резервное сохранение
  localStorage.setItem("clickPower", clickPower.toString());
  localStorage.setItem("autoClick", autoClick.toString());
}

// Клик по кнопке
fightBtn.onclick = () => {
  eternity += clickPower;
  updateUI();
  saveUserData();
};

// Улучшение клика
upgradeClickBtn.onclick = () => {
  if (eternity >= 50) {
    eternity -= 50;
    clickPower += 1;
    updateUI();
    saveUserData();
  } else {
    alert("Not enough Eternity!");
  }
};

// Покупка автоклика
autoClickBtn.onclick = () => {
  if (eternity >= 100) {
    eternity -= 100;
    autoClick += 1;
    updateUI();
    saveUserData();
  } else {
    alert("Not enough Eternity!");
  }
};

// Пассивный доход
setInterval(() => {
  eternity += autoClick;
  updateUI();
  saveUserData();
}, 1000);

// Инициализация
loadUserData();
updateUI();
