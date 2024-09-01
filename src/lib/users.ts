import { User } from "@/types";
import instanceApi from "./api";

/**
 * Function that will be use for storing a new question
 *
 * @returns {Promise<User | undefined>}
 */
export const getUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  try {
    const response = await instanceApi.get(`/user/${username}`);

    return response.data.data.user;
  } catch (error) {
    // TODO: Error Handling
  }
};
