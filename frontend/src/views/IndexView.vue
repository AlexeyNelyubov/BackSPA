<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheFeed from "../components/FEED/TheFeed.vue";
</script>

<template>
  <div class="wrapper-index">
    <the-header class="wrapper-header" />
    <the-feed class="wrapper-feed" />
  </div>
</template>

<style scoped>
.wrapper-index {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 1px;
  min-height: 100vh;
  background-color: aquamarine;
}

.wrapper-header {
  height: 100px;
  display: flex;
  align-items: center;
}

.wrapper-feed {
  height: 100%;
}
</style>
