const playerHand = document.getElementById("player-hand");
const patientArea = document.getElementById("patient-area");
const gameLog = document.getElementById("game-log");

const deck = [
    { type: "patient", name: "Adrenal Crisis", hp: -3 },
    { type: "treatment", name: "Hydrocortisone", effect: "heal" },
    { type: "wrong", name: "Dexamethasone", effect: "complication" },
    { type: "event", name: "Malpractice Lawsuit", effect: "discard" }
];

let playerHP = 10;
let playerCards = [];

document.getElementById("draw-card").addEventListener("click", () => {
    if (deck.length > 0) {
        const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
        playerCards.push(card);
        renderHand();
        logMessage(`Drew a card: ${card.name}`);
    }
});

document.getElementById("end-turn").addEventListener("click", () => {
    logMessage("Turn ended.");
});

function renderHand() {
    playerHand.innerHTML = "";
    playerCards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = card.name;
        div.onclick = () => playCard(card);
        playerHand.appendChild(div);
    });
}

function playCard(card) {
    if (card.type === "patient") {
        patientArea.innerHTML = `<div class="card">${card.name}</div>`;
        playerHP += card.hp;
        logMessage(`Patient appears: ${card.name} (-${Math.abs(card.hp)} HP)`);
    } else if (card.type === "treatment") {
        patientArea.innerHTML = "";
        logMessage(`Used treatment: ${card.name}`);
    } else if (card.type === "wrong") {
        playerHP -= 2;
        logMessage(`Wrong treatment used: ${card.name} (-2 HP)`);
    } else if (card.type === "event") {
        logMessage(`Event triggered: ${card.name}`);
    }
    playerCards = playerCards.filter(c => c !== card);
    renderHand();
}

function logMessage(message) {
    gameLog.innerHTML += `<p>${message}</p>`;
}
