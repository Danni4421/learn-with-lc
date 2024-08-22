import NextAuth from "next-auth";
import { NextFetchEvent, NextRequest } from "next/server";

import authConfig from "@/auth.config";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import instanceApi from "@/lib/api";
import { InternalAxiosRequestConfig } from "axios";
import { signOut } from "@/auth";
import { logout } from "./actions/logout";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const tokenCookie = req.cookies.get("TOKEN");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.some((pattern) =>
    new RegExp(pattern).test(nextUrl.pathname)
  );

  if (tokenCookie) {
    instanceApi.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = `Bearer ${tokenCookie.name}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  if (isApiAuthRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return undefined;
  }

  if (!isPublicRoute && isLoggedIn) {
    if (!tokenCookie) {
      return Response.redirect(new URL("/api/auth/signout", nextUrl));
    }

    return undefined;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return undefined;
}) as unknown as (
  req: NextRequest,
  event: NextFetchEvent
) => Promise<Response | undefined>;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
