import { setSelectedCell } from "./state/selection.js";
import { registerInput } from "./input/boardInput.js";
import { registerKeypad } from "./input/keypad.js";

import { createBoard } from "./board/createBoard.js";
import { startTimer, resetTimer } from "./game/timer.js";

const boardEl = document.getElementById("sudoku-board")!;
const puzzle: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
const timer = document.getElementById("timer")!;

createBoard(boardEl, puzzle);
//const originalPuzzle: number[][] = puzzle.map(row => [...row]);
startTimer(timer);

const board = document.getElementById("sudoku-board")!;
const keypad = document.getElementById("keypad")!;

registerInput(board);
registerKeypad(keypad);

// cell selection
board.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    setSelectedCell(target);
});