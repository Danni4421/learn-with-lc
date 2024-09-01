/** Libraries */
import instanceApi from "@/lib/api";

/** Types */
import { User } from "@/types";

/**
 * Function that will be use for storing a new question
 *
 * @returns {Promise<User | undefined>}
 */
export const me = async (): Promise<User | undefined> => {
  try {
    const response = await instanceApi.get("/auth/me");

    return response.data.data.user;
  } catch (error) {
    // TODO: Error Handling
  }
};
