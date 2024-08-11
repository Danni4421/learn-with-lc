"use server";

import { cookies } from "next/headers";
import { LoginProps } from "@/types/auth";
import instanceApi from "@/lib/api";

export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await instanceApi.post("/auth/login", {
      email,
      password,
    });

    const { token, expired_in } = response.data.data;

    const cookieStore = cookies();
    cookieStore.set("TOKEN", token, {
      maxAge: expired_in,
    });
  } catch (error) {
    console.error("Login failed", error);
  }
};
