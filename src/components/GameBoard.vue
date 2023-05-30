<template>
    <h1 v-if="!gameState.gameOver">Det är {{ currentUser }}s tur!</h1>
    <h1 v-else>Spelet är slut!</h1>
    <div class="gameBoard">
      <SingleSquare
        v-for="(square, index) in gameState.gameboard"
        :key="index"
        :state="square"
        :clickable="!gameState.gameOver && square === ''"
        @click="() => play(index)"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import SingleSquare from './SingleSquare.vue';
  import { IGameState } from '../models/IGameState';
  //import '../helpers/ai';
  
  const props = defineProps<{
    gameState: IGameState;
  }>();
  
  
  let currentUser = props.gameState.users.nameX;
  
  const play = (index: number) => {
    if (props.gameState.gameOver) {
      return;
    }
  
    const { gameboard } = props.gameState;
    if (gameboard[index].length === 0) {
      if (props.gameState.isXturn) {
        gameboard[index] = 'X';
        currentUser = props.gameState.users.nameO;
      } else {
        gameboard[index] = 'O';
        currentUser = props.gameState.users.nameX;
      }
      props.gameState.isXturn = !props.gameState.isXturn;
  
      // Check if someone won
      checkIfGameOver(index);

      if (gameboard[index] == 'X' && props.gameState.users.nameO === 'CPU') { 
      runAiMove();
      // a valid move was made. If the current user was X, and name of O 'CPU', run the AI instead.
      }
    }
  };


function checkIfGameOver(index: number) {
  const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      const currentPlayer = props.gameState.gameboard[index];
     
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          props.gameState.gameboard[a] === currentPlayer &&
          props.gameState.gameboard[b] === currentPlayer &&
          props.gameState.gameboard[c] === currentPlayer
        ) {
          if (currentPlayer == 'O') { 
            props.gameState.scores.scoresO++; 
        } else { props.gameState.scores.scoresX++; 
        }
          props.gameState.gameOver = true;
          break;
        }
      }
  
      // Check for a tie
      const isTie = props.gameState.gameboard.every((square) => square !== '');
      if (isTie) {
        props.gameState.gameOver = true;
      }

}

function runAiMove() {
  let aiBoard: string[][] = [[props.gameState.gameboard[0],props.gameState.gameboard[1],props.gameState.gameboard[2]],
                                  [props.gameState.gameboard[3],props.gameState.gameboard[4],props.gameState.gameboard[5]],
                                  [props.gameState.gameboard[6], props.gameState.gameboard[7],props.gameState.gameboard[8]]];
      let move = { row: -1, col: -1 };
      move = findBestMove(aiBoard);
      props.gameState.isXturn = !props.gameState.isXturn;
      props.gameState.gameboard[3*move.row+move.col] = 'O'
      checkIfGameOver(3*move.row+move.col);
      currentUser = props.gameState.users.nameX;
}

  function isMovesLeft(board: string[][])
{
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (board[i][j] == '')
                return true;
                  
    return false;
}

let player = 'O', opponent = 'X';

function evaluate(b: string[][])
{
      
    // Checking for Rows for X or O victory.
    for(let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2])
        {
            if (b[row][0] == player)
                return +10;
                  
            else if (b[row][0] == opponent)
                return -10;
        }
    }
   
    // Checking for Columns for X or O victory.
    for(let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col])
        {
            if (b[0][col] == player)
                return +10;
   
            else if (b[0][col] == opponent)
                return -10;
        }
    }
   
    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == player)
            return +10;
              
        else if (b[0][0] == opponent)
            return -10;
    }
   
    if (b[0][2] == b[1][1] && 
        b[1][1] == b[2][0])
    {
        if (b[0][2] == player)
            return +10;
              
        else if (b[0][2] == opponent)
            return -10;
    }
   
    // Else if none of them have
    // won then return 0
    return 0;
}

function minimax(board: string[][], depth: number, isMax: boolean)
{
    let score = evaluate(board);
   
    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10)
        return score;
   
    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10)
        return score;
   
    // If there are no more moves and
    // no winner then it is a tie
    if (isMovesLeft(board) == false)
        return 0;
   
    // If this maximizer's move
    if (isMax)
    {
        let best = -1000;
   
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                  
                // Check if cell is empty
                if (board[i][j]=='')
                {
                      
                    // Make the move
                    board[i][j] = player;
   
                    // Call minimax recursively 
                    // and choose the maximum value
                    best = Math.max(best, minimax(board,
                                    depth + 1, !isMax));
   
                    // Undo the move
                    board[i][j] = '';
                }
            }
        }
        return best;
    }
   
    // If this minimizer's move
    else
    {
        let best = 1000;
   
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                  
                // Check if cell is empty
                if (board[i][j] == '')
                {
                      
                    // Make the move
                    board[i][j] = opponent;
   
                    // Call minimax recursively and 
                    // choose the minimum value
                    best = Math.min(best, minimax(board,
                                    depth + 1, !isMax));
   
                    // Undo the move
                    board[i][j] = '';
                }
            }
        }
        return best;
    }
}

function findBestMove(board: string[][])
{
    let bestVal = -1000;
    let bestMove = { row: -1, col: -1 }
    bestMove.row = -1;
    bestMove.col = -1;
   
    // Traverse all cells, evaluate 
    // minimax function for all empty 
    // cells. And return the cell
    // with optimal value.
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
              
            // Check if cell is empty
            if (board[i][j] == '')
            {
                  
                // Make the move
                board[i][j] = player;
   
                // compute evaluation function 
                // for this move.
                let moveVal = minimax(board, 0, false);
   
                // Undo the move
                board[i][j] = '';
   
                // If the value of the current move 
                // is more than the best value, then 
                // update best
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
}

  </script>
  
<style scoped>

    h1 {
        color:rgb(90, 42, 7);
    }
    .gameBoard {
        width: 23rem;
        height: 23rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        background-color: sandybrown;
        color: rgb(90, 42, 7);
        }

        @media (width <= 740px) {
          .gameBoard {
            width: 20rem;
            height: 20rem;
          }

          h1 {
            font-size: 2rem;
          }
        }

</style>