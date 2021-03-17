export interface User {
  email: string;
  fullName: string;
  favorites: Record<string, boolean>;
}
