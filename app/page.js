// app/page.jsx  →  route: /
import HomePage from "@/components/home/HomePage";

export const metadata = {
  title:       "Portfolio Dashboard",
  description: "Admin dashboard for managing projects, skills, and experience.",
};

export default function RootPage() {
  return <HomePage />;
}