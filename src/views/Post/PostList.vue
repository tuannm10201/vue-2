<template>
  <div class="home">
    <h1>Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Post } from "@/data/model/response/post-model";
import { postApi } from "@/api";

export default Vue.extend({
  name: "HomeView",
  data() {
    return {
      posts: [] as Post[],
      loading: true,
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      const response = await postApi.getPosts({ limit: 10 });
      if (response.success) {
        this.posts = response.data.posts;
      } else {
        alert(response.message);
      }
      this.loading = false;
    },
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h2 {
  margin: 0;
}

p {
  margin: 5px 0 0;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}
</style>
