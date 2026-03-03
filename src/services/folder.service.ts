import { apiFetch } from "./api";

export const FolderService = {
  getUserFolders: (userId: string) =>
    apiFetch(`/folders/${userId}`),

  getSingle: (id: string) =>
    apiFetch(`/folders/${id}`),

  create: (data: any) =>
    apiFetch("/folders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/folders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/folders/${id}`, {
      method: "DELETE",
    }),
};