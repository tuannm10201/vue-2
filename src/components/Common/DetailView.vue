<template>
  <div class="post-detail">
    <template v-if="loading"> Loading </template>
    <template v-else>
      <button @click="goBack()" class="back-button">Back</button>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DetailView",
  props: {
    loading: Boolean,
  },
  methods: {
    goBack() {
      if (this.$route.meta?.backLink)
        this.$router.push(this.$route.meta.backLink);
      else this.$router.back();
    },
  },
});
</script>
<style scoped>
.post-detail {
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
