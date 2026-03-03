"use client";

import { useState, ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

type AdminLayoutProps = {
  children:
    | ReactNode
    | ((activeTab: string, setActiveTab: (tab: string) => void) => ReactNode);
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
      <AdminSidebar
        open={open}
        setOpen={setOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col">
        <AdminNavbar setOpen={setOpen} />

        <main className="flex-1 p-6">
          {typeof children === "function"
            ? children(activeTab, setActiveTab)
            : children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}