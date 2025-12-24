import { setSelectedCell } from "./state/selection.js";
import { registerInput } from "./input/boardInput.js";
import { registerKeypad } from "./input/keypadOnClick.js";
import { createBoard } from "./board/createBoard.js";
import { startTimer } from "./game/timer.js";
import { registerOnClick } from "./input/boardOnClick.js";
import { registerPauseButton, registerResumeButton } from "./input/pauseButton.js";
import { registerResetButton } from "./input/resetButton.js";
const puzzle = [
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
    const board = document.getElementById("sudoku-board");
    const keypad = document.getElementById("keypad");
    const timer = document.getElementById("timer");
    const pauseBtn = document.getElementById("pause-btn");
    const resumeBtn = document.getElementById("resume-btn");
    const resetBtn = document.getElementById("reset-btn");
    // Build UI
    createBoard(board, puzzle);
    // Register behavior
    registerOnClick(board);
    registerInput(board);
    registerKeypad(keypad);
    registerPauseButton(pauseBtn);
    registerResumeButton(resumeBtn);
    registerResetButton(resetBtn, board);
    // Start game systems
    startTimer(timer);
});
