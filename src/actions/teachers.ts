"use server";

import { putTeacherById, storeTeacher } from "@/lib/teachers";
import { PutTeacherSchema, StoreTeacherSchema } from "@/schemas/teacher";

/**
 * Method that should be use to store a new teacher
 * After store a new teacher, you can see stored teacher on landing page
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
    const validatedPayload = StoreTeacherSchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal menambahkan pengajar." };
    }

    const response = await storeTeacher(formData);

    if (response !== "success") {
      return { error: "Gagal menambahkan pengajar." };
    }

    return { success: "Berhasil menambahkan pengajar." };
  } catch (error) {
    return { error: "Gagal menambahkan pengajar." };
  }
};

/**
 * Method that should be use to update selected teacher
 * After update teacher you can see updated teacher on landing page
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
    const validatedPayload = PutTeacherSchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal mengubah pengajar." };
    }

    const response = await putTeacherById(formData, id);

    if (response !== "success") {
      return { error: "Gagal mengubah pengajar." };
    }

    return { success: "Berhasil mengubah pengajar." };
  } catch (error) {
    return { error: "Gagal mengubah pengajar." };
  }
};
