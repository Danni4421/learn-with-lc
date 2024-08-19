"use server";

import { putTestimonyById, storeTestimony } from "@/lib/testimonials";
import { StoreTestimonySchema, EditTestimonySchema } from "@/schemas/testimony";

/**
 * Method that should be use to store a new testimony
 * After store a new testimony, you can see stored testimony on landing page
 *
 * @param {FormData} formData
 * @returns {Object}
 */
export const store = async (formData: FormData) => {
  const data: Record<string, any> = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const validatedPayload = StoreTestimonySchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal menambahkan testimoni" };
    }

    const response = await storeTestimony(formData);

    if (response !== "success") {
      return { error: "Gagal menambahkan testimoni" };
    }

    return { success: "Berhasil menambahkan testimoni" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

/**
 * Method that should be use to update selected testimony
 * After update testimony, you can see updated testimony on landing page
 *
 * @param {FormData} formData
 * @param {string} id
 * @returns {Object}
 */
export const update = async (formData: FormData, id: string) => {
  const data: Record<string, any> = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const validatedPayload = EditTestimonySchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal memperbarui testimoni" };
    }

    const response = await putTestimonyById(formData, id);

    if (response !== "success") {
      return { error: "Gagal memperbarui testimoni" };
    }

    return { success: "Berhasil memperbarui testimoni" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
