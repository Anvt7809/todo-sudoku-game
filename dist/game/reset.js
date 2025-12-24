export function resetBoard(board) {
    const inputs = board.querySelectorAll("input");
    inputs.forEach(cell => {
        const input = cell;
        // Skip fixed cells
        if (input.readOnly)
            return;
        input.value = "";
        input.classList.remove("invalid", "highlight", "same-number");
    });
    // Clear any remaining highlights (safety)
    clearHighlights();
    clearSameNumberHighlight();
}
