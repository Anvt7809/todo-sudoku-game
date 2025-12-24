import { registerInput } from "./input/boardInput.js";
import { registerKeypad } from "./input/keypadOnClick.js";

import { createBoard } from "./board/createBoard.js";
import { startTimer, resetTimer } from "./game/timer.js";
import { registerOnClick } from "./input/boardOnClick.js";

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

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("sudoku-board")!;
    const keypad = document.getElementById("keypad")!;
    const timer = document.getElementById("timer")!;

    // Build UI
    createBoard(board, puzzle);

    // Register behavior
    registerOnClick(board);
    registerInput(board);
    registerKeypad(keypad);

    // Start game systems
    startTimer(timer);
});