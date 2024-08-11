import instanceApi from "@/lib/api";

export const fetchAllProgram = async () => {
  try {
    const response = await instanceApi.get("/programs");

    return response.data.data.programs;
  } catch (error) {
    console.error("Gagal mendapatkan program", error);
  }
};
