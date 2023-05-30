<script setup lang="ts">
import { watch, ref, computed, reactive } from 'vue';
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

const gameStateFromLocalStorage = localStorage.getItem('gameState');
if (gameStateFromLocalStorage) {
    Object.assign(gameState, JSON.parse(gameStateFromLocalStorage));
}

watch(gameState, (gameStateFromLocalStorage) => {
    localStorage.setItem('gameState', JSON.stringify(gameStateFromLocalStorage));
});

const playGame = (index: number) => {
};
</script>

<template>
    <div class="ticTacToeGame">
      <div class="gameBoardShow" v-if="gameState.users.nameX.length>0 && gameState.users.nameO.length>0">  
      <GameBoard :gameState="gameState" @play="playGame" />
     

      </div>
      <div class="aside" v-if="gameState.users.nameX.length>0 && gameState.users.nameO.length>0">
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
  
<style scoped>
    .ticTacToeGame{
        background-color: sandybrown;
        border: 5px solid rgb(90, 42, 7);
        padding: 2rem;
        border-radius: 10px;
        /* width:max-content; */
        height:fit-content;
    }

    .gameBoardShow {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .aside {
        position: relative;
        display: contents;
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