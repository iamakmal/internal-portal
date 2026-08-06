"use client";

import { useCreateAnnouncement } from "@/lib/api";
import { useState } from "react";

export function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSuccess = () => {
    setTitle("");
    setBody("");
    alert("Announcement posted successfully!");
  };

  const handleError = () => {
    alert("Failed to post announcement. Please try again.");
  };

  const { mutate, isError, error, isPending } = useCreateAnnouncement(
    handleSuccess,
    handleError,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    mutate({ title, body });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
    >
      <h2 className="text-sm font-semibold text-gray-700">
        Post an announcement
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's the announcement?"
        rows={3}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      {isError && (
        <p className="text-sm text-red-600">{(error as Error).message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-gray-900 text-white text-sm font-medium px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
