export interface User {
  id: string;
  email: string;
  fullName: string;
  favorites: Record<string, boolean>;
  picture: string;
}
