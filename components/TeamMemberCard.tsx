interface Props {
  name: string | null;
  email: string | null;
  role: string;
}

export function TeamMemberCard({ name, email, role }: Props) {
  const initials = (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 font-semibold text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-slate-900">
            {name || "Unknown"}
          </p>
          <p className="truncate text-sm text-slate-500">
            {email || "No email provided"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-blue-700">
          {role}
        </span>
      </div>
    </div>
  );
}
