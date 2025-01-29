"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Calendar,
  User,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/hooks/posts";

export interface Post {
  id: string;
  title: string;
  extract: string;
  content: string;
  images: [string];
  created_at: string;
  author: string;
  likes: number;
  status: "Publicado" | "Borrador";
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const { getPosts, deletePost } = usePost();
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error al cargar las publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una publicación
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (!confirmDelete) return;

    try {
      await deletePost(id);
      alert("Publicación eliminada correctamente");

      // Actualizar la lista de publicaciones después de la eliminación
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      alert("No se pudo eliminar la publicación");
    }
  };
  if (loading) return <p>Cargando publicaciones...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Blog Posts
        </h1>
        <Link href="/admin/posts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Post
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <Image
                src={post.images[0] || "/placeholder.svg"}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <Badge
                className="absolute top-4 right-4"
                variant={post.status === "Publicado" ? "default" : "secondary"}
              >
                {post.status}
              </Badge>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {post.extract}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{post.author}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-blue-500">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/posts/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
