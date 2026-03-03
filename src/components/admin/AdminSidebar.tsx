"use client";

import {
  LayoutDashboard,
  Package,
  Users,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({
  open,
  setOpen,
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { key: "packages", label: "Manage Packages", icon: <Package size={18} /> },
    { key: "users", label: "Users", icon: <Users size={18} /> },
  ];

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed z-50 top-0 left-0 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          flex flex-col min-h-screen
        `}
      >
        <div className="p-5 flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold text-indigo-600">Admin Panel</h2>
          <X className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        <div className="hidden md:block p-5">
          <h2 className="text-2xl font-bold text-indigo-600">
            CloudNest
          </h2>
        </div>

        <nav className="flex-1 p-5 space-y-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <div
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
                  ${isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-600/20"}
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="p-5">
          <span className="text-sm text-gray-500">Version 1.0</span>
        </div>
      </aside>
    </>
  );
}