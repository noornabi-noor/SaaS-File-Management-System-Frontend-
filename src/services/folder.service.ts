import { apiFetch } from "./api";

export const FolderService = {
  getUserFolders: () =>
    apiFetch(`/api/folders`),

  getSingle: (id: string) =>
    apiFetch(`/api/folders/${id}`),

  create: (data: any) =>
    apiFetch("/api/folders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/api/folders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/api/folders/${id}`, {
      method: "DELETE",
    }),
};