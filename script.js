const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const buttonStage = document.querySelector('#button-stage');
const success = document.querySelector('#success');
const closeSuccessButton = document.querySelector('#close-success');
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

function moveNoButton() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  escapeCount += 1;
  noButton.textContent = noLabels[Math.min(escapeCount, noLabels.length - 1)];

  if (escapeCount >= noLabels.length - 1) {
    noButton.classList.remove('answer--no');
    noButton.classList.add('answer--yes');
    noButton.style.position = 'relative';
    noButton.style.left = 'auto';
    noButton.style.top = 'auto';
    noButton.removeEventListener('pointerenter', moveNoButton);
    noButton.removeEventListener('click', handleNoClick);
    noButton.addEventListener('click', openSuccess, { once: true });
    return;
  }

  const stageRect = buttonStage.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const padding = 6;

  const minX = padding;
  const maxX = Math.max(minX, stageRect.width - buttonRect.width - padding);
  const minY = padding;
  const maxY = Math.max(minY, stageRect.height - buttonRect.height - padding);

  const nextX = randomBetween(minX, maxX);
  const nextY = randomBetween(minY, maxY);

  noButton.style.position = 'absolute';
  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;
}

function handleNoClick(event) {
  event.preventDefault();
  moveNoButton();
}

function makeConfetti() {
  const colors = ['#f42e56', '#ff8fa8', '#ffc0b3', '#8b1230', '#ffd166', '#ffffff'];
  const count = window.innerWidth < 600 ? 70 : 120;

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--duration', `${randomBetween(2.8, 5.2)}s`);
    piece.style.setProperty('--drift', `${randomBetween(-180, 180)}px`);
    piece.style.setProperty('--spin', `${randomBetween(360, 1080)}deg`);
    piece.style.animationDelay = `${randomBetween(0, 0.45)}s`;
    piece.style.opacity = `${randomBetween(0.65, 1)}`;
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

function openSuccess() {
  success.classList.add('is-open');
  success.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  makeConfetti();
  window.setTimeout(() => closeSuccessButton.focus(), 100);
}

function closeSuccess() {
  success.classList.remove('is-open');
  success.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  yesButton.focus();
}

yesButton.addEventListener('click', openSuccess);
noButton.addEventListener('pointerenter', moveNoButton);
noButton.addEventListener('click', handleNoClick);
closeSuccessButton.addEventListener('click', closeSuccess);

success.addEventListener('click', (event) => {
  if (event.target === success) closeSuccess();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && success.classList.contains('is-open')) {
    closeSuccess();
  }
});