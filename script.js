const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const buttonStage = document.querySelector('#button-stage');

if (!yesButton || !noButton || !buttonStage) {
  throw new Error('Missing required elements in index.html');
}

let escapeCount = 0;

const noLabels = [
  'No 🥺',
  'Are you sure? 😳',
  'Really sure? 🥹',
  'Think again 💭',
  'Last chance 😭',
  'Okay, yes 💘'
];

function goToDetails() {
  window.location.href = './date-details.html';
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

  const nextX = padding + Math.random() * Math.max(1, stageRect.width - buttonRect.width - padding * 2);
  const nextY = padding + Math.random() * Math.max(1, stageRect.height - buttonRect.height - padding * 2);

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
