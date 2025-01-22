import { authApi } from "@/api";
import { User } from "@/data/model/response/auth-model";

export default {
  namespaced: true,
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  getters: {
    accessToken: (state) => state.accessToken,
    isAuthenticated: (state) => !!state.accessToken,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token || null;
    },
    SET_REFRESH_TOKEN(state, token) {
      state.refreshToken = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, userData: User) {
      const { accessToken, refreshToken, ...user } = userData;
      commit("SET_ACCESS_TOKEN", accessToken);
      commit("SET_REFRESH_TOKEN", refreshToken);
      commit("SET_USER", user);
    },
    async refreshToken({ commit, state }) {
      const response = await authApi.refreshToken(state.refreshToken);
      if (response.success) {
        commit("SET_ACCESS_TOKEN", response.data.accessToken);
      }
    },
    logout({ commit }) {
      commit("SET_ACCESS_TOKEN", null);
      commit("SET_REFRESH_TOKEN", null);
      commit("SET_USER", null);
    },
  },
};
