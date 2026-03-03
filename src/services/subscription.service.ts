import { apiFetch } from "./api";


export const SubscriptionService = {
  getAll: () => apiFetch("/subscription"),

  getById: (id: string) =>
    apiFetch(`/subscription/${id}`),

  create: (data: any) =>
    apiFetch("/subscription", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/subscription/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/subscription/${id}`, {
      method: "DELETE",
    }),
};