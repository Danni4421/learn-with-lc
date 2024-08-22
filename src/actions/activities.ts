"use server";

import { storeActivity } from "@/lib/lbb";
import { StoreActivitySchema } from "@/schemas/activity";

/**
 * Method that should be use to store a new image of activities
 * After storing from this method you can see stored activities on landing page
 *
 * @param {FormData} data
 * @returns {Object}
 */
export const store = async (formData: FormData) => {
  let data: Array<FormDataEntryValue> = [];
  data = formData.getAll("images[]");

  try {
    const validatedPayload = StoreActivitySchema.safeParse({
      activities: data,
    });

    if (!validatedPayload.success) {
      return { error: "Gagal menambahkan aktifitas" };
    }

    const response = await storeActivity(formData);

    if (response !== "success") {
      return { error: "Gagal menambahkan aktifitas" };
    }

    return { success: "Berhasil menambahkan aktifitas" };
  } catch (error) {
    // TODO: Error Handling
  }
};
