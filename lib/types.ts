export type Announcement = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  authorId: string;
  author: { name: string };
};

export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  role: string;
};

export type TeamMember = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
};
