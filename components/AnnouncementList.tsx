"use client";

import { useFetchAnnouncements } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AnnouncementList() {
  const { data, isLoading, isError, error } = useFetchAnnouncements();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading announcements…</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {(error as Error).message ?? "Something went wrong."}
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No announcements yet. Be the first to post one.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {data.map((item) => (
        <li
          key={item.id}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-medium text-gray-900">{item.title}</h3>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatDate(item.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
            {item.body}
          </p>
          <p className="text-xs text-gray-400 mt-2">— {item.author.name}</p>
        </li>
      ))}
    </ul>
  );
}
