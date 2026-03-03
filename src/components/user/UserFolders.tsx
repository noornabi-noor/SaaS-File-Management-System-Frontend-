"use client";

import { useEffect, useState } from "react";
import { FolderService } from "@/services/folder.service";
import { FileService } from "@/services/file.service";

interface FolderType {
  id: string;
  name: string;
  parentId: string | null;
  children?: FolderType[];
}

interface FileType {
  id: string;
  name: string;
}

export default function UserFolders() {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);

  // Fetch root folders
  const fetchFolders = async () => {
    setLoading(true);
    try {
      const data = await FolderService.getUserFolders("currentUserId"); // replace with actual
      setFolders(Array.isArray(data?.data) ? data.data : []);
    } catch (err: any) {
      console.error("Failed to fetch folders:", err.message);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch files in a folder
  const fetchFiles = async (folderId: string | null) => {
    if (!folderId) return setFiles([]);
    try {
      const data = await FileService.getFilesInFolder(folderId);
      setFiles(Array.isArray(data?.data) ? data.data : []);
    } catch (err: any) {
      console.error("Failed to fetch files:", err.message);
      setFiles([]);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return alert("Enter folder name");
    try {
      await FolderService.create({ name: newFolderName, parentId: currentFolderId });
      setNewFolderName("");
      fetchFolders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUploadFile = async () => {
    if (!uploadingFile || !currentFolderId) return alert("Select file and folder");
    try {
      await FileService.uploadFile(currentFolderId, uploadingFile);
      setUploadingFile(null);
      fetchFiles(currentFolderId);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
    fetchFiles(folderId);
  };

  useEffect(() => {
    fetchFolders();
    fetchFiles(currentFolderId);
  }, [currentFolderId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Folders & Files</h2>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="New folder name"
          className="border rounded p-2 flex-1"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreateFolder}>
          Create Folder
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="file"
          onChange={(e) => setUploadingFile(e.target.files?.[0] || null)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUploadFile}>
          Upload File
        </button>
      </div>

      <div>
        <h3 className="font-medium">Folders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="border p-3 rounded cursor-pointer hover:shadow-lg bg-white dark:bg-gray-800"
              onClick={() => navigateToFolder(folder.id)}
            >
              📁 {folder.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mt-4">Files in Current Folder</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="border p-3 rounded hover:shadow-lg bg-white dark:bg-gray-800"
            >
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}