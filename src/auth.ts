import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { User } from "@/types";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.MAX_EXPIRE_TIME ?? "") ?? 60,
  },
  callbacks: {
    session: ({ session }) => {
      return session;
    },
  },
  ...authConfig,
  trustHost: true,
});
