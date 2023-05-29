<template>
    <div>
      <div v-if="gameState.users.nameX.length>0 && gameState.users.nameO.length>0">  
      <GameBoard :gameState="gameState" @play="playGame" />
      <CommandButtons :gameState="gameState"/>
      
      </div>
      <div v-if="gameState.users.nameX.length==0">
      <AskUsername :xoro="'X'" :gameState="gameState"/>
      </div>
      <div v-else-if="gameState.users.nameO.length==0">
      <AskUsername :xoro="'O'" :gameState="gameState"/>
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import GameBoard from './GameBoard.vue';
  import CommandButtons from './CommandButtons.vue';
  import AskUsername from './AskUsername.vue';
  import { IGameState } from '../models/IGameState';
  
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
    isXturn: false,
    gameOver: false,
  });
//localStorage.getItem('gameState');


  const playGame = (index: number) => {
    console.log("Square clicked:", index);
    // Modify the game state accordingly
  };
  </script>
  
<style scoped>

</style>