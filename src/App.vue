<script setup lang="ts">
import TictactoeGame from './components/TictactoeGame.vue';

</script>

<template>
 <div>
  <TictactoeGame />
 </div>
</template>

<style scoped>
    div {
        width:auto;
    }

    @media (width <= 740px) {
        div {
            scale: 0.9;
            max-width: 22rem;
        }
    }
</style>
