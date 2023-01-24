<script setup>
import { ref } from "vue";
import TheWorkout from "./TheWorkout.vue";
import AddWorkout from "./AddWorkout.vue";

const workouts = ref();
const getWorkout = async () => {
  const response = await fetch("/api");
  const json = await response.json();
  if (response.ok) {
    workouts.value = json;
  } else {
    console.log("error", json);
  }
};

getWorkout();

function fn() {
  getWorkout();
}
</script>

<template>
  <div class="wrapper-feed">
    <div class="show-workout">
      FEED
      <div v-for="workout in workouts" :key="workout.id" class="workout">
        <the-workout :workout="workout" @deleteworkout="fn" />
      </div>
    </div>
    <add-workout @addnewworkout="fn" />
  </div>
</template>

<style scoped>
.wrapper-feed {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  font-size: 20px;
  background-color: #f1f1f1;
}

.show-workout {
  width: 1000px;
}

.workout {
  padding: 20px;
}
</style>
