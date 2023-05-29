<template>
    <div>
        <h1>Välkommen till tre-i-rad</h1>
        <p>Fyll i namnet på spelare x och o och spela därefter</p>
        <label>Namnet på spelare {{ xoro }}</label>
        <input v-model="name" class="askPlayer"/>
        <button class="usernameBtn" @click="() => submitUserName(xoro, gameState)">Nästa</button>
    </div>
</template>

<script setup lang="ts">
let name = "";
  import { IGameState } from '../models/IGameState';
  const props = defineProps<{
    xoro: string;
    gameState: IGameState;
  }>();
  
  const submitUserName = (xoro: string, gameState: IGameState) => {
    if (xoro === 'X') {
        console.log("Setting name for X to " + name)
        gameState.users.nameX = name;
        // gameState.users.nameX = askPlayer
    } else {
        console.log("Setting name for O to " + name)
        gameState.users.nameO = name;
    
    }


  };
</script>

<style scoped>
    .usernameBtn {
        border-radius: 1rem;
        padding: 1rem;
        background-color: aqua;
        margin: 1rem;
    }

    input {
        border-radius: 1rem;
        padding: 1rem;
        font-size: 1rem;
    }

    label {
        font-size: 1.5rem;
        margin: 1rem;
    }
</style>