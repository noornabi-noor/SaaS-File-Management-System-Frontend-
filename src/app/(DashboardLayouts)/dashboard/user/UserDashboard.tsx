"use client";

import { useState } from "react";
import UserLayout from "@/components/user/UserLayout";
import UserProfile from "@/components/user/UserProfile";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard"); 

  return (
    <UserLayout>
      {(activeTab, setActiveTab) => (
        <div className="flex-1 space-y-6">
          {activeTab === "dashboard" && (
            <>
              <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
              <div className="grid md:grid-cols-3 gap-6">
                <DashboardCard title="Total Folders" value="12" />
                <DashboardCard title="Total Files" value="48" />
                <DashboardCard title="Active Package" value="Gold" />
              </div>
            </>
          )}

          {activeTab === "files" && (
            <div>
              <h1 className="text-3xl font-bold">My Files</h1>
              <p>Here are all your files.</p>
            </div>
          )}

          {activeTab === "subscription" && (
            <div>
              <h1 className="text-3xl font-bold">Subscription</h1>
              <p>Manage your subscription here.</p>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h1 className="text-3xl font-bold">History</h1>
              <p>See your activity history.</p>
            </div>
          )}

          {activeTab === "profile" && <UserProfile />}
        </div>
      )}
    </UserLayout>
  );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
