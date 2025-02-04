import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export interface Car {
  id: string;
  patent: string;
  brand: string;
  model: string;
  year: string;
  type: string;
  description: string;
  seats: number;
  driverId: string;
}

export const useCar = () => {
  const router = useRouter();
  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
      throw error;
    }
  };
  const getCars = async () => {
    try {
      await csrf();
      const response = await axios.get("/api/cars");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los autos:", error);
      throw error;
    }
  };
  const getCar = async (id: string) => {
    try {
      const response = await axios.get(`/api/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el coche:", error);
      throw error;
    }
  };
  const createCar = async (FormData: FormData) => {
    await csrf();
    try {
      const response = await axios.post("/api/cars", FormData);
      router.push("/admin/cars");
      return response.data;
    } catch (error) {
      console.error("Error al crear el coche:", error);
      throw error;
    }
  };
  const updateCar = async (id: string, FormData: FormData) => {
    await csrf();
    try {
      const response = await axios.post(
        `/api/cars/${id}?_method=PUT`,
        FormData
      );
      router.push("/admin/cars");
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el coche:", error);
      throw error;
    }
  };
  const deleteCar = async (id: string) => {
    await csrf();
    try {
      const response = await axios.delete(`/api/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el coche:", error);
      throw error;
    }
  };
  return {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
  };
};
