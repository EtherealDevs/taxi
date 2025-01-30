import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Post {
  title: string;
  content: string;
  extract: string; // Puedes ajustar esto según las propiedades de un post
}

export const usePost = () => {
  const router = useRouter();
  const params = useParams();

  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
      throw error;
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      throw error;
    }
  };

  const getPost = async (id: string) => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la publicación con ID ${id}:`, error);
      throw error;
    }
  };

  const create = async (props: FormData) => {
    await csrf();
    try {
      const response = await axios.post("/api/posts", props);
      console.log("Publicación creada:", response.data);
      router.push("/admin/posts");
      return response.data;
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      if (error.response?.status === 422) {
        return error.response.data;
      }
      throw error;
    }
  };

  const update = async (id: string, props: FormData) => {
    await csrf();
    console.log(props);
    try {
      const response = await axios.post(`/api/posts/${id}?_method=PUT`, props);
      console.log("Publicación actualizada:", response.data);
      router.push("/admin/posts");
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la publicación con ID ${id}:`, error);
      if (error.response?.status === 422) {
        return error.response.data;
      }
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    await csrf();
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      console.log("Publicación eliminada:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la publicación con ID ${id}:`, error);
      throw error;
    }
  };

  return {
    getPosts,
    getPost,
    create,
    update,
    deletePost,
  };
};
