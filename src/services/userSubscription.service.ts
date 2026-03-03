import { apiFetch } from "./api";

export const UserSubscriptionService = {
  getActive: () =>
    apiFetch("/api/userSubscription/active"),

  selectPackage: (packageId: string) =>
    apiFetch("/api/userSubscription/select", {
      method: "POST",
      body: JSON.stringify({ packageId }),
    }),

  getHistory: () =>
    apiFetch("/api/userSubscription/history"),
};