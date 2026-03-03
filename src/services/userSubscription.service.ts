import { apiFetch } from "./api";

export const UserSubscriptionService = {
  getActive: () =>
    apiFetch("/userSubscription/active"),

  selectPackage: (packageId: string) =>
    apiFetch("/userSubscription/select", {
      method: "POST",
      body: JSON.stringify({ packageId }),
    }),

  getHistory: () =>
    apiFetch("/userSubscription/history"),
};