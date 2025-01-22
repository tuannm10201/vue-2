<template>
  <div id="app">
    <navbar v-if="!hideNavbar" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navigation/Navbar.vue";

export default Vue.extend({
  computed: {
    hideNavbar(): boolean {
      return this.$route.meta?.hideNavbar;
    },
  },
  components: { Navbar },
});
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
</style>
