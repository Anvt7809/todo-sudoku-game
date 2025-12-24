<<<<<<< HEAD
export function createBoard(board, puzzle) {
    board.innerHTML = "";
    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "9";
            if (value !== 0) {
                input.value = value.toString();
                input.readOnly = true;
                cell.classList.add("fixed");
            }
            input.dataset.row = rowIndex.toString();
            input.dataset.col = colIndex.toString();
            cell.appendChild(input);
            board.appendChild(cell);
        });
    });
}
||||||| parent of 7fff0b8 (push all)
=======
export function createBoard(board, puzzle) {
    board.innerHTML = "";
    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "9";
            if (value !== 0) {
                input.value = value.toString();
                input.readOnly = true;
                cell.classList.add("fixed");
            }
            input.dataset.row = rowIndex.toString();
            input.dataset.col = colIndex.toString();
            cell.appendChild(input);
            board.appendChild(cell);
        });
    });
}
>>>>>>> 7fff0b8 (push all)
