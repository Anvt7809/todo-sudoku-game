let secondsElapsed = 0;
let timerInterval = null;
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}
export function startTimer(timer) {
    if (timerInterval !== null)
        return;
    timerInterval = window.setInterval(() => {
        secondsElapsed++;
        timer.textContent = formatTime(secondsElapsed);
    }, 1000);
}
export function resetTimer(timer) {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    secondsElapsed = 0;
    timer.textContent = "00:00";
}
