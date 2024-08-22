"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/login";

/**
 * Method that will be used for authenticating user
 * After success user will be authenticated on system
 * if user provide bad credentials it will throw error
 *
 * @param {Object} credential
 * @returns {Object}
 * @throws {AuthError}
 */
export const login = async (credential: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(credential);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }

  return { success: "You are authenticated." };
};
