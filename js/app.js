// STEP 1: Initialize the game state variables
let board = [
    ['', '', ''], // Row 0
    ['', '', ''], // Row 1
    ['', '', ''], // Row 2
    ['', '', ''], // Row 3
    ['', '', ''], // Row 4
    ['', '', ''], // Row 5
    ['', '', ''], // Row 6
    ['', '', ''], // Row 7
  ];
  
  let turn = 'X'; // X starts
  let winner = null; // No winner
  let tie = false; // No tie
  
  // STEP 2: Cache references to the squares and the message element
const squareEls = document.querySelectorAll('.square'); // Square elements
const messageEl = document.querySelector('#message'); // Message element

// Verify the cached elements by printing
console.log(squareEls); // Logs squares
console.log(messageEl); // Logs message


// STEP 3:  Initialize the game state
function init() {
  console.log("Initializing game..."); // Initialization check
  board = ['', '', '', '', '', '', '', '', '']; // Empty squares
  turn = 'X'; // Start with X
  winner = false; // No winner
  tie = false; // No tie

  render(); // Render game state
}

// Call init() when the app loads
window.onload = init;


// STEP 4: Render function to update the board and message
function render() {
  console.log("Rendering game state...");
  updateBoard(); // Update board
  updateMessage(); // Update message
}

// Update the board based on the current state
function updateBoard() {
  board.forEach((cell, index) => {
    const square = squareEls[index]; // Square element
    square.textContent = cell; // Set text to 'X', 'O', or ''
    // Optional: Add styling based on the value in the cell
    if (cell === 'X') {
      square.style.color = 'blue'; // X color
    } else if (cell === 'O') {
      square.style.color = 'red'; // O color
    } else {
      square.style.color = 'black'; // Empty color
    }
  });
}

// Update the message displayed to the user
function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn}'s turn!`; // Player turn
  } else if (tie) {
    messageEl.textContent = "It's a tie!"; // Tie message
  } else {
    messageEl.textContent = `Congratulations! Player ${turn} wins!`; // Winner message
  }
}

// STEP 5: Define the eight possible winning combinations
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal TL-BR
    [2, 4, 6]  // Diagonal TR-BL
  ];
  
  console.log("Winning combinations defined:", winningCombos);
  

// STEP 6: a. Handle click function
function handleClick(event) {
  console.log("Square clicked!", event.target); // Log click
  // Logic to update game state
}

// adding event listeners here.
squareEls.forEach(square => {
  square.addEventListener('click', handleClick); // Attach click
});



// STEP 6.1: Function to place a piece
function placePiece(index) {
  // Update board
  board[index] = turn;
  console.log("Updated Board:", board); // Log board
}

// Handle click function
function handleClick(event) {
  // Get clicked square index
  const squareIndex = parseInt(event.target.id.replace('sq', ''));

  // Prevent action if square is filled or game has winner
  if (board[squareIndex] !== '') {
    console.log("Square already filled!");
    return;
  }

  // Place piece and update turn
  placePiece(squareIndex);

  // Additional logic like changing the turn and rendering updates will go here
}

// Add event listeners to each square
squareEls.forEach(square => {
  square.addEventListener('click', handleClick); // Attach click listener
});



// STEP 6.2: Function to check for a winner
function checkForWinner() {
  // Loop through each winning combination
  winningCombos.forEach(combo => {
    const [a, b, c] = combo; // Destructure indices
    // Check if positions match and are not empty
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true; // Winner found
      console.log(`${board[a]} wins!`);
    }
  });
}

// Function to place a piece
function placePiece(index) {
  board[index] = turn; // Update board
  console.log("Updated Board:", board); // Log board
}

// Handle click function
function handleClick(event) {
  const squareIndex = parseInt(event.target.id.replace('sq', '')); // Get square index
  if (board[squareIndex] !== '' || winner) return; // Prevent invalid moves

  placePiece(squareIndex); // Place piece
  checkForWinner(); // Check for winner

  // Change turn if no winner
  if (!winner) {
    turn = turn === 'X' ? 'O' : 'X';
  }
}

squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});


// STEP 6.3: Function to check for a tie
function checkForTie() {
  // If there's already a winner, exit
  if (winner) return;

  // Check for empty squares
  tie = board.every(cell => cell !== '');

  console.log("Is it a tie?", tie); // Log tie status
}

// HandleClick function integration
function handleClick(event) {
  const squareIndex = parseInt(event.target.id.replace('sq', '')); // Get index

  // Prevent clicking if square filled or game over
  if (board[squareIndex] !== '' || winner) return;

  placePiece(squareIndex); // Place piece
  checkForWinner();        // Check winner
  checkForTie();           // Check tie

  // Switch turn if game isn't over
  if (!winner && !tie) {
    turn = turn === 'X' ? 'O' : 'X';
  }
}



// STEP 6.4: Function to switch the player's turn
function switchPlayerTurn() {
    // If winner, don't switch
    if (winner) return;
  
    // Switch turn
    turn = turn === 'X' ? 'O' : 'X';
  
    console.log("Current turn:", turn); // Log turn
  }
  
  // Updated handleClick function with switchPlayerTurn integration
  function handleClick(event) {
    const squareIndex = parseInt(event.target.id.replace('sq', '')); // Get index
  
    // Prevent clicking if square filled or game over
    if (board[squareIndex] !== '' || winner) return;
  
    placePiece(squareIndex); // Place piece
    checkForWinner();        // Check winner
    checkForTie();           // Check tie
    switchPlayerTurn();      // Switch turn
}



// STEP 6.5: Render function to update the UI
function render() {
    updateBoard();    // Update board UI
    updateMessage();  // Update message UI
}
  
  // Updated handleClick function
  function handleClick(event) {
    const squareIndex = parseInt(event.target.id.replace('sq', '')); // Get index
  
    // Prevent clicking if square filled or game over
    if (board[squareIndex] !== '' || winner) return;
  
    placePiece(squareIndex); // Place piece
    checkForWinner();        // Check winner
    checkForTie();           // Check tie
    switchPlayerTurn();      // Switch turn
  
    render(); // Update UI
}
  

// STEP 7: Cached element reference for the reset button
const resetBtnEl = document.getElementById('reset');

// Attach event listener to reset button
resetBtnEl.addEventListener('click', init);

// Final version of the init function (Step 3 already implemented previously)
function init() {
  board = ['', '', '', '', '', '', '', '', '']; // Reset board
  winner = null;                               // Reset winner
  tie = false;                                 // Reset tie
  turn = 'X';                                  // Reset turn

  render(); // Update UI
}
