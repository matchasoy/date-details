const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const buttonStage = document.querySelector('#button-stage');

let escapeCount = 0;

const noLabels = [
  'No 🥺',
  'Are you sure? 😳',
  'Really sure? 🥹',
  'Think again 💭',
  'Last chance 😭'
];

function goToDetails() {
  window.location.href = './date-details.html';
}

function moveNoButton() {
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

  const nextX =
    padding + Math.random() * Math.max(1, maxX - padding);

  const nextY =
    padding + Math.random() * Math.max(1, maxY - padding);

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
