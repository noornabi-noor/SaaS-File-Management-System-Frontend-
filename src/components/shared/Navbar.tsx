"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";
import { logout } from "@/services/auth/authClient";
import { getCurrentUser } from "@/services/auth/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Fetch current user on mount
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
    window.location.href = "/login"; // redirect to login
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-black/40 border-b border-gray-200 dark:border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          CloudNest
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/features" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
            Pricing
          </Link>

          {/* Show dashboard if user logged in */}
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition">
                Dashboard
              </Link>
              <img
                src={user.image || "/default-avatar.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20"
              />
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Get Started
              </Link>
            </>
          )}

          <ModeToggle />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-gray-200 dark:border-white/20 px-6 py-4 space-y-4">
          <Link href="/features" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">Features</Link>
          <Link href="/pricing" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">Pricing</Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition">
                Dashboard
              </Link>
              <img
                src={user.image || "/default-avatar.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20"
              />
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">Login</Link>
              <Link
                href="/register"
                className="block text-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}