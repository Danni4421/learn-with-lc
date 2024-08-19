"use server";

import { z } from "zod";
import instanceApi from "@/lib/api";
import { PutFAQSchema, StoreFAQSchema } from "@/schemas/faqs";

export const storeQuestion = async (data: z.infer<typeof StoreFAQSchema>) => {
  try {
    const response = await instanceApi.post("/faqs", data);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menambahkan pertanyaan", error);
  }
};

export const fetchAllQuestion = async () => {
  try {
    const response = await instanceApi.get("/faqs");

    return response.data.data.faqs;
  } catch (error) {
    console.log("Gagal mendapatkan pertanyaan", error);
  }
};

export const fetchQuestionById = async (id: string) => {
  try {
    const response = await instanceApi.get(`/faqs/${id}`);

    return response.data.data.faq;
  } catch (error) {
    console.log("Gagal mendapatkan pertanyaan", error);
  }
};

export const putQuestionById = async (
  data: z.infer<typeof PutFAQSchema>,
  id: string,
) => {
  try {
    const response = await instanceApi.post(`/faqs/${id}`, {
      ...data,
      _method: "PUT",
    });

    return response.data.status;
  } catch (error) {
    console.log("Gagal mengubah pertanyaan", error);
  }
};

export const deleteQuestionById = async (id: string) => {
  try {
    const response = await instanceApi.delete(`/faqs/${id}`);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menghapus pertanyaan", error);
  }
};
