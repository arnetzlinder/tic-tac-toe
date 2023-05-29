<template>
    <h1>Det är {{ currentUser }}s tur!</h1>
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
  
  const props = defineProps<{
    gameState: IGameState;
  }>();
  
  
  let currentUser = props.gameState.users.nameO;
  
  const play = (index: number) => {
    if (props.gameState.gameOver) {
        console.log("Game is already over")
      // Game is already over, do nothing
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
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      const currentPlayer = gameboard[index];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          gameboard[a] === currentPlayer &&
          gameboard[b] === currentPlayer &&
          gameboard[c] === currentPlayer
        ) {
          window.alert(`${currentPlayer} won!`);
          props.gameState.gameOver = true;
          break;
        }
      }
  
      // Check for a tie
      const isTie = gameboard.every((square) => square !== '');
      if (isTie) {
        window.alert("It's a tie!");
        props.gameState.gameOver = true;
      }
    }
  };
  </script>
  
<style scoped>
    .gameBoard {
        width: 20rem;
        height: 20rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        }

        .div1 { grid-area: 1 / 1 / 2 / 2; }
        .div2 { grid-area: 2 / 1 / 3 / 2; }
        .div3 { grid-area: 3 / 1 / 4 / 2; }
        .div4 { grid-area: 1 / 2 / 2 / 3; }
        .div5 { grid-area: 2 / 2 / 3 / 3; }
        .div6 { grid-area: 3 / 2 / 4 / 3; }
        .div7 { grid-area: 1 / 3 / 2 / 4; }
        .div8 { grid-area: 2 / 3 / 3 / 4; }
        .div9 { grid-area: 3 / 3 / 4 / 4; }

</style>