import { Suspense } from "react";
import LoginForm from "./login-form";

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-100" />}> 
      <LoginForm />
    </Suspense>
  );
}
