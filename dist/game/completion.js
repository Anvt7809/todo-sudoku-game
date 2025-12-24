function getAllCells() {
    return Array.from(document.querySelectorAll("input"));
}
function isBoardFilled() {
    return getAllCells().every(cell => cell.value !== "");
}
function hasInvalidCells() {
    return getAllCells().some(cell => cell.classList.contains("invalid"));
}
export function checkGameCompleted() {
    if (!isBoardFilled())
        return;
    if (hasInvalidCells())
        return;
    // 🎉 GAME COMPLETED
    alert("🎉 Congratulations! You solved the Sudoku!");
}
