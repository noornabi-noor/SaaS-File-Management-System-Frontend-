import UserLayout from "@/components/user/UserLayout";

export default function UserDashboard() {
  return (
    <UserLayout>
      <div className="space-y-6">
        
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        {/* Example Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <DashboardCard title="Total Folders" value="12" />
          <DashboardCard title="Total Files" value="48" />
          <DashboardCard title="Active Package" value="Gold" />

        </div>
      </div>
    </UserLayout>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}