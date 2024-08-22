import axios from "axios";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import { LoginSchema } from "@/schemas/login";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);

          const { token, expiredIn } = await axios
            .post(
              `${process.env.BASE_API_URL}/auth/login` ??
                "http://localhost:8000/api/auth/login",
              {
                email,
                password,
              }
            )
            .then((response) => response.data.data)
            .then(({ token, expired_in }) => {
              return { token, expiredIn: expired_in };
            });

          if (!token) {
            throw new Error("User now found.");
          }

          cookies().set("TOKEN", token, {
            maxAge: expiredIn,
          });

          const user = await axios
            .get(
              `${process.env.BASE_API_URL}/auth/me` ??
                "http://localhost:8000/api/auth/me",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => response.data.data)
            .then((data) => data.user)
            .catch(() => null);

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
