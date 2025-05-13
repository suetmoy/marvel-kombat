const heroes = [
  { name: "Captain America", cost: 100, income: 1 },
  { name: "Thor", cost: 500, income: 5 },
  { name: "Iron Man", cost: 1500, income: 10 },
  { name: "Hulk", cost: 3000, income: 20 },
  { name: "Spider-Man", cost: 5000, income: 30 },
];

let eternity = 0;
let incomePerSec = 0;

function updateUI() {
  document.getElementById("eternity").textContent = eternity;
  document.getElementById("income").textContent = incomePerSec;
}

function addHeroToUI() {
  const container = document.getElementById("heroes");
  heroes.forEach((hero, index) => {
    const div = document.createElement("div");
    div.className = "hero-card";
    div.innerHTML = `
      <strong>${hero.name}</strong><br>
      Cost: ${hero.cost} eternity<br>
      Income: +${hero.income}/sec<br>
      <button onclick="buyHero(${index})">Recruit</button>
    `;
    container.appendChild(div);
  });
}

function buyHero(index) {
  const hero = heroes[index];
  if (eternity >= hero.cost) {
    eternity -= hero.cost;
    incomePerSec += hero.income;
    updateUI();
  } else {
    alert("Not enough eternity!");
  }
}

document.getElementById("assemble-btn").onclick = () => {
  eternity += 1;
  updateUI();
};

setInterval(() => {
  eternity += incomePerSec;
  updateUI();
}, 1000);

function setupTelegram() {
  if (window.Telegram.WebApp.initDataUnsafe?.user) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const userDiv = document.getElementById("user-info");
    userDiv.innerHTML = `<p>Hello, ${user.first_name}!</p>`;
  }
}

addHeroToUI();
setupTelegram();
updateUI();
