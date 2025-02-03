import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { car } from "./cars";
export interface Drivers {
  id: number;
  name: string;
  lastname: string;
  phone_number: string;
  languages: string;
  rating: number;
  userId: string;
  cars: car;
}
export const useDriver = () => {
  const router = useRouter();
  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const getDrivers = async () => {
    try {
      const response = await axios.get("/api/drivers");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getDriver = async (id: string) => {
    await csrf();
    try {
      const response = await axios.get(`/api/drivers/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createDriver = async (FormData: FormData) => {
    await csrf();
    try {
      const response = await axios.post("/api/drivers", FormData);
      router.push("/admin/drivers");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateDriver = async (id: string, FormData: FormData) => {
    await csrf();
    try {
      const response = await axios.post(
        `/api/drivers/${id}?_method=PUT`,
        FormData
      );
      router.push("/admin/drivers");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const deleteDriver = async (id: string) => {
    await csrf();
    try {
      const response = await axios.delete(`/api/drivers/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    getDriver,
    createDriver,
    updateDriver,
    deleteDriver,
    getDrivers,
  };
};
