import { clearSameNumberHighlight } from "../board/highlight";

export function registerClickIn(board: HTMLElement) {
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
}

export function registerClickOut (board : HTMLElement) {
    board.addEventListener("focusout", () => {
    clearHighlights();
    //    clearSameNumberHighlight();
});
}