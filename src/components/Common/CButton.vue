<template>
  <button class="c-button" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CButton",
});
</script>
