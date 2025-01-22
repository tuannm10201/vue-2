<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin()" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { authApi } from "@/api";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      username: "emilys",
      password: "emilyspass",
    };
  },
  methods: {
    async handleLogin() {
      const response = await authApi.login({
        username: this.username,
        password: this.password,
      });
      if (!response.success) {
        alert(response.message);
        return;
      }
      this.$store.dispatch("auth/login", response.data);
      this.$router.push("/");
    },
  },
});
</script>
