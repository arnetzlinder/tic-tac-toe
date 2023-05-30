<template>
    <div class="welcome">
        <h1>Välkommen till tre-i-rad</h1>
        <p>Fyll i namnet på spelare X och O och spela därefter, om du vill spela mot datorn skriver du CPU som namn på spelare O</p>
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
        gameState.users.nameX = name;
        // gameState.users.nameX = askPlayer
    } else {
        gameState.users.nameO = name;
    
    }


  };
</script>

<style scoped>
    .usernameBtn {
        border-radius: 1rem;
        padding: 1rem;
        background-color: rgb(90, 42, 7);
        color:beige;
        margin: 1rem;
    }

    input {
        border-radius: 1rem;
        padding: 1rem;
        font-size: 1rem;
        color: rgb(90, 42, 7);
        font-weight: bolder;
    }

    label {
        font-size: 1.5rem;
        margin: 1rem;
    }

    p {
        line-break: auto;
    }

    .welcome {
        color: rgb(90, 42, 7);
    }

    @media (width <= 740px) {
        .welcome {
            max-width: 30rem;
        }

        h1 {
            font-size: 2rem;
        }
    }
</style>