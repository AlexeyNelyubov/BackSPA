<script setup>
import { useAuthStore } from "@/stores/AuthStore.js";
const authStore = useAuthStore();

const props = defineProps({
  workout: Object,
});
const emit = defineEmits(["deleteworkout"]);

const deleteWorkout = async () => {
  if (!authStore.logIn) {
    console.log("error: you should be authorized");
    return;
  }
  const response = await fetch(`/api/workouts/${props.workout._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authStore.user.token}`,
    },
  });

  const json = await response.json();

  if (response.ok) {
    console.log("workout deleted:", json);
    emit("deleteworkout");
  }
};
</script>

<template>
  <div class="wrapper">
    <div>
      <p class="title">{{ props.workout.title }}</p>
      <br />
      <p><span>Loads(kg) : </span>{{ props.workout.load }}</p>
      <p><span>Reps : </span>{{ props.workout.reps }}</p>
      {{ props.workout.createdAt }}
    </div>
    <button @click="deleteWorkout">Delete</button>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px #000;
}

.title {
  font-weight: bold;
  font-style: italic;
  font-size: 25px;
  color: #549169;
}

span {
  font-weight: bold;
}

/* .btn-delete {
  width: 60px;
  height: 30px;
  background-color: rgb(144, 193, 193);
  cursor: pointer;
} */

button {
  width: 60px;
  height: 30px;
  background-color: rgb(144, 193, 193);
  cursor: pointer;
}
</style>
