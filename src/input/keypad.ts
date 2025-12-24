<<<<<<< HEAD
import { selectedCell } from "../state/selection.js";
import { isValid } from "../board/validation.js";
import { clearSameNumberHighlight, highlightSameNumbers } from "../board/highlight.js";
import { checkGameCompleted } from "../game/completion.js";

export function registerKeypad(keypad: HTMLElement) {
    keypad.addEventListener("click", (event) => {
        if (!selectedCell) return;

        // Prevent editing fixed cells
        if (selectedCell.readOnly) return;

        const button = event.target as HTMLButtonElement;
        const num = button.dataset.num;

        if (!num) return;

        selectedCell.classList.remove("invalid", "valid");

        if (num === "clear") {
            selectedCell.value = "";
            clearSameNumberHighlight();
            return;
        }

        const value = Number(num);
        selectedCell.value = value.toString();

        const row = Number(selectedCell.dataset.row);
        const col = Number(selectedCell.dataset.col);

        if (!isValid(row, col, value)) {
            selectedCell.classList.add("invalid");
        } else {
            selectedCell.classList.add("valid");
        }

        clearSameNumberHighlight();
        highlightSameNumbers(value.toString());
        checkGameCompleted();
    });

}
||||||| parent of 7fff0b8 (push all)
=======
import { selectedCell } from "../state/selection.js";
import { isValid } from "../board/validation.js";
import { clearSameNumberHighlight, highlightSameNumbers } from "../board/highlight.js";
import { checkGameCompleted } from "../game/completion.js";

export function registerKeypad(keypad: HTMLElement) {
    keypad.addEventListener("click", (event) => {
        if (!selectedCell) return;

        // Prevent editing fixed cells
        if (selectedCell.readOnly) return;

        const button = event.target as HTMLButtonElement;
        const num = button.dataset.num;

        if (!num) return;

        selectedCell.classList.remove("invalid", "valid");

        if (num === "clear") {
            selectedCell.value = "";
            clearSameNumberHighlight();
            return;
        }

        const value = Number(num);
        selectedCell.value = value.toString();

        const row = Number(selectedCell.dataset.row);
        const col = Number(selectedCell.dataset.col);

        if (!isValid(row, col, value)) {
            selectedCell.classList.add("invalid");
        } else {
            selectedCell.classList.add("valid");
        }

        clearSameNumberHighlight();
        highlightSameNumbers(value.toString());
        checkGameCompleted();
    });

}
>>>>>>> 7fff0b8 (push all)
