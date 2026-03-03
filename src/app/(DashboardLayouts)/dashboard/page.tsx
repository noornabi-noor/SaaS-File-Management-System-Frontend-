// app/(DashboardLayouts)/dashboard/page.tsx

import { redirect } from "next/navigation";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import { getCurrentUser } from "@/services/auth/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  switch (user.role?.toUpperCase()) {
    case "USER":
      return <UserDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      redirect("/login"); 
  }
}