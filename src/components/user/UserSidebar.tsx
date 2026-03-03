"use client";

import Link from "next/link";
import { Home, Folder, CreditCard, History, User, X } from "lucide-react";

export default function UserSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
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
        {/* Mobile header */}
        <div className="p-5 flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold text-indigo-500">CodeNest</h2>
          <X className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* Desktop header */}
        <div className="hidden md:block p-5">
          <a
            href="/"
            className="text-2xl font-bold text-indigo-500 hover:underline"
          >
            CloudNest
          </a>
        </div>

        {/* Navigation - take full space */}
        <nav className="flex-1 p-5 space-y-4">
          <SidebarItem
            href="/dashboard"
            icon={<Home size={18} />}
            label="Dashboard"
          />
          <SidebarItem
            href="/dashboard/files"
            icon={<Folder size={18} />}
            label="My Files"
          />
          <SidebarItem
            href="/dashboard/subscription"
            icon={<CreditCard size={18} />}
            label="Subscription"
          />
          <SidebarItem
            href="/dashboard/history"
            icon={<History size={18} />}
            label="History"
          />
          <SidebarItem
            href="/dashboard/profile"
            icon={<User size={18} />}
            label="Profile"
          />
        </nav>

        {/* Optional bottom content */}
        <div className="p-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Version 1.0
          </span>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-500/20 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
