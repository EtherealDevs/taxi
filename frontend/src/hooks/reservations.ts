import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
export interface reservation {
  id: string;
  userId: string;
  phone: string;
  dateStart: string;
  timeStart: string;
  code: string;
  name: string;
}
export const useReservation = () => {
  const router = useRouter();
  const getReservations = async () => {
    try {
      const response = await axios.get("/api/reservations");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getReservation = async (id: string) => {
    try {
      const response = await axios.get(`/api/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const create = async (formData: FormData) => {
    try {
      const response = await axios.post("/api/reservations", formData);
      router.push("/");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const deleteReservation = async (id: string) => {
    try {
      const response = await axios.delete(`/api/reservations/${id}`);
      router.push("/reservations");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    getReservations,
    getReservation,
    create,
    deleteReservation,
  };
};
