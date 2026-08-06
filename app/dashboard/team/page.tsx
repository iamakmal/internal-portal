"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { isAdmin } from "@/lib/util";
import { useFetchTeam } from "@/lib/api";

export default function TeamPage() {
  const { data: session, status } = useSession();
  const userRole = (session?.user as { role?: string } | undefined)?.role;

  const { data: members, isLoading, error, refetch } = useFetchTeam();

  useEffect(() => {
    if (status === "authenticated" && !isAdmin(userRole)) {
      redirect("/dashboard");
    }
  }, [status, userRole]);

  useEffect(() => {
    if (status === "authenticated" && isAdmin(userRole)) {
      refetch();
    }
  }, [status, userRole, refetch]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Loading your workspace...
        </div>
      </div>
    );
  }

  if (!isAdmin(userRole)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700 shadow-sm">
          Access denied
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-linear-to-r from-blue-50 to-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                People
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Team Directory
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                View team members and their roles in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
              {members?.length ?? 0} members
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error.toString()}
            </div>
          )}

          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
              Loading team members...
            </div>
          ) : members?.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No team members found yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members?.map((member) => (
                <TeamMemberCard
                  key={member?.id}
                  name={member?.name}
                  email={member?.email}
                  role={member?.role}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
