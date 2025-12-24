let isPaused = false;

export function pauseGame(): void {
    isPaused = true;

    document.body.classList.add("paused");
    pauseOverlay.classList.add("show");
}

export function resumeGame(): void {
    isPaused = false;

    document.body.classList.remove("paused");
    pauseOverlay.classList.remove("show");
}

export function getPauseState() {
    return isPaused;
}