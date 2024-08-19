"use server";

import instanceApi from "@/lib/api";
import { EditTestimonySchema, StoreTestimonySchema } from "@/schemas/testimony";
import { z } from "zod";

export const storeTestimony = async (data: FormData) => {
  try {
    const response = await instanceApi.post("/testimonials", data);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menambahkan testimony", error);

    // TODO: Add Error Handling
  }
};

export const fetchAllTestimonial = async () => {
  try {
    const response = await instanceApi.get("/testimonials");

    return response.data.data.testimonials;
  } catch (error) {
    console.error("Gagal mendapatkan testimony", error);

    // TODO: Add Error Handling
  }
};

export const fetchTestimonyById = async (id: string) => {
  try {
    const response = await instanceApi.get(`/testimonials/${id}`);

    return response.data.data.testimony;
  } catch (error) {
    console.error("Gagal mendapatkan testimony", error);

    // TODO: Add Error Handling
  }
};

export const putTestimonyById = async (data: FormData, id: string) => {
  data.append("_method", "PUT");

  try {
    const response = await instanceApi.post(`/testimonials/${id}`, data);

    return response.data.status;
  } catch (error) {
    console.error("Gagal memperbarui testimoni", error);

    // TODO: Add Error Handling
  }
};

export const deleteTestimonyById = async (id: string) => {
  try {
    const response = await instanceApi.delete(`/testimonials/${id}`);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menghapus testimoni", error);

    // TODO: Add Error Handling
  }
};
