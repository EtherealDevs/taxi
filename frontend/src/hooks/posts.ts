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
    const response = axios.get(`/api/posts/${id}`);
    return response;
  };
  const create = async ({ ...props }) => {
    await csrf();
    axios.post("/api/posts", props).catch((error) => {
      if (error.response.status !== 422) throw error;
    });
    window.location.pathname = "/admin/posts";
  };
  const update = async ({ ...props }) => {
    await csrf();
    axios.put(`/api/posts/${params.id}`, props).catch((error) => {
      if (error.response.status !== 422) throw error;
    });
    window.location.pathname = "/admin/posts";
  };
  const deletePost = async () => {
    await csrf();
    axios.delete(`/api/posts/${params.id}`).catch((error) => {
      if (error.response.status !== 422) throw error;
    });
    window.location.pathname = "/admin/posts";
  };
  return {
    getPosts,
    getPost,
    create,
    update,
    deletePost,
  };
};
