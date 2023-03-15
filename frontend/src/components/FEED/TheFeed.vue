<script setup>
import { ref } from "vue";
import TheWorkout from "./TheWorkout.vue";
import AddWorkout from "./AddWorkout.vue";
import { useAuthStore } from "@/stores/AuthStore.js";
const authStore = useAuthStore();

const workouts = ref();
const getWorkout = async () => {
  if (!authStore.logIn) {
    console.log("error: you should be authorized");
    return;
  }
  const response = await fetch("/api/workouts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.user.token}`,
    },
  });
  const json = await response.json();
  if (response.ok) {
    workouts.value = json;
  } else {
    console.log("error", json);
  }
};

getWorkout();
</script>

<template>
  <div class="wrapper-feed">
    <div class="show-workout">
      <div v-for="workout in workouts" :key="workout.id" class="workout">
        <the-workout :workout="workout" @deleteworkout="getWorkout" />
      </div>
    </div>
    <add-workout @addnewworkout="getWorkout" />
  </div>
</template>

<style scoped>
.wrapper-feed {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  font-size: 20px;
}

.show-workout {
  width: 1000px;
}

.workout {
  padding: 20px;
}
</style>
