<<<<<<< HEAD
function getAllCells(): HTMLInputElement[] {
    return Array.from(
        document.querySelectorAll<HTMLInputElement>("input")
    );
}

function isBoardFilled(): boolean {
    return getAllCells().every(cell => cell.value !== "");
}

function hasInvalidCells(): boolean {
    return getAllCells().some(cell => cell.classList.contains("invalid"));
}

export function checkGameCompleted() {
    if (!isBoardFilled()) return;
    if (hasInvalidCells()) return;

    // 🎉 GAME COMPLETED
    alert("🎉 Congratulations! You solved the Sudoku!");
}
||||||| parent of 7fff0b8 (push all)
=======
function getAllCells(): HTMLInputElement[] {
    return Array.from(
        document.querySelectorAll<HTMLInputElement>("input")
    );
}

function isBoardFilled(): boolean {
    return getAllCells().every(cell => cell.value !== "");
}

function hasInvalidCells(): boolean {
    return getAllCells().some(cell => cell.classList.contains("invalid"));
}

export function checkGameCompleted() {
    if (!isBoardFilled()) return;
    if (hasInvalidCells()) return;

    // 🎉 GAME COMPLETED
    alert("🎉 Congratulations! You solved the Sudoku!");
}
>>>>>>> 7fff0b8 (push all)
