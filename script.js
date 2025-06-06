// Telegram WebApp инициализация
const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user || { id: "test_user_" + Math.random() };
const userId = user.id;
console.log("User ID:", userId);

// Герои
const heroes = [
  { name: "Captain America", cost: 100, income: 1 },
  { name: "Thor", cost: 500, income: 5 },
  { name: "Iron Man", cost: 1500, income: 10 },
  { name: "Hulk", cost: 3000, income: 20 },
  { name: "Spider-Man", cost: 5000, income: 30 },
];

// Начальные значения
let eternity = 0;
let clickPower = 1;
let autoClick = 0;
let ownedHeroes = [];

const API_URL = "https://script.google.com/macros/s/AKfycbwM29IeHC2BALJ48apE293-RGTG5JiaBsTe1DZDbWLKZYq8UrVfjzY1f6myfPPfISjn/exec";

const eternityDisplay = document.getElementById("eternity");
const incomeDisplay = document.getElementById("income");
const fightBtn = document.getElementById("fightBtn");
const upgradeClickBtn = document.getElementById("upgradeClick");
const autoClickBtn = document.getElementById("autoClick");
const heroesContainer = document.getElementById("heroes");

// Загрузка данных
async function loadUserData() {
  try {
    const response = await fetch(`${API_URL}?user_id=${userId}`);
    const data = await response.json();
    console.log("Loaded data:", data);
    eternity = data.eternity || 0;
    clickPower = data.clickPower || 1;
    autoClick = data.autoClick || 0;
    ownedHeroes = data.ownedHeroes || [];
    updateUI();
    addHeroesToUI();
  } catch (error) {
    console.error("Error loading data:", error);
    eternity = parseInt(localStorage.getItem("eternity")) || 0;
    clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
    autoClick = parseInt(localStorage.getItem("autoClick")) || 0;
    ownedHeroes = JSON.parse(localStorage.getItem("ownedHeroes")) || [];
    updateUI();
    addHeroesToUI();
  }
}

// Сохранение данных
async function saveUserData() {
  try {
    console.log("Saving data:", { user_id: userId, eternity, clickPower, autoClick, ownedHeroes });
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        eternity,
        clickPower,
        autoClick,
        ownedHeroes,
      }),
    });
  } catch (error) {
    console.error("Error saving data:", error);
  }
  localStorage.setItem("eternity", eternity.toString());
  localStorage.setItem("clickPower", clickPower.toString());
  localStorage.setItem("autoClick", autoClick.toString());
  localStorage.setItem("ownedHeroes", JSON.stringify(ownedHeroes));
}

// Обновление интерфейса
function updateUI() {
  eternityDisplay.textContent = Math.floor(eternity);
  incomeDisplay.textContent = autoClick;
}

// Добавление героев в интерфейс
function addHeroesToUI() {
  heroesContainer.innerHTML = "";
  heroes.forEach((hero, index) => {
    const isOwned = ownedHeroes.includes(hero.name);
    const div = document.createElement("div");
    div.className = "hero-card";
    div.innerHTML = `
      <strong>${hero.name}</strong><br>
      Cost: ${hero.cost} Eternity<br>
      Income: +${hero.income}/sec<br>
      ${isOwned ? "<em>Owned</em>" : `<button onclick="buyHero(${index})">Recruit</button>`}
    `;
    heroesContainer.appendChild(div);
  });
}

// Покупка героя
function buyHero(index) {
  const hero = heroes[index];
  if (eternity >= hero.cost && !ownedHeroes.includes(hero.name)) {
    eternity -= hero.cost;
    ownedHeroes.push(hero.name);
    autoClick += hero.income;
    console.log(`Bought ${hero.name}, new ownedHeroes:`, ownedHeroes);
    updateUI();
    addHeroesToUI();
    saveUserData();
  } else {
    alert("Not enough Eternity or already owned!");
  }
}

// Клик
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

// Telegram авторизация
function setupTelegram() {
  if (user) {
    const userDiv = document.getElementById("user-info");
    userDiv.innerHTML = `<p>Hello, ${user.first_name || "Hero"}!</p>`;
  }
}

// Инициализация
setupTelegram();
loadUserData();
updateUI();
addHeroesToUI();
