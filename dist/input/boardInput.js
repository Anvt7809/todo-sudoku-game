import { selectedCell } from "../state/selection.js";
import { isValid } from "../board/validation.js";
import { highlightSameNumbers, clearSameNumberHighlight } from "../board/highlight.js";
import { checkGameCompleted } from "../game/completion.js";
export function registerInput(board) {
    board.addEventListener("input", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement))
            return;
        const input = target;
        if (!selectedCell)
            return;
        // Prevent editing fixed cells
        if (selectedCell.readOnly)
            return;
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        if (Number.isNaN(row) || Number.isNaN(col))
            return;
        const value = Number(input.value);
        // Reset state
        input.classList.remove("invalid");
        clearSameNumberHighlight();
        // Empty or invalid range
        if (value < 1 || value > 9) {
            input.value = "";
            return;
        }
        // Validation
        if (!isValid(row, col, value)) {
            input.classList.add("invalid");
            return;
        }
        highlightSameNumbers(input.value);
        checkGameCompleted();
    });
}
