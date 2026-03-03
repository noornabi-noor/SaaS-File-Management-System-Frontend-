"use client";

import { useEffect, useState } from "react";
import { Users as UsersIcon, X } from "lucide-react";
import { UserService } from "@/services/user.service";

interface Subscription {
  id: string;
  packageId: string;
  startDate: string;
  endDate?: string | null;
  isActive: boolean;
  package: {
    id: string;
    name: string;
  };
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  emailVerified: boolean;
  createdAt: string;
  folders: any[];
  files: any[];
  subscriptions: Subscription[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  emailVerified: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await UserService.getAllUsers();
      setUsers(res.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (id: string) => {
    try {
      setLoading(true);
      const res = await UserService.getUserById(id);
      setSelectedUser(res.data);
      setShowModal(true);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <UsersIcon size={20} />
        Users
      </h1>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-center">Role</th>
              <th className="py-2 px-3 text-center">Email Verified</th>
              <th className="py-2 px-3 text-center">Created At</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="py-2 px-3 font-medium">{user.name}</td>
                  <td className="py-2 px-3">{user.email}</td>
                  <td className="py-2 px-3 text-center">{user.role}</td>
                  <td className="py-2 px-3 text-center">
                    {user.emailVerified ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => viewUserDetails(user.id)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedUser.name} Details</h2>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Email Verified:</strong>{" "}
                {selectedUser.emailVerified ? "Yes" : "No"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold">Subscriptions</h3>
                {selectedUser.subscriptions.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedUser.subscriptions.map((sub) => (
                      <li key={sub.id}>
                        {sub.package.name} —{" "}
                        {sub.isActive ? "Active" : "Inactive"} (
                        {new Date(sub.startDate).toLocaleDateString()} -{" "}
                        {sub.endDate
                          ? new Date(sub.endDate).toLocaleDateString()
                          : "Present"}
                        )
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No subscriptions</p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Folders</h3>
                <p>{selectedUser.folders.length} folders</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Files</h3>
                <p>{selectedUser.files.length} files</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}