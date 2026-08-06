"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Users, Megaphone, LogOut } from "lucide-react";
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
    <nav className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col border-r border-gray-200 bg-white px-2 py-4 md:flex">
      <div className="px-4 pb-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Kinetic Enterprise
        </h1>
        <p className="text-sm text-gray-500">Internal Portal</p>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {visibleItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          const linkClasses = isActive
            ? "bg-blue-50 text-blue-700 font-semibold"
            : "text-gray-600 hover:bg-gray-100";
          const iconClasses = isActive ? "" : "group-hover:translate-x-0.5";

          return (
            <a
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${linkClasses}`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.4 : 2}
                className={`shrink-0 transition-transform duration-200 ${iconClasses}`}
              />
              <span>{label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
              )}
            </a>
          );
        })}
      </div>

      <div className="mt-4 border-t border-gray-200 px-2 pt-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-gray-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            {user.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-sm capitalize text-gray-500">
              {user.role}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            aria-label="Sign out"
            className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-200 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
