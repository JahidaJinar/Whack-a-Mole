document.addEventListener('DOMContentLoaded', () => {
  const rulesSection = document.getElementById('rules');
  const gameSection = document.getElementById('game');
  const startBtn = document.getElementById('startButton');
  const holes = document.querySelectorAll('.hole');
  const scoreEl = document.getElementById('score');
  const timeEl = document.getElementById('time');

  let score = 0;
  let timeLeft = 30;
  let popUpInterval, countdownInterval;

  function randomHole() {
    const idx = Math.floor(Math.random() * holes.length);
    return holes[idx];
  }

  function peep() {
    const hole = randomHole();
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
    }, 1200); // mole will be visible for 2 sec
  }

  function startGame() {
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    rulesSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    popUpInterval = setInterval(peep, 1000); // every 1 sec new mole
    countdownInterval = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    clearInterval(popUpInterval);
    clearInterval(countdownInterval);
    alert(`Time's up! Your score: ${score}`);
    gameSection.classList.add('hidden');
    rulesSection.classList.remove('hidden');
  }

  holes.forEach((hole) => {
    hole.addEventListener('click', (e) => {
      if (!e.isTrusted) return; // Prevent fake clicks
      if (hole.classList.contains('up')) {
        score++;
        scoreEl.textContent = score;
        hole.classList.add('hit');
        hole.classList.remove('up');
        setTimeout(() => hole.classList.remove('hit'), 500);
      } else {
        hole.classList.add('miss');
        setTimeout(() => hole.classList.remove('miss'), 500);
      }
    });
  });

  startBtn.addEventListener('click', () => {
    rulesSection.classList.remove('animate__fadeInDown');
    void rulesSection.offsetWidth; // Trigger reflow for animation
    rulesSection.classList.add('animate__fadeInDown');
    startGame();
  });

  // Floating bear emoji animation (optional)
  function spawnBear() {
    const bear = document.createElement('div');
    bear.textContent = '🐻';
    bear.className = 'floating-bear';
    bear.style.left = `${Math.random() * 80 + 10}%`;
    document.body.appendChild(bear);
    bear.addEventListener('animationend', () => bear.remove());
  }
  setInterval(spawnBear, 1000);
});