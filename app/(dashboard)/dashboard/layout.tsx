import { notFound } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";
import { NavBar } from "@/components/layout/navbar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col overflow-y-hidden">
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />
      <div className="grow p-6">{children}</div>
    </div>
  );
}
