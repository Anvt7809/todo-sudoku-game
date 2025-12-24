import { clearSameNumberHighlight } from "../board/highlight";

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
}