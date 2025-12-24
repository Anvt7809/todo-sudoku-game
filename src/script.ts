// =======================
// Sudoku Puzzle Data
// =======================
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

const originalPuzzle: number[][] = puzzle.map(row => [...row]);

// =======================
// DOM Elements
// =======================
const timer = document.getElementById("timer") as HTMLDivElement;
const pauseBtn = document.getElementById("pause-btn") as HTMLButtonElement;
const resumeBtn = document.getElementById("resume-btn") as HTMLButtonElement;

const board = document.getElementById("sudoku-board") as HTMLDivElement;
const checkBtn = document.getElementById("check-btn") as HTMLButtonElement;
const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;

const pauseOverlay = document.getElementById("pauseOverlay") as HTMLDivElement;

let isPaused = false;
let selectedCell: HTMLInputElement | null = null;

// =======================
// Create Sudoku Board
// =======================
function createBoard(): void {
    board.innerHTML = "";

    puzzle.forEach((row: number[], rowIndex: number) => {
        row.forEach((value: number, colIndex: number) => {
            const cell: HTMLDivElement = document.createElement("div");
            cell.classList.add("cell");

            const input: HTMLInputElement = document.createElement("input");
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

function getValue(row: number, col: number): number {
    const input = document.querySelector(
        `input[data-row='${row}'][data-col='${col}']`
    ) as HTMLInputElement;

    return Number(input.value);
}

function clearHighlights(): void {
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight");
    });
}

function highlightRowAndColumn(row: number, col: number): void {
    for (let i = 0; i < 9; i++) {
        const rowCell = document.querySelector(
            `input[data-row='${row}'][data-col='${i}']`
        ) as HTMLInputElement;

        const colCell = document.querySelector(
            `input[data-row='${i}'][data-col='${col}']`
        ) as HTMLInputElement;

        rowCell?.classList.add("highlight");
        colCell?.classList.add("highlight");
    }
}

function highlightSubGrid(row: number, col: number): void {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const cell = document.querySelector(
                `input[data-row='${r}'][data-col='${c}']`
            ) as HTMLInputElement;

            cell?.classList.add("highlight");
        }
    }
}

function clearSameNumberHighlight(): void {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}

function highlightSameNumbers(value: string): void {
    if (!value) return;

    document.querySelectorAll("input").forEach(el => {
        const input = el as HTMLInputElement;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}

function setBoardDisabled(disabled: boolean): void {
    board.querySelectorAll("input").forEach(el => {
        const input = el as HTMLInputElement;

        if (input.classList.contains("fixed")) return;
        input.readOnly = disabled;
    });
}

function getAllCells(): HTMLInputElement[] {
    return Array.from(
        document.querySelectorAll<HTMLInputElement>("input")
    );
}

// =======================
// Validation Logic
// =======================

function isValid(row: number, col: number, value: number): boolean {
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
board.addEventListener("input", (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    const input = target;

    if (!selectedCell) return;

    // Prevent editing fixed cells
    if (selectedCell.readOnly) return;

    const row = Number(input.dataset.row);
    const col = Number(input.dataset.col);
    
    if (Number.isNaN(row) || Number.isNaN(col)) return;

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
board.addEventListener("focusin", (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.dataset.row || !input.dataset.col) return;

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
        const input = el as HTMLInputElement;
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

function resetBoard(): void {
    const inputs = board.querySelectorAll("input");

    inputs.forEach(el => {
        const input = el as HTMLInputElement;

        // Skip fixed cells
        if (input.classList.contains("fixed")) return;

        input.value = "";
        input.classList.remove(
            "invalid",
            "highlight",
            "same-number"
        );
    });

    // Clear any remaining highlights (safety)
    clearHighlights();
    clearSameNumberHighlight();
}

// =======================
// Timer
// =======================
let secondsElapsed = 0;
let timerInterval: number | null = null;

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}

function startTimer(): void {
    if (timerInterval !== null) return;

    timerInterval = window.setInterval(() => {
        secondsElapsed++;
        timer.textContent = formatTime(secondsElapsed);
    }, 1000);
}

function resetTimer(): void {
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


function pauseGame(): void {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isPaused = true;
    setBoardDisabled(true);

    document.body.classList.add("paused");
    pauseOverlay.classList.add("show");
}

function resumeGame(): void {
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
    const target = event.target as HTMLElement;

    if (target.tagName !== "INPUT") return;

    const input = target as HTMLInputElement;

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

const keypad = document.getElementById("keypad")!;
keypad.addEventListener("click", (event) => {
    if (!selectedCell) return;
    
    // Prevent editing fixed cells
    if (selectedCell.readOnly) return;

    const button = event.target as HTMLButtonElement;
    const num = button.dataset.num;

    if (!num) return;

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
    } else {
        selectedCell.classList.add("valid");
    }

    clearSameNumberHighlight();
    highlightSameNumbers(value.toString());
    checkGameCompleted();
});

// =======================
// End game check
// =======================
function isBoardFilled(): boolean {
    return getAllCells().every(cell => cell.value !== "");
}

function hasInvalidCells(): boolean {
    return getAllCells().some(cell => cell.classList.contains("invalid"));
}

function checkGameCompleted() {
    if (!isBoardFilled()) return;
    if (hasInvalidCells()) return;

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