// app/(DashboardLayouts)/dashboard/layout.tsx
import { ThemeProvider } from "@/providers/theme-provider";
import ToastProvider from "@/providers/ToastProvider";
import { getCurrentUser } from "@/services/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="dashboard-layout">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToastProvider />
        {children}
      </ThemeProvider>
    </div>
  );
}
