import { AnnouncementForm } from "@/components/AnnouncementForm";
import { AnnouncementList } from "@/components/AnnouncementList";
import { SignOutButton } from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");

  return (
    <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold">Team Portal</h1>
          <p className="text-sm text-gray-500">
            Signed in as {session.user.name ?? session.user.email}
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="space-y-6">
        <AnnouncementForm />
        <AnnouncementList />
      </section>
    </div>
  );
}
