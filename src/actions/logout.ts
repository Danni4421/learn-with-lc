"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

/**
 * Function that will be used for logged out user from session
 * This method can be use after session expired and user will be logged out with this function.
 * Or the user really want to logout
 *
 * @param {NextRequest} req
 * @returns {NextResponse | void}
 */
export const logout = async (req?: NextRequest) => {
  try {
    const result = await signOut();
    cookies().delete("TOKEN");
    return Response.redirect(new URL("/auth/login", req?.nextUrl));
  } catch (error) {
    console.error("TERJADI ERROR", error);
  }
};
