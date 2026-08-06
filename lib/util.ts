export type UserRole = "admin" | "employee";

export const isAdmin = (role: string | undefined): boolean => {
  return role === "admin";
};

export const isEmployee = (role: string | undefined): boolean => {
  return role === "employee";
};

export const canCreateAnnouncement = (role: string | undefined): boolean => {
  return isAdmin(role);
};

export const canViewTeamDirectory = (role: string | undefined): boolean => {
  return isAdmin(role);
};

export const canViewAnnouncements = (role: string | undefined): boolean => {
  return role === "admin" || role === "employee";
};
