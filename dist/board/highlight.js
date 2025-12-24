<<<<<<< HEAD
export function highlightSameNumbers(value) {
    if (!value)
        return;
    document.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}
export function clearSameNumberHighlight() {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}
export function highlightRowAndColumn(row, col) {
    for (let i = 0; i < 9; i++) {
        const rowCell = document.querySelector(`input[data-row='${row}'][data-col='${i}']`);
        const colCell = document.querySelector(`input[data-row='${i}'][data-col='${col}']`);
        rowCell?.classList.add("highlight");
        colCell?.classList.add("highlight");
    }
}
export function highlightSubGrid(row, col) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const cell = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);
            cell?.classList.add("highlight");
        }
    }
}
export function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight");
    });
}
||||||| parent of 7fff0b8 (push all)
=======
export function clearSameNumberHighlight() {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}
export function highlightSameNumbers(value) {
    if (!value)
        return;
    document.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}
>>>>>>> 7fff0b8 (push all)
