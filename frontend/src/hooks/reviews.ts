import axios from "@/lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Review {
  id: string;
  reservationId: string;
  content: string;
  stars: number;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const useReview = () => {
  const router = useRouter();
  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
      throw error;
    }
  };
  const getReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los reviews:", error);
      throw error;
    }
  };
  const getReview = async (id: string) => {
    try {
      const response = await axios.get(`/api/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el review:", error);
      throw error;
    }
  };
  const createReview = async (FormData: FormData) => {
    await csrf();
    try {
      const response = await axios.post("/api/reviews", FormData);
      return response.data;
    } catch (error) {
      console.error("Error al crear el review:", error);
      throw error;
    }
  };
  const updateReview = async (id: string, FormData: FormData) => {
    await csrf();
    try {
      const response = await axios.put(`/api/reviews/${id}`, FormData);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el review:", error);
      throw error;
    }
  };
  const deleteReview = async (id: string) => {
    await csrf();
    try {
      const response = await axios.delete(`/api/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el review:", error);
      throw error;
    }
  };
  return {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
  };
};
