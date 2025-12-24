<<<<<<< HEAD
"use strict";
// =======================
// Sudoku Puzzle Data
// =======================
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
const originalPuzzle = puzzle.map(row => [...row]);
// =======================
// DOM Elements
// =======================
const timer = document.getElementById("timer");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const board = document.getElementById("sudoku-board");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const pauseOverlay = document.getElementById("pauseOverlay");
let isPaused = false;
let selectedCell = null;
// =======================
// Create Sudoku Board
// =======================
function createBoard() {
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
// =======================
// Helpers
// =======================
function getValue(row, col) {
    const input = document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
    return Number(input.value);
}
function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight");
    });
}
function highlightRowAndColumn(row, col) {
    for (let i = 0; i < 9; i++) {
        const rowCell = document.querySelector(`input[data-row='${row}'][data-col='${i}']`);
        const colCell = document.querySelector(`input[data-row='${i}'][data-col='${col}']`);
        rowCell?.classList.add("highlight");
        colCell?.classList.add("highlight");
    }
}
function highlightSubGrid(row, col) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const cell = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);
            cell?.classList.add("highlight");
        }
    }
}
function clearSameNumberHighlight() {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}
function highlightSameNumbers(value) {
    if (!value)
        return;
    document.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}
function setBoardDisabled(disabled) {
    board.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.classList.contains("fixed"))
            return;
        input.readOnly = disabled;
    });
}
function getAllCells() {
    return Array.from(document.querySelectorAll("input"));
}
// =======================
// Validation Logic
// =======================
function isValid(row, col, value) {
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
// =======================
// Input Handling
// =======================
board.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement))
        return;
    const input = target;
    if (!selectedCell)
        return;
    // Prevent editing fixed cells
    if (selectedCell.readOnly)
        return;
    const row = Number(input.dataset.row);
    const col = Number(input.dataset.col);
    if (Number.isNaN(row) || Number.isNaN(col))
        return;
    const value = Number(input.value);
    // Reset state
    input.classList.remove("invalid");
    clearSameNumberHighlight();
    // Empty or invalid range
    if (value < 1 || value > 9) {
        input.value = "";
        return;
    }
    // Validation
    if (!isValid(row, col, value)) {
        input.classList.add("invalid");
        return;
    }
    highlightSameNumbers(input.value);
    checkGameCompleted();
});
// =======================
// On click handling
// =======================
board.addEventListener("focusin", (event) => {
    const input = event.target;
    if (!input.dataset.row || !input.dataset.col)
        return;
    const row = Number(input.dataset.row);
    const col = Number(input.dataset.col);
    clearHighlights();
    clearSameNumberHighlight();
    highlightRowAndColumn(row, col);
    highlightSubGrid(row, col);
    highlightSameNumbers(input.value);
});
board.addEventListener("focusout", () => {
    clearHighlights();
    //    clearSameNumberHighlight();
});
// =======================
// Check Solution
// =======================
checkBtn.addEventListener("click", () => {
    let isComplete = true;
    document.querySelectorAll("input").forEach((el) => {
        const input = el;
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        const value = Number(input.value);
        if (!value || !isValid(row, col, value)) {
            isComplete = false;
        }
    });
    alert(isComplete ? "🎉 Correct!" : "❌ Something is wrong");
});
// =======================
// Reset board
// =======================
resetBtn.addEventListener("click", () => {
    // Restore puzzle values
    resetBoard();
    // Reset timer
    resetTimer();
    isPaused = false;
    pauseBtn.textContent = "Pause";
    document.body.classList.remove("paused");
    pauseOverlay.classList.remove("show");
    // Re-render board: 
    createBoard();
    startTimer();
});
function resetBoard() {
    const inputs = board.querySelectorAll("input");
    inputs.forEach(el => {
        const input = el;
        // Skip fixed cells
        if (input.classList.contains("fixed"))
            return;
        input.value = "";
        input.classList.remove("invalid", "highlight", "same-number");
    });
    // Clear any remaining highlights (safety)
    clearHighlights();
    clearSameNumberHighlight();
}
// =======================
// Timer
// =======================
let secondsElapsed = 0;
let timerInterval = null;
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}
function startTimer() {
    if (timerInterval !== null)
        return;
    timerInterval = window.setInterval(() => {
        secondsElapsed++;
        timer.textContent = formatTime(secondsElapsed);
    }, 1000);
}
function resetTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    secondsElapsed = 0;
    timer.textContent = "00:00";
}
// =======================
// Pause/Resume timer
// =======================
pauseBtn.addEventListener("click", () => {
    pauseGame();
    pauseBtn.textContent = "Resume";
});
resumeBtn.addEventListener("click", () => {
    resumeGame();
    pauseBtn.textContent = "Pause";
});
function pauseGame() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isPaused = true;
    setBoardDisabled(true);
    document.body.classList.add("paused");
    pauseOverlay.classList.add("show");
}
function resumeGame() {
    isPaused = false;
    startTimer();
    setBoardDisabled(false);
    document.body.classList.remove("paused");
    pauseOverlay.classList.remove("show");
}
// =======================
// Keypad
// =======================
board.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName !== "INPUT")
        return;
    const input = target;
    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }
    clearSameNumberHighlight();
    if (input.value) {
        highlightSameNumbers(input.value);
    }
    selectedCell = input;
    selectedCell.classList.add("selected");
});
const keypad = document.getElementById("keypad");
keypad.addEventListener("click", (event) => {
    if (!selectedCell)
        return;
    // Prevent editing fixed cells
    if (selectedCell.readOnly)
        return;
    const button = event.target;
    const num = button.dataset.num;
    if (!num)
        return;
    selectedCell.classList.remove("invalid", "valid");
    if (num === "clear") {
        selectedCell.value = "";
        clearSameNumberHighlight();
        return;
    }
    const value = Number(num);
    selectedCell.value = value.toString();
    const row = Number(selectedCell.dataset.row);
    const col = Number(selectedCell.dataset.col);
    if (!isValid(row, col, value)) {
        selectedCell.classList.add("invalid");
    }
    else {
        selectedCell.classList.add("valid");
    }
    clearSameNumberHighlight();
    highlightSameNumbers(value.toString());
    checkGameCompleted();
});
// =======================
// End game check
// =======================
function isBoardFilled() {
    return getAllCells().every(cell => cell.value !== "");
}
function hasInvalidCells() {
    return getAllCells().some(cell => cell.classList.contains("invalid"));
}
function checkGameCompleted() {
    if (!isBoardFilled())
        return;
    if (hasInvalidCells())
        return;
    // 🎉 GAME COMPLETED
    alert("🎉 Congratulations! You solved the Sudoku!");
}
// =======================
// Initialize
// =======================
createBoard();
startTimer();
document.body.classList.remove("paused");
pauseOverlay.classList.remove("show");
||||||| parent of 7fff0b8 (push all)
=======
"use strict";
// =======================
// Sudoku Puzzle Data
// =======================
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
const originalPuzzle = puzzle.map(row => [...row]);
// =======================
// DOM Elements
// =======================
const timer = document.getElementById("timer");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const board = document.getElementById("sudoku-board");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const pauseOverlay = document.getElementById("pauseOverlay");
let isPaused = false;
let selectedCell = null;
// =======================
// Create Sudoku Board
// =======================
function createBoard() {
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
// =======================
// Helpers
// =======================
function getValue(row, col) {
    const input = document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
    return Number(input.value);
}
function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight");
    });
}
function highlightRowAndColumn(row, col) {
    for (let i = 0; i < 9; i++) {
        const rowCell = document.querySelector(`input[data-row='${row}'][data-col='${i}']`);
        const colCell = document.querySelector(`input[data-row='${i}'][data-col='${col}']`);
        rowCell?.classList.add("highlight");
        colCell?.classList.add("highlight");
    }
}
function highlightSubGrid(row, col) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const cell = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);
            cell?.classList.add("highlight");
        }
    }
}
function clearSameNumberHighlight() {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}
function highlightSameNumbers(value) {
    if (!value)
        return;
    document.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}
function setBoardDisabled(disabled) {
    board.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.classList.contains("fixed"))
            return;
        input.readOnly = disabled;
    });
}
function getAllCells() {
    return Array.from(document.querySelectorAll("input"));
}
// =======================
// Validation Logic
// =======================
function isValid(row, col, value) {
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
// =======================
// Input Handling
// =======================
board.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement))
        return;
    const input = target;
    if (!selectedCell)
        return;
    // Prevent editing fixed cells
    if (selectedCell.readOnly)
        return;
    const row = Number(input.dataset.row);
    const col = Number(input.dataset.col);
    if (Number.isNaN(row) || Number.isNaN(col))
        return;
    const value = Number(input.value);
    // Reset state
    input.classList.remove("invalid");
    clearSameNumberHighlight();
    // Empty or invalid range
    if (value < 1 || value > 9) {
        input.value = "";
        return;
    }
    // Validation
    if (!isValid(row, col, value)) {
        input.classList.add("invalid");
        return;
    }
    highlightSameNumbers(input.value);
    checkGameCompleted();
});
// =======================
// On click handling
// =======================
board.addEventListener("focusin", (event) => {
    const input = event.target;
    if (!input.dataset.row || !input.dataset.col)
        return;
    const row = Number(input.dataset.row);
    const col = Number(input.dataset.col);
    clearHighlights();
    clearSameNumberHighlight();
    highlightRowAndColumn(row, col);
    highlightSubGrid(row, col);
    highlightSameNumbers(input.value);
});
board.addEventListener("focusout", () => {
    clearHighlights();
    //    clearSameNumberHighlight();
});
// =======================
// Check Solution
// =======================
checkBtn.addEventListener("click", () => {
    let isComplete = true;
    document.querySelectorAll("input").forEach((el) => {
        const input = el;
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        const value = Number(input.value);
        if (!value || !isValid(row, col, value)) {
            isComplete = false;
        }
    });
    alert(isComplete ? "🎉 Correct!" : "❌ Something is wrong");
});
// =======================
// Reset board
// =======================
resetBtn.addEventListener("click", () => {
    // Restore puzzle values
    resetBoard();
    // Reset timer
    resetTimer();
    isPaused = false;
    pauseBtn.textContent = "Pause";
    document.body.classList.remove("paused");
    pauseOverlay.classList.remove("show");
    // Re-render board: 
    createBoard();
    startTimer();
});
function resetBoard() {
    const inputs = board.querySelectorAll("input");
    inputs.forEach(el => {
        const input = el;
        // Skip fixed cells
        if (input.classList.contains("fixed"))
            return;
        input.value = "";
        input.classList.remove("invalid", "highlight", "same-number");
    });
    // Clear any remaining highlights (safety)
    clearHighlights();
    clearSameNumberHighlight();
}
// =======================
// Timer
// =======================
let secondsElapsed = 0;
let timerInterval = null;
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}
function startTimer() {
    if (timerInterval !== null)
        return;
    timerInterval = window.setInterval(() => {
        secondsElapsed++;
        timer.textContent = formatTime(secondsElapsed);
    }, 1000);
}
function resetTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    secondsElapsed = 0;
    timer.textContent = "00:00";
}
// =======================
// Pause/Resume timer
// =======================
pauseBtn.addEventListener("click", () => {
    pauseGame();
    pauseBtn.textContent = "Resume";
});
resumeBtn.addEventListener("click", () => {
    resumeGame();
    pauseBtn.textContent = "Pause";
});
function pauseGame() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isPaused = true;
    setBoardDisabled(true);
    document.body.classList.add("paused");
    pauseOverlay.classList.add("show");
}
function resumeGame() {
    isPaused = false;
    startTimer();
    setBoardDisabled(false);
    document.body.classList.remove("paused");
    pauseOverlay.classList.remove("show");
}
// =======================
// Keypad
// =======================
board.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName !== "INPUT")
        return;
    const input = target;
    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }
    clearSameNumberHighlight();
    if (input.value) {
        highlightSameNumbers(input.value);
    }
    selectedCell = input;
    selectedCell.classList.add("selected");
});
const keypad = document.getElementById("keypad");
keypad.addEventListener("click", (event) => {
    if (!selectedCell)
        return;
    // Prevent editing fixed cells
    if (selectedCell.readOnly)
        return;
    const button = event.target;
    const num = button.dataset.num;
    if (!num)
        return;
    selectedCell.classList.remove("invalid", "valid");
    if (num === "clear") {
        selectedCell.value = "";
        clearSameNumberHighlight();
        return;
    }
    const value = Number(num);
    selectedCell.value = value.toString();
    const row = Number(selectedCell.dataset.row);
    const col = Number(selectedCell.dataset.col);
    if (!isValid(row, col, value)) {
        selectedCell.classList.add("invalid");
    }
    else {
        selectedCell.classList.add("valid");
    }
    clearSameNumberHighlight();
    highlightSameNumbers(value.toString());
    checkGameCompleted();
});
// =======================
// End game check
// =======================
function isBoardFilled() {
    return getAllCells().every(cell => cell.value !== "");
}
function hasInvalidCells() {
    return getAllCells().some(cell => cell.classList.contains("invalid"));
}
function checkGameCompleted() {
    if (!isBoardFilled())
        return;
    if (hasInvalidCells())
        return;
    // 🎉 GAME COMPLETED
    alert("🎉 Congratulations! You solved the Sudoku!");
}
// =======================
// Initialize
// =======================
createBoard();
startTimer();
document.body.classList.remove("paused");
pauseOverlay.classList.remove("show");
>>>>>>> 7fff0b8 (push all)
