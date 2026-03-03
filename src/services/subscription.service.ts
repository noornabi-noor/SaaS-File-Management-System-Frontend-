import { apiFetch } from "./api";

export const SubscriptionService = {
  getAll: async () => {
    const res = await apiFetch("/api/subscription");
    return res; // res should be { success: true, data: [...] }
  },

  getById: async (id: string) => {
    const res = await apiFetch(`/api/subscription/${id}`);
    return res;
  },

  create: async (data: any) => {
    const res = await apiFetch("/api/subscription", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  },

  update: async (id: string, data: any) => {
    const res = await apiFetch(`/api/subscription/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res;
  },

  delete: async (id: string) => {
    const res = await apiFetch(`/api/subscription/${id}`, {
      method: "DELETE",
    });
    return res;
  },
};