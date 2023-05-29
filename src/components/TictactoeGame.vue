<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IGameState } from '../models/IGameState'
    const state = ref<IGameState>({
    gameboard: [],
    showScores: false,
    users: {
        nameX: "",
        nameO: "",
    },
    scores: {
        scoresX: 0,
        scoresO: 0,
    },
});

</script>

<style scoped>

</style>