'use server';

import { cookies } from 'next/headers';

export const register = async (
  email: string,
  password1: string,
  password2: string,
  first_name: string,
  last_name: string
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password1, password2, first_name, last_name }),
      cache: "no-store",
    });

    const data = await response.json(); // the response is an object with one key labeled "key"

    if (!response.ok) {
      // dj-rest-auth sends field-specific errors like { email: ["A user with that email already exists."] }
      throw data;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error };
  }
};

export async function login(email: string, password: string) {
  const res = await fetch("http://127.0.0.1:8000/api/v1/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return { success: false };

  const { access, refresh } = await res.json();

  const cookieStore = await cookies();
  cookieStore.set("access_token", access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours (access tokens are short-lived anyway)
  });

  cookieStore.set("refresh_token", refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return { success: true };
}