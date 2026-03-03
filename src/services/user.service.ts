import { apiFetch } from "./api";

export const UserService = {
  getAllUsers: () => apiFetch("/api/user"),
  getUserById: (id: string) => apiFetch(`/api/user/${id}`),
  getCurrentUser: () => apiFetch(`/api/user/me`),
};