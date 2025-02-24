import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Drivers } from "./drivers";
import { FormattedAddress } from "@/lib/formatAddress";
export interface reservation {
  id: string;
  userId: string;
  phone: string;
  date_start: string;
  time_start: string;
  code: string;
  name: string;
  driver: Drivers;
  status: string;
  stations: FormattedAddress[];
}
export const useReservation = () => {
  const router = useRouter();
  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
      throw error;
    }
  };
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
  const getReservationWithPendingReview = async (id: number | undefined) => {
    try {
      const response = await axios.get(`/api/reservations/user_review/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getReservationsUser = async (id: number | undefined) => {
    try {
      const response = await axios.get(`/api/reservations/user/${id}`);
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
  const update = async (id: string, formData: FormData) => {
    await csrf();
    try {
      const response = await axios.post(
        `/api/reservations/${id}?_method=PATCH`,
        formData
      );
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
    update,
    deleteReservation,
    getReservationWithPendingReview,
    getReservationsUser,
  };
};
