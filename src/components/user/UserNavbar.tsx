"use client";

import { Menu } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";
import { useEffect, useState } from "react";
import { logout } from "@/services/auth/authClient";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/auth/auth";

export default function UserNavbar({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) {
  const [user, setUser] = useState<{ name: string; image?: string } | null>(
    null
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser();
        if (data) setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      
      <div className="flex items-center gap-4">
        <Menu
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <h1 className="text-lg font-semibold">User Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />

        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
            />
            <span className="hidden md:inline text-sm font-medium">{user.name}</span>
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
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
        )}
      </div>
    </header>
  );
}