import { resetBoard } from "../game/reset.js";
import { resetTimer } from "../game/timer.js";

export function registerResetButton(resetBtn : HTMLButtonElement, board : HTMLElement): void {
    resetBtn.addEventListener("click", () => {
        // Restore puzzle values
        resetBoard(board);

        // Reset timer
        resetTimer();
        isPaused = false;

        document.body.classList.remove("paused");
        pauseOverlay.classList.remove("show");

        // Re-render board: 
        //startTimer();
    });
}