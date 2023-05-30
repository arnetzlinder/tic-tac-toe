<template>
    <aside class="scoreShow">
        <h1> Nuvarande ställning:</h1>
        <p>{{ props.gameState.users.nameO }} har {{ props.gameState.scores.scoresO }} poäng!</p>
        <p> {{ props.gameState.users.nameX }} har {{ props.gameState.scores.scoresX }} poäng!</p>
    </aside>
</template>

<script setup lang="ts">
import { IGameState } from '../models/IGameState';
const props = defineProps<{
    gameState: IGameState;
  }>();
</script>

<style scoped>

</style>