<template>
    <div class="gameSquare" @click="playGame">
      <p class="gameValue">{{ state }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
//   import { defineProps } from 'vue';
  
  const props = defineProps<{
    state: string;
  }>();
  
  const playGame = () => {
    console.log("Square clicked in SingleSquare:", props.state);
    // Emit an event to notify the parent component
  };
  </script>
   <style scoped>
    .gameSquare {
        border: 2px rgb(90, 42, 7) solid;
    }

    .gameValue {
        font-size: 2rem;
    }
    </style>
  
