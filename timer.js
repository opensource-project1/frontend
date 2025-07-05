let duration = 25 * 60;
let remaining = duration;
let timer;
const timerEl = document.getElementById('timer');
const progressRing = document.getElementById('progress-ring');
const circleLength = 2 * Math.PI * 90;

function updateCircle(progress) {
  const offset = circleLength * (1 - progress);
  progressRing.style.strokeDashoffset = offset;
}

function startTimer() {
  clearInterval(timer);
  remaining = duration;
  updateCircle(0);

  timer = setInterval(() => {
    const min = String(Math.floor(remaining / 60)).padStart(2, '0');
    const sec = String(remaining % 60).padStart(2, '0');
    timerEl.textContent = `${min}:${sec}`;

    const progress = (duration - remaining) / duration;
    updateCircle(progress);

    if (--remaining < 0) {
      clearInterval(timer);
      alert("집중 시간이 끝났어요!");
      updateCircle(1);
    }
  }, 1000);
}
