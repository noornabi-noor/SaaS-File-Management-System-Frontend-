"use client";

import { useState } from "react";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
      {/* Sidebar */}
      <UserSidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        {/* Navbar */}
        <UserNavbar setOpen={setOpen} />

        {/* Page content */}
        <main className="flex-1 p-6 md:ml-0">{children}</main>

        {/* Footer */}
        <UserFooter />
      </div>
    </div>
  );
}
