"use server";

import instanceApi from "@/lib/api";

export const fetchAllTestimonial = async () => {
  try {
    const response = await instanceApi.get("/testimonials");

    return response.data.data.testimonials;
  } catch (error) {
    console.error("Gagal mendapatkan testimony", error);
  }
};

export const fetchTestimonyById = async (id: string) => {
  try {
    const response = await instanceApi.get(`/testimonials/${id}`);

    return response.data.data.testimony;
  } catch (error) {
    console.error("Gagal mendapatkan testimony", error);
  }
};
