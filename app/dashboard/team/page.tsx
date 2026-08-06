"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { isAdmin } from "@/lib/util";
import { useFetchTeam } from "@/lib/api";

export default function TeamPage() {
  const { data: session, status } = useSession();

  const { data: members, isLoading, error, refetch } = useFetchTeam();

  useEffect(() => {
    if (status === "authenticated" && !isAdmin(session?.user?.role)) {
      redirect("/dashboard");
    }
  }, [status, session?.user?.role]);

  useEffect(() => {
    if (status === "authenticated" && isAdmin(session?.user?.role)) {
      refetch();
    }
  }, [status, session?.user?.role, refetch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!isAdmin(session?.user?.role)) {
    return <div className="text-red-500">Access denied</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Directory</h1>
        <p className="text-gray-600 mt-2">
          View all team members and their roles
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error.toString()}
        </div>
      )}

      {isLoading ? (
        <div className="text-gray-600">Loading team members...</div>
      ) : members?.length === 0 ? (
        <div className="text-gray-600">No team members found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
