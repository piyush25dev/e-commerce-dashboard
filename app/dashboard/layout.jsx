import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <div className={`${syne.variable} ${dmSans.variable}`}>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
