function getValue(row: number, col: number): number {
    const input = document.querySelector(
        `input[data-row='${row}'][data-col='${col}']`
    ) as HTMLInputElement;

    return Number(input.value);
}

export function isValid(row: number, col: number, value: number): boolean {
    // Check row
    for (let c = 0; c < 9; c++) {
        if (c !== col && getValue(row, c) === value) {
            return false;
        }
    }

    // Check column
    for (let r = 0; r < 9; r++) {
        if (r !== row && getValue(r, col) === value) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if ((r !== row || c !== col) && getValue(r, c) === value) {
                return false;
            }
        }
    }

    return true;
}