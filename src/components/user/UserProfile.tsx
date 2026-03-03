"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth/auth";
import { Button } from "@/components/ui/button";

interface UserProfileData {
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;
  if (!user) return <p className="text-red-500">User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{user.email}</p>
          {user.createdAt && (
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}

          {/* Edit Profile Button */}
          <div className="mt-4">
            <Button className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Account Details</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Email: {user.email}</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Other Info</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {/* You can add more user info here */}
            User role: <span className="capitalize">User</span>
          </p>
        </div>
      </div>
    </div>
  );
}