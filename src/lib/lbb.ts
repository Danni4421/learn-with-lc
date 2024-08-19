"use server";

import instanceApi from "@/lib/api";

/**
 * Function that will be used for retrieve lbb content
 *
 * @returns {LBB | void}}
 */
export const fecthLBB = async () => {
  try {
    const response = await instanceApi.get("/lbb");

    return response.data.data.lbb;
  } catch (error) {
    console.log("LBB Content Not Found", error);
  }
};
