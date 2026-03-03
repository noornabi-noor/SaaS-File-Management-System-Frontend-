const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const FileService = {
  getFilesInFolder: (folderId: string) =>
    fetch(`${BASE_URL}/api/files/folder/${folderId}`, {
      credentials: "include",
    }).then(res => res.json()),

  uploadFile: async (folderId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${BASE_URL}/api/files/upload/${folderId}`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },

  renameFile: (fileId: string, name: string) =>
    fetch(`${BASE_URL}/api/files/rename/${fileId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).then(res => res.json()),

  downloadFile: (fileId: string) =>
    window.open(`${BASE_URL}/api/files/download/${fileId}`, "_blank"),
};