export const AUTH_STORAGE_KEY = "asteria-user";

export function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Unable to read stored session", error);
    return null;
  }
}

export function saveUser(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getDefaultUserRole(email = "") {
  const normalized = email.trim().toLowerCase();
  if (normalized.includes("admin") || normalized === "admin@asteria.in") {
    return "admin";
  }
  return "guest";
}
