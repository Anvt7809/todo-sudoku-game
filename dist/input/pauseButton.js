import { pauseGame, resumeGame } from "../game/pause.js";
export function registerPauseButton(pauseBtn) {
    pauseBtn.addEventListener("click", () => {
        pauseGame();
    });
}
export function registerResumeButton(resumeBtn) {
    resumeBtn.addEventListener("click", () => {
        resumeGame();
    });
}
