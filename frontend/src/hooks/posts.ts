import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const usePost = (middleware: any) => {
  const router = useRouter();
  const params = useParams();
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getPost = async (id: string) => {
    await csrf();
    const response = axios.get(`/api/posts/${id}`);
    return response;
  };
  const create = async (...props: any[]) => {
    await csrf();
    const response = axios.post("/api/posts", ...props);
    return response;
  };
  const update = async (...props: any[]) => {
    await csrf();
    const response = axios.put(`/api/posts/${params.id}`, ...props);
    return response;
  };
  const deletePost = async () => {
    await csrf();
    const response = axios.delete(`/api/posts/${params.id}`);
    return response;
  };
  return {
    getPosts,
    getPost,
    create,
    update,
    deletePost,
  };
};
