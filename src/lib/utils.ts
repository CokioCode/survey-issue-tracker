import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function setCookie(
  name: string,
  value: string,
  options?: Cookies.CookieAttributes,
) {
  Cookies.set(name, value, {
    expires: 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}
