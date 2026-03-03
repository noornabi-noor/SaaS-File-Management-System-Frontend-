"use client";

import { useEffect, useState } from "react";
import { SubscriptionService } from "@/services/subscription.service";
import { UserSubscriptionService } from "@/services/userSubscription.service";
import { FolderService } from "@/services/folder.service";
import { FileService } from "@/services/file.service";

export default function UserFolders() {
  const [packages, setPackages] = useState<any[]>([]);
  const [activePackage, setActivePackage] = useState<any | null>(null);
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<any | null>(null); 
  const [loading, setLoading] = useState(true);

  // --------------------------
  // Load packages + active
  // --------------------------
  const init = async () => {
    setLoading(true);
    try {
      const pkgs = await SubscriptionService.getAll();
      const active = await UserSubscriptionService.getActive();
      setPackages(pkgs?.data || []);
      setActivePackage(active?.data || null);
      if (active?.data) fetchFolders();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = async (pkgId: string) => {
    try {
      await UserSubscriptionService.selectPackage(pkgId);
      await init(); // reload everything
    } catch (err: any) {
      alert(err.message);
    }
  };

  const fetchFolders = async () => {
    const data = await FolderService.getUserFolders();
    setFolders(data?.data || []);
  };

  const fetchFiles = async (folderId: string | null) => {
    if (!folderId) return setFiles([]);
    const data = await FileService.getFilesInFolder(folderId);
    setFiles(data || []);
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    await FolderService.create({ name: newFolderName, parentId: currentFolderId });
    setNewFolderName("");
    fetchFolders();
  };

  const handleUploadFile = async () => {
    if (!uploadingFile || !currentFolderId) return;
    await FileService.uploadFile(currentFolderId, uploadingFile);
    fetchFiles(currentFolderId);
  };

  const handlePreview = (file: any) => setPreviewFile(file); // Show modal/panel

  useEffect(() => { init(); }, []);
  useEffect(() => { fetchFiles(currentFolderId); }, [currentFolderId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );

  if (!activePackage) {
    return (
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select a Subscription</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg.id)}
              className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition p-6 bg-white dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{pkg.name}</h3>
              <p className="text-gray-500 dark:text-gray-300 mt-2">Max Folders: {pkg.maxFolders}</p>
              <p className="text-gray-500 dark:text-gray-300">Max Nesting: {pkg.maxNesting}</p>
              <p className="text-gray-500 dark:text-gray-300">
                Allowed Types: {pkg.allowedFileTypes.join(", ")}
              </p>
              <p className="text-gray-500 dark:text-gray-300">Max File Size: {pkg.maxFileSize} MB</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------------------- ACTIVE PACKAGE --------------------
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Active Package: {activePackage.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Max Folders: {activePackage.maxFolders}, Max Nesting: {activePackage.maxNesting}
        </p>
      </div>

      {/* Folder & File Controls */}
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 flex-1 dark:bg-gray-700 dark:text-white"
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button
          onClick={handleCreateFolder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Folder
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="file"
          onChange={(e) => setUploadingFile(e.target.files?.[0] || null)}
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleUploadFile}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Upload File
        </button>
      </div>

      {/* Folders */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">Folders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setCurrentFolderId(folder.id)}
              className="border rounded p-4 cursor-pointer hover:shadow-lg bg-white dark:bg-gray-800 transition flex items-center gap-2"
            >
              📁 <span className="font-medium text-gray-700 dark:text-gray-200">{folder.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Files */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">Files</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="border rounded p-3 hover:shadow-lg bg-white dark:bg-gray-800 flex justify-between items-center"
            >
              <span className="text-gray-700 dark:text-gray-200 cursor-pointer" onClick={() => handlePreview(file)}>
                {file.name}
              </span>
              <a
                href={`/api/files/download/${file.id}`}
                className="text-blue-500 hover:underline"
              >
                ⬇️
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Preview Modal ---------------- */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full relative p-4">
            <button
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-200 font-bold text-xl"
              onClick={() => setPreviewFile(null)}
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{previewFile.name}</h3>

            <div className="flex justify-center">
              {/* Preview by type */}
              {previewFile.type === "IMAGE" && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/preview/${previewFile.id}`}
                  alt={previewFile.name}
                  className="max-h-96 object-contain"
                />
              )}
              {previewFile.type === "PDF" && (
                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/preview/${previewFile.id}`}
                  className="w-full h-96"
                ></iframe>
              )}
              {previewFile.type === "VIDEO" && (
                <video controls className="max-h-96">
                  <source src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/preview/${previewFile.id}`} />
                  Your browser does not support the video tag.
                </video>
              )}
              {previewFile.type === "AUDIO" && (
                <audio controls className="w-full">
                  <source src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/preview/${previewFile.id}`} />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}