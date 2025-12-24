let isPaused = false;
export function pauseGame() {
    isPaused = true;
    document.body.classList.add("paused");
    pauseOverlay.classList.add("show");
}
export function resumeGame() {
    isPaused = false;
    document.body.classList.remove("paused");
    pauseOverlay.classList.remove("show");
}
export function getPauseState() {
    return isPaused;
}
