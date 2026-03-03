"use client";

import {
  Home,
  Folder,
  CreditCard,
  History,
  User,
  X,
  Cloud,
} from "lucide-react";

interface UserSidebarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function UserSidebar({
  open,
  setOpen,
  activeTab,
  setActiveTab,
}: UserSidebarProps) {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "files", label: "My Files", icon: Folder },
    { key: "subscription", label: "Subscription", icon: CreditCard },
    { key: "history", label: "History", icon: History },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen
          bg-white dark:bg-neutral-950
          border-r border-gray-200 dark:border-gray-800
          shadow-lg md:shadow-none
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Cloud className="text-indigo-500" size={26} />
            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              CloudNest
            </h2>
          </div>

          <X
            className="cursor-pointer md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setOpen(false); // auto close mobile
                }}
                className={`
                  relative w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20"
                  }
                `}
              >
                {/* Active Left Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400 rounded-r-md" />
                )}

                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>CloudNest</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}