export let selectedCell: HTMLInputElement | null = null;

export function setSelectedCell(cell: HTMLInputElement | null): void {
    selectedCell = cell;
}

export function getSelectedCell() {
    return selectedCell;
}
