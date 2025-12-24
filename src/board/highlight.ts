export function highlightSameNumbers(value: string): void {
    if (!value) return;

    document.querySelectorAll("input").forEach(el => {
        const input = el as HTMLInputElement;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}

export function clearSameNumberHighlight(): void {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}

export function highlightRowAndColumn(row: number, col: number): void {
    for (let i = 0; i < 9; i++) {
        const rowCell = document.querySelector(
            `input[data-row='${row}'][data-col='${i}']`
        ) as HTMLInputElement;

        const colCell = document.querySelector(
            `input[data-row='${i}'][data-col='${col}']`
        ) as HTMLInputElement;

        rowCell?.classList.add("highlight");
        colCell?.classList.add("highlight");
    }
}

export function highlightSubGrid(row: number, col: number): void {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const cell = document.querySelector(
                `input[data-row='${r}'][data-col='${c}']`
            ) as HTMLInputElement;

            cell?.classList.add("highlight");
        }
    }
}

export function clearHighlights(): void {
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight");
    });
}