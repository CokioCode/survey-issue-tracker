import type { LucideIcon } from "lucide-react";

export interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
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
