"use client";

import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/components/admin/AuthProvider";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 ml-[280px] p-10">
        {children}
      </div>

    </main>
  );
}