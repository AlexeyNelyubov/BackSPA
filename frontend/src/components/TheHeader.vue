<script setup>
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore.js";
const authStore = useAuthStore();

const router = useRouter();

if (localStorage.getItem("user")) {
  authStore.logIn = true;
  const user = JSON.parse(localStorage.getItem("user"));
  authStore.user = {
    email: user.email,
    token: user.token,
  };
}

const logOut = () => {
  localStorage.removeItem("user");
  authStore.logIn = false;
  router.push({ name: "AuthPage", params: { id: "signin" } });
};
</script>
<template>
  <div class="header">
    <RouterLink
      :to="{
        name: 'IndexPage',
      }"
      class="header-sign"
      >Workout Body</RouterLink
    >
    <nav class="header-auth-feild">
      <div v-if="authStore.logIn">
        {{ authStore.user.email }}
        <button class="header-auth-feild__logout" @click="logOut">
          logout
        </button>
      </div>
      <div v-if="!authStore.logIn">
        <RouterLink
          :to="{ name: 'AuthPage', params: { id: 'signin' } }"
          class="header-auth-feild__auth"
        >
          login</RouterLink
        >
        <RouterLink
          :to="{ name: 'AuthPage', params: { id: 'signup' } }"
          class="header-auth-feild__auth"
        >
          sigup</RouterLink
        >
      </div>
    </nav>
  </div>
</template>
<style>
.header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-sign {
  padding-left: 150px;
  font-size: 50px;
  color: #000;
  text-decoration: none;
}
.header-sign:hover {
  color: #000;
}
.header-auth-feild {
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.header-auth-feild__auth {
  margin-left: 16px;
  padding: 4px 8px;
  font-size: 24px;
  color: #000;
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 8px;
}
.header-auth-feild__auth:visited {
  color: #000;
  text-decoration: none;
}

.header-auth-feild__logout {
  margin-right: 50px;
  padding: 4px 8px;
  font: inherit;
  background: inherit;
  font-size: 24px;
  border: 1px solid #000;
  border-radius: 8px;
}
</style>
