const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const buttonStage = document.querySelector('#button-stage');
const confettiLayer = document.querySelector('#confetti-layer');

let escapeCount = 0;
let redirecting = false;

const noLabels = [
  'No 🥺',
  'Are you sure? 😳',
  'Really sure? 🥹',
  'Think again 💭',
  'Last chance 😭'
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function makeConfetti() {
  if (!confettiLayer) {
    console.error('Confetti layer was not found.');
    return;
  }

  const colors = [
    '#f42e56',
    '#ff8fa8',
    '#ffc0b3',
    '#8b1230',
    '#ffd166',
    '#ffffff'
  ];

  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement('span');

    piece.classList.add('confetti');
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty(
      '--duration',
      `${randomBetween(2.2, 4)}s`
    );

    piece.style.setProperty(
      '--drift',
      `${randomBetween(-180, 180)}px`
    );

    piece.style.setProperty(
      '--spin',
      `${randomBetween(360, 1080)}deg`
    );

    piece.style.animationDelay =
      `${randomBetween(0, 0.3)}s`;

    confettiLayer.appendChild(piece);

    piece.addEventListener('animationend', () => {
      piece.remove();
    });
  }
}

function goToDetails() {
  if (redirecting) return;

  redirecting = true;

  makeConfetti();

  setTimeout(() => {
    window.location.href = './date-details.html';
  }, 1800);
}

function moveNoButton() {
  if (redirecting) return;

  escapeCount += 1;

  noButton.textContent =
    noLabels[Math.min(escapeCount, noLabels.length - 1)];

  const stageRect = buttonStage.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const padding = 8;

  const maxX = Math.max(
    padding,
    stageRect.width - buttonRect.width - padding
  );

  const maxY = Math.max(
    padding,
    stageRect.height - buttonRect.height - padding
  );

  const nextX = randomBetween(padding, maxX);
  const nextY = randomBetween(padding, maxY);

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
