const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let isX = true;
let gameState = Array(9).fill(null);

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', onCellClick);
});

resetButton.addEventListener('click', resetGame);

function onCellClick(event) {
    const index = event.target.dataset.index;
    if (gameState[index] || checkWinner()) return;

    gameState[index] = isX ? 'X' : 'O';
    event.target.textContent = gameState[index];
    isX = !isX;
    statusText.textContent = `Player ${isX ? 'X' : 'O'}'s turn`;

    if (checkWinner()) {
        statusText.textContent = `Player ${isX ? 'O' : 'X'} wins!`;
    } else if (!gameState.includes(null)) {
        statusText.textContent = 'Draw!';
    }
}

function checkWinner() {
    return winningPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    statusText.textContent = "Player X's turn";
    isX = true;
}
