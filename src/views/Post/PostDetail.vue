<template>
  <detail-view :loading="loading">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </detail-view>
</template>

<script lang="ts">
import Vue from "vue";
import { Post } from "@/data/model/response/post-model";
import { postApi } from "@/api";

export default Vue.extend({
  data() {
    return {
      post: {} as Post,
      loading: true,
    };
  },
  computed: {
    postId(): number {
      return +this.$route.params.id;
    },
  },
  async created() {
    this.fetchPostDetail();
  },
  methods: {
    async fetchPostDetail() {
      this.loading = true;
      const response = await postApi.getPost(this.postId);
      if (response.success) {
        this.post = response.data;
      } else {
        alert(response.message);
      }
      this.loading = false;
    },
  },
});
</script>
