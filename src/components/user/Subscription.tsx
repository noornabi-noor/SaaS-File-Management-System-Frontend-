"use client";

import { useEffect, useState } from "react";
import { SubscriptionService } from "@/services/subscription.service";
import { UserSubscriptionService } from "@/services/userSubscription.service";

interface PackageType {
  id: string;
  name: string;
  maxFolders: number;
  maxNesting: number;
  allowedFileTypes: string[];
  maxFileSize: number;
  totalFileLimit: number;
  filesPerFolder: number;
}

export default function Subscription() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [activePackage, setActivePackage] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const pkgsResponse = await SubscriptionService.getAll();
      const activeResponse = await UserSubscriptionService.getActive();

      // Ensure we are mapping over an array
      setPackages(Array.isArray(pkgsResponse?.data) ? pkgsResponse.data : []);
      setActivePackage(activeResponse?.data || null);
    } catch (err: any) {
      console.error("Failed to fetch packages:", err.message);
      setPackages([]);
      setActivePackage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = async (pkgId: string) => {
    try {
      await UserSubscriptionService.selectPackage(pkgId);
      fetchPackages(); // refresh
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading packages...
        </p>
      </div>
    );

  if (!packages.length)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">
          No packages found
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Active Package: {activePackage?.name || "None"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`border p-4 rounded-lg cursor-pointer transition hover:shadow-lg
              ${activePackage?.id === pkg.id ? "bg-green-100 dark:bg-green-900" : "bg-white dark:bg-gray-900"}
            `}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            <h3 className="font-bold text-gray-800 dark:text-gray-200">{pkg.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">Max Folders: {pkg.maxFolders}</p>
            <p className="text-gray-600 dark:text-gray-400">Max Nesting: {pkg.maxNesting}</p>
            <p className="text-gray-600 dark:text-gray-400">
              Allowed Types: {pkg.allowedFileTypes.join(", ")}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Max File Size: {pkg.maxFileSize} MB</p>
            <p className="text-gray-600 dark:text-gray-400">Total File Limit: {pkg.totalFileLimit}</p>
            <p className="text-gray-600 dark:text-gray-400">Files per Folder: {pkg.filesPerFolder}</p>
          </div>
        ))}
      </div>
    </div>
  );
}