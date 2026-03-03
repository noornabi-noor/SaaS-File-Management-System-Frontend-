"use client";

import { useEffect, useState } from "react";
import { Users, Package, LayoutDashboard } from "lucide-react";
import { UserService } from "@/services/user.service";
import { SubscriptionService } from "@/services/subscription.service";

interface AdminOverviewData {
  totalUsers: number;
  totalPackages: number;
}

export default function AdminOverview() {
  const [data, setData] = useState<AdminOverviewData>({
    totalUsers: 0,
    totalPackages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOverviewData = async () => {
    try {
      setLoading(true);

      const usersRes = await UserService.getAllUsers();
      const packagesRes = await SubscriptionService.getAll();
      // const activeSubsRes = await UserSubscriptionService.getActive();

      setData({
        totalUsers: usersRes.data?.length || 0,
        totalPackages: packagesRes.data?.length || 0,
        
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch overview data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading overview...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <LayoutDashboard size={24} />
        Admin Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-full">
            <Users size={24} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
            <p className="text-2xl font-bold">{data.totalUsers}</p>
          </div>
        </div>

        {/* Total Packages */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-green-600 text-white rounded-full">
            <Package size={24} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Packages</p>
            <p className="text-2xl font-bold">{data.totalPackages}</p>
          </div>
        </div>
      </div>

      {/* Welcome Panel */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-2">Welcome to CloudNest Admin Panel</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here you can manage users, subscriptions, and packages efficiently.
        </p>
      </div>
    </div>
  );
}