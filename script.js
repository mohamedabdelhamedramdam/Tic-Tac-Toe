// DOM Elements
const container = document.querySelector(".container");
const btn = document.getElementById("reset");
const board = document.createElement("div");
let clickCount = 0;
let gameStopped = false;

// Set up the game board
board.classList.add("board");
container.insertAdjacentElement("afterbegin", board);

/**
 * Generates a grid with the given number of cells per row/column.
 * @param {number} numOfCells - The number of cells in each row/column.
 */
function grid(numOfCells) {
    board.innerHTML = ''; // Clear the board
    board.style.setProperty('--grid-rows', numOfCells); // Set CSS grid property
    for (let row = 0; row < numOfCells; row++) {
        for (let col = 0; col < numOfCells; col++) {
            const cell = document.createElement("div");
            const span = document.createElement("span");
            cell.classList.add('cell');
            span.classList.add('value');
            cell.appendChild(span);
            board.appendChild(cell);
        }
    }
}

// Initialize a 3x3 grid
grid(3);

// Select all the cells and value spans
const cells = document.querySelectorAll(".cell");
const values = document.querySelectorAll(".value");

/**
 * Handles a player's move by updating the clicked cell.
 * @param {HTMLElement} cell - The cell that was clicked.
 */
function draw(cell) {
    clickCount++;
    if (gameStopped) return; // If the game is over, exit

    // Make each cell focusable for better accessibility
    cells.forEach((cell, index) => {
        cell.setAttribute("tabindex", `${index + 1}`);
    });

    const span = cell.querySelector('span');
    if (span.innerText !== '') return; // If the cell is already filled, exit

    if (clickCount % 2 === 0) {
        span.classList.add('cell--O');
        span.innerText = "O"; // Player O's turn
    } else {
        span.classList.add('cell--x');
        span.innerText = "X"; // Player X's turn
    }
}

/**
 * Checks if there is a winner or if the game should continue.
 * @param {NodeList} values - The list of value elements in the cells.
 * @returns {boolean} - Whether the game has ended.
 */
function check(values) {
    // Winning combinations: rows, columns, diagonals
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (values[a].innerText && values[a].innerText === values[b].innerText && values[a].innerText === values[c].innerText) {
            alert(`${values[a].innerText} wins!`);
            gameStopped = true; // Stop the game
            return true;
        }
    }

    if (clickCount === 9) {
        alert("It's a tie!");
        gameStopped = true; // Stop the game
    }
    return false;
}

/**
 * Resets the game board and state.
 * @param {NodeList} values - The list of value elements in the cells.
 */
function clear(values) {
    values.forEach((value) => {
        value.innerText = ""; // Clear the cell text
        value.classList.remove('cell--X', 'cell--O'); // Remove player classes
    });
    clickCount = 0; // Reset click count
    gameStopped = false; // Allow the game to continue
}

// Event Listener for the reset button
btn.addEventListener('click', () => {
    clear(values);
});

// Event Listeners for cell clicks
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        draw(cell);
        check(values);
    });
});
