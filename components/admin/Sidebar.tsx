"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  Grid2X2,
  Image,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },

  {
    name: "Sales",
    href: "/admin/sales",
    icon: Sparkles,
  },

  {
    name: "Categories",
    href: "/admin/categories",
    icon: Grid2X2,
  },

  {
    name: "Media",
    href: "/admin/media",
    icon: Image,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        fixed left-0 top-0
        w-[280px]
        h-screen
        border-r border-white/10
        bg-black/40
        backdrop-blur-xl
        p-8
      "
    >

      {/* Logo */}
      <div className="mb-16">

        <div
          className="
            inline-flex
            px-4 py-2
            rounded-full
            border border-yellow-500/20
            bg-yellow-500/10
            text-yellow-500
            uppercase
            tracking-[5px]
            text-xs
            mb-5
          "
        >
          Ahanger Labs
        </div>

        <h1 className="text-4xl font-bold">
          Al-Kawthar
        </h1>

      </div>

      {/* Links */}
      <div className="flex flex-col gap-4">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="
                flex items-center gap-4
                px-5 py-4
                rounded-2xl
                text-zinc-300
                hover:text-white
                hover:bg-white/5
                transition
              "
            >

              <Icon size={20} />

              <span>{link.name}</span>

            </Link>
          );
        })}

      </div>

    </aside>
  );
}