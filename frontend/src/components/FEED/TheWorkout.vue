<script setup>
const props = defineProps({
  workout: Object,
});

const deleteWorkout = async () => {
  const response = await fetch("/api" + props.workout._id, {
    method: "DELETE",
  });

  const json = await response.json();

  if (response.ok) {
    console.log("workout deleted:", json);
    emit("deleteworkout");
  }
};

const emit = defineEmits(["deleteworkout"]);
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
  color: rgb(84, 145, 105);
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
