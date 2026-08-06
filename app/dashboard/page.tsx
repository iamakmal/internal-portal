import { AnnouncementForm } from "@/components/AnnouncementForm";
import { AnnouncementList } from "@/components/AnnouncementList";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/util";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");

  const displayName = session.user.name ?? session.user.email ?? "Team member";

  return (
    <div className="flex-1 w-full px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
                Welcome back
              </p>
              <h1 className="mt-2 text-2xl font-semibold">{displayName}</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Keep your team informed with timely announcements and updates.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200">
              Announcements hub
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {isAdmin(session?.user?.role) && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Share an update
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Post a new announcement for the whole team.
                </p>
              </div>
              <AnnouncementForm />
            </>
          )}

          <div className="mt-2 pt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Latest announcements
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Recent updates from your workspace.
              </p>
            </div>
            <AnnouncementList />
          </div>
        </section>
      </div>
    </div>
  );
}
