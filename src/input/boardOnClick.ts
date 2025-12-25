import { highlightSameNumbers, clearSameNumberHighlight, highlightRowAndColumn, highlightSubGrid, clearHighlights } from "../board/highlight.js";
import { getSelectedCell, setSelectedCell } from "../state/selection.js";

export function registerOnClick(board: HTMLElement) {
    board.addEventListener("focusin", (event: Event) => {
        const input = event.target as HTMLInputElement;

        if (!input.dataset.row || !input.dataset.col) return;

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
        //    clearSameNumberHighlight();
    });

    board.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if (target.tagName !== "INPUT") return;

        const input = target as HTMLInputElement;

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