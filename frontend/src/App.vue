<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <div class="app">
    <TheHeader class="header" />
    <RouterView class="app-main" />
  </div>
</template>

<style>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex-grow: 1;
  background-color: #f1f1f1;
}
</style>
