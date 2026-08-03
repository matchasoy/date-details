const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const buttonStage = document.querySelector('#button-stage');
const confettiLayer = document.querySelector('#confetti-layer');

let escapeCount = 0;

const noLabels = [
  'No 🥺',
  'Are you sure? 😳',
  'Really sure? 🥹',
  'Think again 💭',
  'Last chance 😭',
  'Okay, yes 💘'
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function makeConfetti() {
  const colors = ['#f42e56', '#ff8fa8', '#ffc0b3', '#8b1230', '#ffd166', '#ffffff'];

  for (let i = 0; i < 100; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--duration', `${randomBetween(2.8, 5.2)}s`);
    piece.style.setProperty('--drift', `${randomBetween(-180, 180)}px`);
    piece.style.setProperty('--spin', `${randomBetween(360, 1080)}deg`);
    piece.style.animationDelay = `${randomBetween(0, 0.35)}s`;
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

function goToDetails() {
  makeConfetti();
  setTimeout(() => {
    window.location.href = 'date-details.html';
  }, 700);
}

function moveNoButton() {
  escapeCount += 1;
  noButton.textContent = noLabels[Math.min(escapeCount, noLabels.length - 1)];

  if (escapeCount >= noLabels.length - 1) {
    noButton.textContent = 'Yes 💘';
    noButton.classList.remove('answer--no');
    noButton.classList.add('answer--yes');
    noButton.style.position = 'absolute';
    noButton.style.left = '50%';
    noButton.style.top = '50%';
    noButton.style.transform = 'translate(-50%, -50%)';
    noButton.removeEventListener('pointerenter', moveNoButton);
    noButton.removeEventListener('click', handleNoClick);
    noButton.addEventListener('click', goToDetails, { once: true });
    return;
  }

  const stageRect = buttonStage.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const padding = 8;

  const nextX = randomBetween(padding, Math.max(padding, stageRect.width - buttonRect.width - padding));
  const nextY = randomBetween(padding, Math.max(padding, stageRect.height - buttonRect.height - padding));

  noButton.style.position = 'absolute';
  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;
  noButton.style.transform = 'none';
}

function handleNoClick(event) {
  event.preventDefault();
  moveNoButton();
}

yesButton.addEventListener('click', goToDetails);
noButton.addEventListener('pointerenter', moveNoButton);
noButton.addEventListener('click', handleNoClick);
