"use client";

import { useState } from "react";
import UserLayout from "@/components/user/UserLayout";
import UserProfile from "@/components/user/UserProfile";
import UserFolders from "@/components/user/UserFolders"; 
import Subscription from "@/components/user/Subscription";
import History from "@/components/user/History";
import DashboardCards from "@/components/user/DashboardCards";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <UserLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="flex-1 p-6 space-y-6 bg-gray-50 dark:bg-neutral-900 min-h-screen">
        
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome Back 👋
            </h1>
            <DashboardCards />
          </>
        )}

        {activeTab === "files" && <UserFolders />}

        {activeTab === "subscription" && <Subscription />}

        {activeTab === "history" && <History />}

        {activeTab === "profile" && <UserProfile />}
      </div>
    </UserLayout>
  );
}
