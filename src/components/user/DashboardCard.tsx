"use client";

interface DashboardCardProps {
  title: string;
  value: string | number;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}