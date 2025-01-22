import http from "@/core/http";
import { LoginCredentials } from "@/data/model/request/auth-request-model";
import { AuthToken, User } from "@/data/model/response/auth-model";

export default {
  login: (credentials: LoginCredentials) =>
    http.post<User>("/auth/login", credentials),

  refreshToken: (refreshToken: string) =>
    http.post<AuthToken>("/auth/refresh", { refreshToken }),
};
