const holes = [...document.querySelectorAll('.hole')];
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const bestDisplay = document.querySelector('#best-score');
const message = document.querySelector('#message');
const startButton = document.querySelector('#start-button');

let score = 0;
let secondsLeft = 30;
let gameRunning = false;
let spawnTimer;
let countdownTimer;
let hideTimers = new Map();

const savedBest = Number(localStorage.getItem('mole-best-score')) || 0;
bestDisplay.textContent = String(savedBest).padStart(3, '0');

function setHoleVisible(hole, visible) {
  hole.classList.toggle('is-up', visible);
  hole.setAttribute('aria-label', `${hole.dataset.number} 번째 구멍, ${visible ? '두더지 있음' : '두더지 없음'}`);
  if (!visible) {
    hole.classList.remove('is-hit');
    clearTimeout(hideTimers.get(hole));
    hideTimers.delete(hole);
  }
}

function showMole() {
  if (!gameRunning) return;

  const hiddenHoles = holes.filter((hole) => !hole.classList.contains('is-up'));
  if (hiddenHoles.length === 0) return;

  const hole = hiddenHoles[Math.floor(Math.random() * hiddenHoles.length)];
  setHoleVisible(hole, true);
  hideTimers.set(hole, setTimeout(() => setHoleVisible(hole, false), 1050));
}

function finishGame() {
  gameRunning = false;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer);
  hideTimers.forEach(clearTimeout);
  hideTimers.clear();
  holes.forEach((hole) => setHoleVisible(hole, false));
  startButton.innerHTML = '<span aria-hidden="true">↻</span> 다시 하기';
  message.textContent = `게임 끝! ${score}점을 기록했어요.`;

  const best = Number(localStorage.getItem('mole-best-score')) || 0;
  if (score > best) {
    localStorage.setItem('mole-best-score', String(score));
    bestDisplay.textContent = String(score).padStart(3, '0');
    message.textContent = `최고 기록 갱신! ${score}점이에요.`;
  }
}

function startGame() {
  clearInterval(spawnTimer);
  clearInterval(countdownTimer);
  hideTimers.forEach(clearTimeout);
  hideTimers.clear();
  holes.forEach((hole) => setHoleVisible(hole, false));

  score = 0;
  secondsLeft = 30;
  gameRunning = true;
  scoreDisplay.textContent = '000';
  timeDisplay.textContent = String(secondsLeft);
  message.textContent = '나타났다! 두더지를 눌러요!';
  startButton.innerHTML = '<span aria-hidden="true">●</span> 진행 중';

  showMole();
  spawnTimer = setInterval(showMole, 700);
  countdownTimer = setInterval(() => {
    secondsLeft -= 1;
    timeDisplay.textContent = String(secondsLeft);
    if (secondsLeft <= 0) finishGame();
  }, 1000);
}

holes.forEach((hole, index) => {
  hole.dataset.number = index + 1;
  hole.addEventListener('click', () => {
    if (!gameRunning || !hole.classList.contains('is-up') || hole.classList.contains('is-hit')) return;

    clearTimeout(hideTimers.get(hole));
    hole.classList.add('is-hit');
    hole.setAttribute('aria-label', `${index + 1} 번째 구멍, 두더지 맞힘`);
    score += 10;
    scoreDisplay.textContent = String(score).padStart(3, '0');
    message.textContent = '정확히 맞혔어요! +10점';
    setTimeout(() => setHoleVisible(hole, false), 320);
  });
});

startButton.addEventListener('click', startGame);