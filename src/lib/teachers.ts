"use server";

import instanceApi from "@/lib/api";

/**
 * Function that will be used for storing a new teacher
 *
 * @param {FormData} data
 * @returns {string | void}
 */
export const storeTeacher = async (data: FormData) => {
  try {
    const response = await instanceApi.post("/teachers", data);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menambahkan guru", error);
  }
};

/**
 * Function that will be used for retrieving all teacher
 *
 * @returns {Teacher[]}
 */
export const fetchAllTeacher = async () => {
  try {
    const response = await instanceApi.get("/teachers");

    return response.data.data.teachers;
  } catch (error) {
    console.error("Gagal mendapatkan guru", error);
  }
};

/**
 * Function that will be used for retrieve spesific teacher
 *
 * @param {string} id
 * @returns {Teacher | void}
 */
export const fetchTeacherById = async (id: string) => {
  try {
    const response = await instanceApi.get(`/teachers/${id}`);

    return response.data.data.teacher;
  } catch (error) {
    console.log("Gagal mendapatkan guru", error);
  }
};

/**
 * Function that will be used for update teacher based on spesific teacher
 *
 * @param {FormData} data
 * @param {string} id
 * @returns {string | void}
 */
export const putTeacherById = async (data: FormData, id: string) => {
  data.append("_method", "PUT");

  try {
    const response = await instanceApi.post(`/teachers/${id}`, data);

    return response.data.status;
  } catch (error) {
    console.log("Gagal memperbarui guru", error);
  }
};

/**
 * Function that will be used for delete teacher based on spesific id
 *
 * @param {string} id
 * @returns {string | void}
 */
export const deleteTeacherById = async (id: string) => {
  try {
    const response = await instanceApi.delete(`/teachers/${id}`);

    return response.data.status;
  } catch (error) {
    console.log("Gagal menghapus guru", error);
  }
};
