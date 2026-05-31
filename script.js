const mysteryBox = document.getElementById("mysteryBox");
const openButton = document.getElementById("openButton");
const result = document.getElementById("result");
const rewardPopup = document.getElementById("rewardPopup");
const openSound = new Audio("assets/box-open.mp3");
const winnerSound = new Audio("assets/winner.mp3");
winnerSound.volume = 0.5;

const rewards = [
    "€10 Bonus",
    "Free Drink",
    "VIP Entry",
    "€25 Bonus",
    "Mystery Prize",
    "Lucky Draw",
    "Free Credits"
];

let isOpened = false;

function getRandomReward() {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    return rewards[randomIndex];
}

function openMysteryBox() {
    if (isOpened) return;

    isOpened = true;

    const selectedReward = getRandomReward();

    mysteryBox.classList.add("shaking");
    openButton.disabled = true;
    result.textContent = "Opening...";

    setTimeout(() => {
        mysteryBox.classList.remove("shaking");
        openSound.currentTime = 0;
        openSound.play();
        mysteryBox.classList.add("opened");

        rewardPopup.textContent = selectedReward;
        rewardPopup.classList.add("show");
        winnerSound.currentTime = 0;
        winnerSound.play();

        confetti({
            particleCount: 180,
            spread: 90,
            origin: { y: 0.6 }
        });

        result.textContent = "Reward revealed!";
        openButton.textContent = "Play Again";
        openButton.disabled = false;
    }, 700);
}

function resetGame() {
    isOpened = false;
    mysteryBox.classList.remove("opened");
    result.textContent = "Your reward is hidden inside";
    openButton.textContent = "Open Mystery Box";
    rewardPopup.classList.remove("show");
    rewardPopup.textContent = "";
}

function handleButtonClick() {
    if (isOpened) {
        resetGame();
    } else {
        openMysteryBox();
    }
}

openButton.addEventListener("click", handleButtonClick);
mysteryBox.addEventListener("click", handleButtonClick);