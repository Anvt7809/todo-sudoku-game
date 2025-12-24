import { pauseGame, resumeGame } from "../game/pause.js";

export function registerPauseButton(pauseBtn: HTMLButtonElement): void {
    pauseBtn.addEventListener("click", () => {
        pauseGame();
    });
}

export function registerResumeButton(resumeBtn: HTMLButtonElement): void {
    resumeBtn.addEventListener("click", () => {
        resumeGame();
    });
}