"use server";

import instanceApi from "./api";

export const fetchAllQuestion = async () => {
  try {
    const response = await instanceApi.get("/faqs");

    return response.data.data.faqs;
  } catch (error) {
    console.log("Gagal mendapatkan pertanyaan", error);
  }
};
