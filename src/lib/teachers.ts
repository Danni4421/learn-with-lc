"use server";

import instanceApi from "@/lib/api";

export const storeTeacher = async (data: FormData) => {
  try {
    const response = await instanceApi.post("/teachers", data);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menambahkan guru", error);
  }
};

export const fetchAllTeacher = async () => {
  try {
    const response = await instanceApi.get("/teachers");

    return response.data.data.teachers;
  } catch (error) {
    console.error("Gagal mendapatkan guru", error);
  }
};

export const fetchTeacherById = async (id: string) => {
  try {
    const response = await instanceApi.get(`/teachers/${id}`);

    return response.data.data.teacher;
  } catch (error) {
    console.log("Gagal mendapatkan guru", error);
  }
};

export const putTeacherById = async (data: FormData, id: string) => {
  data.append("_method", "PUT");

  try {
    const response = await instanceApi.post(`/teachers/${id}`, data);

    return response.data.status;
  } catch (error) {
    console.log("Gagal memperbarui guru", error);
  }
};

export const deleteTeacherById = async (id: string) => {
  try {
    const response = await instanceApi.delete(`/teachers/${id}`);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menghapus guru", error);
  }
};
