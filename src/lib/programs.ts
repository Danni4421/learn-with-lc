"use server";

import instanceApi from "@/lib/api";

/**
 * Function that will be used for storing a new program
 *
 * @param {FormData} data
 * @returns {string | void}
 */
export const storeProgram = async (data: FormData) => {
  try {
    const response = await instanceApi.post("/programs", data);

    return response.data.status;
  } catch (error) {
    // TODO: Error Handling
  }
};

/**
 * Function that will be used for retrieving all programs
 *
 * @returns {Program[] | void}
 */
export const fetchAllProgram = async () => {
  try {
    const response = await instanceApi.get("/programs");

    return response.data.data.programs;
  } catch (error) {
    // TODO: Error Handling
  }
};

/**
 * Function that will be used for retrieve detail of spesific program based on id
 *
 * @param {string} id
 * @returns {Program | void}
 */
export const fetchProgramById = async (id: string) => {
  try {
    const response = await instanceApi.get(`/programs/${id}`);

    return response.data.data.program;
  } catch (error) {
    // TODO: Error Handling
  }
};

/**
 * Function that will be used for update program based on id
 *
 * @param {FormData} data
 * @param {string} id
 * @returns {string | void}
 */
export const putProgramById = async (data: FormData, id: string) => {
  data.append("_method", "PUT");

  try {
    const response = await instanceApi.post(`/programs/${id}`, data);

    return response.data.status;
  } catch (error) {
    // TODO: Error Handling
  }
};

/**
 * Function that will be used for delete program based on id
 *
 * @param {string} id
 * @returns {string | void}
 */
export const deleteProgramById = async (id: string) => {
  try {
    const response = await instanceApi.delete(`/programs/${id}`);

    return response.data.status;
  } catch (error) {
    // TODO: Error Handling
  }
};
