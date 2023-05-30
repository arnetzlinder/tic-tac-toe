<template>
    <div class="ticTacToeGame">
      <div class="gameBoardShow" v-if="gameState.users.nameX.length>0 && gameState.users.nameO.length>0">  
      <GameBoard :gameState="gameState" @play="playGame" />
     

      </div>
      <div class="aside">
        <ShowScores :gameState="gameState"/>
      </div>
      <div>
        <CommandButtons :gameState="gameState"/>
      </div>
      <div v-if="gameState.users.nameX.length==0">
      <AskUsername :xoro="'X'" :gameState="gameState"/>
      </div>
      <div v-else-if="gameState.users.nameO.length==0">
      <AskUsername :xoro="'O (hint: use \'CPU\')'" :gameState="gameState"/>
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import GameBoard from './GameBoard.vue';
  import CommandButtons from './CommandButtons.vue';
  import AskUsername from './AskUsername.vue';
  import { IGameState } from '../models/IGameState';
import ShowScores from './ShowScores.vue';
  
  const gameState = reactive<IGameState>({
    gameboard: ["", "", "", "", "", "", "", "", ""],
    showScores: false,
    users: {
      nameX: "",
      nameO: "",
    },
    scores: {
      scoresX: 0,
      scoresO: 0,
    },
    isXturn: true,
    gameOver: false,
  });
//localStorage.getItem('gameState');


  const playGame = (index: number) => {
    console.log("Square clicked:", index);
    // Modify the game state accordingly
  };
  </script>
  
<style scoped>
    .ticTacToeGame{
        background-color: sandybrown;
        border: 5px solid rgb(90, 42, 7);
        padding: 2rem;
        border-radius: 10px;
    }

    .gameBoardShow {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .aside {
        position: absolute;
        border: 5px solid rgb(90, 42, 7);
        background-color: sandybrown;
        color: rgb(90, 42, 7);
        right: 0;
        top: 0;
        border-radius: 10px;
        margin-right:2rem;
        margin-top:2rem;
        padding: 2rem;
    }
</style>