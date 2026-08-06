"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Users, Megaphone, LogOut, Sparkles } from "lucide-react";
import { User } from "@/lib/types";

const navItems = [
  {
    label: "Team Directory",
    href: "/dashboard/team",
    icon: Users,
    adminOnly: true,
  },
  {
    label: "Announcements",
    href: "/dashboard",
    icon: Megaphone,
    adminOnly: false,
  },
];

export function SideBar({ user }: { user: User }) {
  const pathname = usePathname();
  const isAdmin = user.role === "admin";
  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col border-r border-slate-200 bg-slate-950 px-3 py-4 text-slate-100 md:flex">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-base font-semibold">Kinetic Enterprise</h1>
            <p className="text-sm text-slate-300">Internal Portal</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
          Stay aligned with your team
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-2 overflow-y-auto">
        {visibleItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          const linkClasses = isActive
            ? "bg-blue-500/15 text-white shadow-sm ring-1 ring-blue-400/20"
            : "text-slate-300 hover:bg-white/10 hover:text-white";

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${linkClasses}`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.4 : 2}
                className={`shrink-0 transition-transform duration-200 ${isActive ? "text-blue-300" : "text-slate-400 group-hover:text-slate-200"}`}
              />
              <span className="text-sm font-medium">{label}</span>
              {isActive && (
                <span className="ml-auto h-2 w-2 rounded-full bg-blue-400" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            {user.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user.name}
            </p>
            <p className="truncate text-sm capitalize text-slate-300">
              {user.role}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            aria-label="Sign out"
            className="rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
