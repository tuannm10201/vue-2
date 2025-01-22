<template>
  <nav class="navbar">
    <router-link class="logo" to="/">Zen 8</router-link>
    <div class="auth" v-if="user">
      <img :src="user.image" alt="User Image" class="user-image" />
      <span class="user-info">{{ user.username }}</span>
      <c-button class="btn logout" @click="handleLogout()">Logout</c-button>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/data/model/response/auth-model";

export default Vue.extend({
  computed: {
    user(): User {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
});
</script>
