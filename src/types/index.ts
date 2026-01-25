import type { LucideIcon } from "lucide-react";

export interface User {
  id: string;
  username: string;
  email?: string;
  role: "admin" | "user";
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}
