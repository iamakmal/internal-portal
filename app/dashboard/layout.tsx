import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SideBar } from "@/components/SideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <SideBar user={session?.user} />
      <main className="flex-1 ml-0 md:ml-30 flex flex-col h-full w-full">
        {children}
      </main>
    </div>
  );
}
