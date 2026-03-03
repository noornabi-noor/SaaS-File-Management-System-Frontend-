import { apiFetch } from "./api";


export const SubscriptionService = {
  getAll: () => apiFetch("/api/subscription"),

  getById: (id: string) =>
    apiFetch(`/api/subscription/${id}`),

  create: (data: any) =>
    apiFetch("/api/subscription", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/api/subscription/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/api/subscription/${id}`, {
      method: "DELETE",
    }),
};