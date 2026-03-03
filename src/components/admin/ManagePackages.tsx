"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil, Plus } from "lucide-react";
import { SubscriptionService } from "@/services/subscription.service";

interface Package {
  id: string;
  name: string;
  maxFolders: number;
  maxNestingLevel: number;
  allowedFileTypes: string[];
  maxFileSizeMB: number;
  totalFileLimit: number;
  filesPerFolder: number;
}

const defaultForm = {
  name: "",
  maxFolders: 0,
  maxNestingLevel: 0,
  allowedFileTypes: [] as string[],
  maxFileSizeMB: 0,
  totalFileLimit: 0,
  filesPerFolder: 0,
};

export default function ManagePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch Packages
  const fetchPackages = async () => {
    try {
      const res = await SubscriptionService.getAll();
      setPackages(res.data || []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Handle Input Change (Fix number conversion)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Toggle File Types
  const handleFileTypeToggle = (type: string) => {
    if (form.allowedFileTypes.includes(type)) {
      setForm({
        ...form,
        allowedFileTypes: form.allowedFileTypes.filter((t) => t !== type),
      });
    } else {
      setForm({
        ...form,
        allowedFileTypes: [...form.allowedFileTypes, type],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!form.name.trim()) {
        alert("Package name is required.");
        return;
      }

      const payload = {
        ...form,
        allowedFileTypes: form.allowedFileTypes.map((t) => t.toUpperCase()), // Fix enum
      };

      if (editingId) {
        await SubscriptionService.update(editingId, payload);
      } else {
        await SubscriptionService.create(payload);
      }

      setForm(defaultForm);
      setEditingId(null);
      fetchPackages();
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Edit Package
  const handleEdit = (pkg: Package) => {
    setForm(pkg);
    setEditingId(pkg.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Package
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      await SubscriptionService.delete(id);
      fetchPackages();
    } catch (error) {
      alert("Failed to delete package");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Subscription Packages</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Plus size={18} />
          {editingId ? "Edit Package" : "Create New Package"}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Package Name */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Package Name
            </label>
            <Input
              name="name"
              placeholder="Example: Free, Silver, Gold, Premium"
              value={form.name ?? ""}
              onChange={handleChange}
            />
          </div>

          {/* Max Folders */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Maximum Total Folders
            </label>
            <Input
              name="maxFolders"
              type="number"
              placeholder="How many folders a user can create (e.g. 10)"
              value={form.maxFolders ?? ""}
              onChange={handleChange}
            />
          </div>

          {/* Nesting Level */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Maximum Folder Nesting Level
            </label>
            <Input
              name="maxNestingLevel"
              type="number"
              placeholder="Depth limit (e.g. 3)"
              value={form.maxNestingLevel ?? ""}
              onChange={handleChange}
            />
          </div>

          {/* Max File Size */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Maximum File Size (MB)
            </label>
            <Input
              name="maxFileSizeMB"
              type="number"
              placeholder="Max upload size per file (e.g. 50 MB)"
              value={form.maxFileSizeMB ?? ""}
              onChange={handleChange}
            />
          </div>

          {/* Total File Limit */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Total File Limit (Account)
            </label>
            <Input
              name="totalFileLimit"
              type="number"
              placeholder="Maximum total files in account (e.g. 100)"
              value={form.totalFileLimit ?? ""}
              onChange={handleChange}
            />
          </div>

          {/* Files Per Folder */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Maximum Files Per Folder
            </label>
            <Input
              name="filesPerFolder"
              type="number"
              placeholder="Files allowed inside one folder (e.g. 20)"
              value={form.filesPerFolder ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* File Types */}
        <div>
          <p className="text-sm font-semibold mb-3">Allowed File Types</p>

          <div className="flex flex-wrap gap-4">
            {["Image", "Video", "PDF", "Audio"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer
                border-gray-200 dark:border-gray-700
                hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <input
                  type="checkbox"
                  checked={form.allowedFileTypes.includes(type)}
                  onChange={() => handleFileTypeToggle(type)}
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Processing..."
            : editingId
              ? "Update Subscription Package"
              : "Create Subscription Package"}
        </Button>
      </div>

      {/* Package Table */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-4">All Packages</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-center">Max Folders</th>
                <th className="text-center">Max File Size</th>
                <th className="text-center">Total Files</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-b border-gray-100 dark:border-gray-800
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-2 font-medium">{pkg.name}</td>
                  <td className="text-center">{pkg.maxFolders}</td>
                  <td className="text-center">{pkg.maxFileSizeMB} MB</td>
                  <td className="text-center">{pkg.totalFileLimit}</td>

                  <td className="flex gap-2 justify-center py-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(pkg)}
                    >
                      <Pencil size={14} />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(pkg.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {packages.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No packages found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
