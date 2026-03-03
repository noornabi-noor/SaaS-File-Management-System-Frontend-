"use client";

import { Menu } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";
import { useEffect, useState } from "react";
import { logout } from "@/services/auth/authClient";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/auth/auth";

export default function AdminNavbar({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  const [admin, setAdmin] = useState<{ name: string; image?: string } | null>(
    null
  );

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const data = await getCurrentUser(); // make sure this returns admin
        if (data) setAdmin(data);
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      }
    }

    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/admin/login"; // redirect to admin login
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Menu
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        {admin ? (
          <div className="flex items-center gap-2">
            <img
              src={admin.image || "/default-avatar.png"}
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
            />
            <span className="hidden md:inline text-sm font-medium">
              {admin.name}
            </span>

            <Button
              variant="destructive"
              size="sm"
              className="ml-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
        )}
      </div>
    </header>
  );
}