import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Announcement, TeamMember } from "./types";

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const res = await fetch("/api/announcements");
  if (!res.ok) throw new Error("Failed to load announcements");
  return res.json();
}

export const useFetchAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });
};

export async function fetchTeam(): Promise<TeamMember[]> {
  const res = await fetch("/api/team");
  if (!res.ok) throw new Error("Failed to load team members");
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("You do not have permission to view the team directory");
    }
    throw new Error("Failed to fetch team members");
  }
  return res.json();
}

export const useFetchTeam: () => UseQueryResult<TeamMember[], Error> = () => {
  return useQuery({
    queryKey: ["team"],
    queryFn: fetchTeam,
    enabled: false,
  });
};

export async function createAnnouncement(input: {
  title: string;
  body: string;
}): Promise<Announcement> {
  const res = await fetch("/api/announcements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? "Failed to create announcement");
  }
  return res.json();
}

export const useCreateAnnouncement = (
  onSuccess: () => void,
  onError: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: () => {
      onError();
    },
  });
};
