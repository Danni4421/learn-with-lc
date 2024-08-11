import instanceApi from "@/lib/api";

export const fecthLBB = async () => {
  return instanceApi
    .get("/lbb")
    .then((response) => response.data.data)
    .then((data) => data.lbb)
    .catch((error) => {
      return Promise.reject(error);
    });
};
