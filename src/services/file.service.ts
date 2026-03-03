const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const FileService = {
  getFilesInFolder: async (folderId: string) => {
    const res = await fetch(`${BASE_URL}/api/files/folder/${folderId}`, {
      credentials: "include",
    });
    const data = await res.json();
    // Ensure returning array directly
    return Array.isArray(data.data) ? data.data : [];
  },

  uploadFile: async (folderId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/api/files/upload/${folderId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },

  renameFile: async (fileId: string, name: string) => {
    const res = await fetch(`${BASE_URL}/api/files/rename/${fileId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newName: name }),
    });
    return res.json();
  },

  downloadFile: (fileId: string) =>
    window.open(`${BASE_URL}/api/files/download/${fileId}`, "_blank"),
};