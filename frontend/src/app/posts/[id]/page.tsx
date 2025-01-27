"use client";
import { Post } from "@/app/admin/posts/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePost } from "@/hooks/posts";

export default function ShowPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post[]>([]);
  const { getPost } = usePost("guest");
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    if (!id) return; // Evita ejecutar la función si `id` no está disponible
    try {
      const response = await getPost(id); // Llamada a la API
      setPost(response.data.post); // Actualiza el estado con los datos del post
    } catch (error) {
      console.error("Error al obtener el post:", error);
    }
  };

  return (
    <div>
      <h1>Post {post["id"]}</h1>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
}
