<script setup>
import { ref } from "vue";
const title = ref("");
const load = ref();
const reps = ref();

const addworkout = async () => {
  const workout = {
    title: title.value,
    load: load.value,
    reps: reps.value,
  };
  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(workout),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  if (response.ok) {
    console.log("new workout added:", json);
    title.value = "";
    load.value = "";
    reps.value = "";
    emit("addnewworkout");
  } else {
    console.log("error", json);
  }
};

const emit = defineEmits(["addnewworkout"]);
</script>

<template>
  <div class="wrapper-add-workout">
    <p class="form-title">Add a new workout</p>
    <div class="exersize-params">
      <p>Exersize title:</p>
      <input type="text" v-model="title" />
    </div>
    <div class="exersize-params">
      <p>Load (in kg):</p>
      <input type="text" v-model="load" />
    </div>
    <div class="exersize-params">
      <p>Reps:</p>
      <input type="text" v-model="reps" />
    </div>
    <button @click="addworkout">Add Workout</button>
  </div>
</template>

<style scoped>
.wrapper-add-workout {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.exersize-params {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

button {
  margin-left: 10px;
  width: 80px;
}
</style>
