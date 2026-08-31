/* ==========================================================================
   Specials Drop Countdown Timer
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
});

function startCountdown() {
  let totalSeconds = 12 * 3600 + 45 * 60 + 30;

  const hoursEl = document.getElementById("timer-hours");
  const minutesEl = document.getElementById("timer-minutes");
  const secondsEl = document.getElementById("timer-seconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  const interval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      return;
    }

    totalSeconds--;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, "0");
    minutesEl.textContent = String(m).padStart(2, "0");
    secondsEl.textContent = String(s).padStart(2, "0");
  }, 1000);
}