// // components/user/Files.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { FileService } from "@/services/file.service";

// export default function Files() {
//   const [files, setFiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFiles = async () => {
//     setLoading(true);
//     try {
//       const data = await FileService.getFilesInFolder("root-folder-id"); // replace with actual folderId
//       console.log("Files fetched:", data);
//       // Fix: handle nested .data or object
//       setFiles(Array.isArray(data) ? data : data.data || []);
//     } catch (err: any) {
//       console.error("Failed to fetch files:", err.message);
//       setFiles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   if (loading) return <p>Loading files...</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {files?.map((file) => (
//         <div
//           key={file.id}
//           className="border p-3 rounded hover:shadow cursor-pointer"
//         >
//           {file.name}
//         </div>
//       ))}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { FileService } from "@/services/file.service";

export default function Files() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      // Replace "root-folder-id" with the actual folder ID, e.g., user's root folder
      const data = await FileService.getFilesInFolder("root-folder-id"); 
      // Ensure it’s always an array
      setFiles(Array.isArray(data) ? data : data?.data || []);
    } catch (err: any) {
      console.error("Failed to fetch files:", err.message);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading files...
        </p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">
          No files found in this folder
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-900 hover:shadow-lg cursor-pointer transition"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 dark:text-gray-200 font-medium truncate">
              {file.name}
            </span>
            <span className="text-gray-400 text-sm">{file.sizeMB?.toFixed(2)} MB</span>
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-sm">
            Type: {file.type || "Unknown"}
          </div>
        </div>
      ))}
    </div>
  );
}