<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore.js";
const authStore = useAuthStore();

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// console.log("1", authStore.logIn);
// if (localStorage.getItem("user")) {
//   console.log("2");
//   authStore.logIn = true;
// }

const email = ref("");
const password = ref("");
const authSign = computed(() => {
  return props.id[0].toUpperCase() + props.id.slice(1);
});
const showBtn = computed(() => {
  return /^\w+@\w{2,}\.\w{2,3}$/.test(email.value) &&
    /^\S{8,64}$/.test(password.value)
    ? true
    : false;
});
const borderColorForEmail = ref("#000");
const borderColorForPassword = ref("#000");

const checkEmail = () => {
  if (/^\w+@\w{2,}\.\w{2,3}$/.test(email.value))
    borderColorForEmail.value = "#09f75c";
  if (!/^\w+@\w{2,}\.\w{2,3}$/.test(email.value))
    borderColorForEmail.value = "#ff3a3a";
};

const checkPassword = () => {
  if (/^\S{8,64}$/.test(password.value))
    borderColorForPassword.value = "#09f75c";
  if (!/^\S{8,64}$/.test(password.value))
    borderColorForPassword.value = "#ff3a3a";
};

const auth = async () => {
  let user = {
    email: email.value,
    password: password.value,
  };
  try {
    let response = await fetch(`/api/user/${props.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let json = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      authStore.logIn = true;
      authStore.user = {
        email: json.email,
        token: json.token,
      };
      router.push({
        name: "IndexPage",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<template>
  <div class="auth">
    <div class="auth-field">
      <p class="auth-field__sign">{{ authSign }}</p>
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        @input="checkEmail"
        class="auth-field__email"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        @input="checkPassword"
        class="auth-field__password"
      />
      <button class="auth-field__btn" @click="auth" :disabled="!showBtn">
        {{ authSign }}
      </button>
    </div>
  </div>
</template>

<style>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-field {
  height: 280px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px #000;
}

.auth-field__sign {
  font-size: 25px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #549169;
}

.auth-field__email {
  height: 40px;
  width: 468px;
  margin-top: 16px;
  padding-left: 8px;
  font-size: 16px;
  border-radius: 8px;
  outline: none;
  border-color: v-bind(borderColorForEmail);
}

.auth-field__password {
  height: 40px;
  width: 468px;
  margin-top: 16px;
  padding-left: 8px;
  font-size: 16px;
  border-radius: 8px;
  outline: none;
  border-color: v-bind(borderColorForPassword);
}

.auth-field__btn {
  height: 50px;
  width: 100px;
  margin-top: 16px;
  font-size: 25px;
  color: #f1f1f1;
  background-color: #549169;
  border-radius: 8px;
  cursor: pointer;
}

.auth-field__btn:disabled {
  opacity: 0.5;
}
</style>
