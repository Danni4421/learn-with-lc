"use server";

import instanceApi from "@/lib/api";
import { StoreActivitySchema } from "@/schemas/activity";
import { z } from "zod";

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

export const storeActivity = async (data: FormData) => {
  try {
    const response = await instanceApi.post("/lbb/activities", data);

    return response.data.status;
  } catch (error) {
    // TODO: Error Handling
  }
};

export const deleteActivityById = async (id: string) => {
  try {
    const response = await instanceApi.delete(`/lbb/activities/${id}`);

    return response.data.status;
  } catch (error) {
    // TODO: Error Handling
  }
};
