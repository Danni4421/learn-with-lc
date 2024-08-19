"use server";

import { z } from "zod";
import { putQuestionById, storeQuestion } from "@/lib/faqs";
import { PutFAQSchema, StoreFAQSchema } from "@/schemas/faq";

/**
 * Method that should be use to store a new question related with lbb
 * After storing from this method you can see stored question on FAQ section in landing page
 *
 * @param {Object} data
 * @returns {Object}
 */
export const store = async (data: z.infer<typeof StoreFAQSchema>) => {
  try {
    const validatedPayload = StoreFAQSchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal menambahkan pertanyaan, Mohon periksa kembali." };
    }

    const response = await storeQuestion(validatedPayload.data);

    if (response !== "success") {
      return { error: "Gagal menambahkan pertanyaan, Mohon periksa kembali." };
    }

    return { success: "Berhasil menambahkan pertanyaan." };
  } catch (error) {
    // TODO: Create a better error handling
  }
};

/**
 * Method that should be use to update selected question
 * After update question you can see updated question on landing page
 *
 * @param {Object} data
 * @param {string} id
 * @returns {Object}
 */
export const update = async (
  data: z.infer<typeof PutFAQSchema>,
  id: string
) => {
  try {
    const validatedPayload = PutFAQSchema.safeParse(data);

    if (!validatedPayload.success) {
      return { error: "Gagal mengubah pertanyaan, Mohon periksa kembali." };
    }

    const response = await putQuestionById(data, id);

    if (response !== "success") {
      return { error: "Gagal mengubah pertanyaan, Mohon periksa kembali." };
    }

    return { success: "Berhasil mengubah pertanyaan." };
  } catch (error) {
    // TODO: Create a better error handling
  }
};
