import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

export const metadata = {
  title: "Login — Portfolio Dashboard",
};

// LoginPage uses useSearchParams() which requires Suspense in Next.js App Router
export default function LoginRoute() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}