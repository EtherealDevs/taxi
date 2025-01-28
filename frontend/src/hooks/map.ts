import Axios from "axios";
export const useMap = () => {
  const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_NOMINATIM_URL,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const getAddress = async (coor: string) => {
    let coorSplit = coor.split(",");
    let lat = coorSplit[0];
    let lon = coorSplit[1];
    try {
      const response = await axios.get(
        `/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getAddress,
  };
};
