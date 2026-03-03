"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverviewData";
import ManagePackages from "@/components/admin/ManagePackages";
import UsersPage from "@/components/user/Users";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {(activeTab: string) => (
        <div className="space-y-6">
          {activeTab === "dashboard" && <AdminOverview />}
          {activeTab === "packages" && <ManagePackages />}
          {activeTab === "users" && <UsersPage />}
        </div>
      )}
    </AdminLayout>
  );
}
