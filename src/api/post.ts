import http from "@/core/http";
import { Post, PostsResponse } from "@/data/model/response/post-model";

export default {
  getPosts: (params) => http.get<PostsResponse>("/posts", { params }),

  getPost: (id: number) => http.get<Post>(`/posts/${id}`),
};
