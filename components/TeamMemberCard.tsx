interface Props {
  name: string | null;
  email: string | null;
  role: string;
}

export function TeamMemberCard({ name, email, role }: Props) {
  return (
    <div className="space-y-2">
      <div>
        <p className="font-semibold text-lg">{name || "Unknown"}</p>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
          {role}
        </span>
      </div>
    </div>
  );
}
