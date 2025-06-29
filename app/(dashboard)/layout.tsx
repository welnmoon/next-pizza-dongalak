import AdminHeader from "@/components/Admin/Header/Header";
import { SidebarNav } from "@/components/Admin/Sidebar/Sidebar";
import Providers from "@/components/providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <AdminHeader />
      <div className="flex gap-2 p-10">
        <SidebarNav />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
      </div>
    </div>
  );
}
