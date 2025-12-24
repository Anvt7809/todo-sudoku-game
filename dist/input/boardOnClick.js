import { clearHighlights, clearSameNumberHighlight, highlightRowAndColumn, highlightSubGrid, highlightSameNumbers } from "../board/highlight.js";
import { setSelectedCell, getSelectedCell } from "../state/selection.js";
export function registerOnClick(board) {
    board.addEventListener("focusin", (event) => {
        const input = event.target;
        if (!input.dataset.row || !input.dataset.col)
            return;
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        clearHighlights();
        clearSameNumberHighlight();
        highlightRowAndColumn(row, col);
        highlightSubGrid(row, col);
        highlightSameNumbers(input.value);
    });
    board.addEventListener("focusout", () => {
        clearHighlights();
        clearSameNumberHighlight();
    });
    board.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "INPUT")
            return;
        const input = target;
        const prev = getSelectedCell();
        if (prev) {
            prev.classList.remove("selected");
        }
        clearSameNumberHighlight();
        if (input.value) {
            highlightSameNumbers(input.value);
        }
        setSelectedCell(input);
        input.classList.add("selected");
    });
}
