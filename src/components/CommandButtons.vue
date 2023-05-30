<template>
    <div class="commandButtons">
        <div class="restartGame" v-if="gameState.gameOver">
            <button @click="restartGame">Starta om</button>
            <button @click="newGame">Spela med nya spelare</button>

        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IGameState } from '../models/IGameState';
  
  const props = defineProps<{
    gameState: IGameState;
  }>();
  
  const restartGame = () => {
    props.gameState.gameboard = ["","","","","","","","","",];
    props.gameState.gameOver = false;

  };
  
  const newGame = () => {
    props.gameState.gameboard = ["","","","","","","","","",];
    props.gameState.gameOver = false;
    props.gameState.users.nameX = "";
    props.gameState.users.nameO = "";
    props.gameState.scores.scoresX= 0;
    props.gameState.scores.scoresO= 0;

    
  };
  </script>
  
  <style scoped>
  .commandButtons {
    margin-top: 20px;
  }
  </style>
  

<style scoped>
    .restartGame {
        margin: 1rem;
        position: absolute;
        margin-top: 3rem;
    }

    button {
        margin: 1rem;
        background-color:rgb(90, 42, 7);
        color: sandybrown
    }
</style>