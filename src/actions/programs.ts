/** Schemas */
import { PutProgramSchema, StoreProgramSchema } from "@/schemas/program";

/** Libraries */
import { putProgramById, storeProgram } from "@/lib/programs";

/**
 * Method that should be use to store a new program
 * After store a new program, you can see stored program on landing page
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
    const validatedPayload = StoreProgramSchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal menambahkan program." };
    }

    const response = await storeProgram(formData);

    if (response !== "success") {
      return { error: "Gagal menambahkan program." };
    }

    return { success: "Berhasil menambahkan program." };
  } catch (error) {}
};

/**
 * Method that should be use to update selected program
 * After update program you can see updated program on landing page
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
    const validatedPayload = PutProgramSchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal mengubah program." };
    }

    const response = await putProgramById(formData, id);

    if (response !== "success") {
      return { error: "Gagal mengubah program." };
    }

    return { success: "Berhasil mengubah program." };
  } catch (error) {
    return { error: "Gagal mengubah program." };
  }
};
