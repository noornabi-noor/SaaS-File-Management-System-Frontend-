// // components/user/DashboardCards.tsx
// "use client";

// import { useEffect, useState } from "react";
// import DashboardCard from "./DashboardCard";
// import { FolderService } from "@/services/folder.service";
// import { FileService } from "@/services/file.service";
// import { UserSubscriptionService } from "@/services/userSubscription.service";

// export default function DashboardCards() {
//   const [totalFolders, setTotalFolders] = useState(0);
//   const [totalFiles, setTotalFiles] = useState(0);
//   const [activePackage, setActivePackage] = useState<string>("None");

//   const fetchDashboardData = async () => {
//     try {
//       // 1️⃣ Fetch folders
//       const folders = await FolderService.getUserFolders("me"); // backend returns array
//       setTotalFolders(folders.length);

//       // 2️⃣ Count files recursively
//       const countFiles = (folders: any[]): number => {
//         return folders.reduce((acc, folder) => {
//           const childFiles = countFiles(folder.children || []);
//           return acc + (folder.files?.length || 0) + childFiles;
//         }, 0);
//       };

//       setTotalFiles(countFiles(folders));

//       // 3️⃣ Fetch active subscription
//       const activeSub = await UserSubscriptionService.getActive();
//       setActivePackage(activeSub?.name || "None");
//     } catch (err: any) {
//       console.error("Failed to fetch dashboard data:", err.message);
//       setActivePackage("None"); // fallback
//       setTotalFolders(0);
//       setTotalFiles(0);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       <DashboardCard title="Total Folders" value={totalFolders} />
//       <DashboardCard title="Total Files" value={totalFiles} />
//       <DashboardCard title="Active Package" value={activePackage} />
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { FolderService } from "@/services/folder.service";
import { FileService } from "@/services/file.service";
import { UserSubscriptionService } from "@/services/userSubscription.service";

export default function DashboardCards() {
  const [totalFolders, setTotalFolders] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [activePackage, setActivePackage] = useState("None");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1️⃣ Fetch user folders
        const folders = await FolderService.getUserFolders("me");
        const folderArray = Array.isArray(folders) ? folders : [];
        setTotalFolders(folderArray.length);

        // 2️⃣ Count total files across all folders
        let fileCount = 0;
        for (const folder of folderArray) {
          const files = await FileService.getFilesInFolder(folder.id);
          const filesArray = Array.isArray(files) ? files : [];
          fileCount += filesArray.length;
        }
        setTotalFiles(fileCount);

        // 3️⃣ Fetch active subscription
        try {
          const activeSub = await UserSubscriptionService.getActive();
          setActivePackage(activeSub?.name || "None");
        } catch {
          setActivePackage("None");
        }
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err.message);
        setTotalFolders(0);
        setTotalFiles(0);
        setActivePackage("None");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Total Folders"
        value={totalFolders.toString()}
        icon="📁"
      />
      <DashboardCard
        title="Total Files"
        value={totalFiles.toString()}
        icon="📄"
      />
      <DashboardCard
        title="Active Subscription"
        value={activePackage}
        icon="💎"
      />
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-center bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}