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
  id: number;
  title: string;
  extract: string;
  content: string;
  image: string;
  created_at: string;
  author: string;
  likes: number;
  status: "Publicado" | "Borrador";
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const { getPosts } = usePost("guest");
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

  // const fetchData = async () => {
  //   try {
  //     // Simulating API call with test data
  //     let testPosts: Post[] = [
  //       {
  //         id: 1,
  //         title: "Descubriendo los secretos de la Patagonia",
  //         extract:
  //           "Un viaje inolvidable por los paisajes más impresionantes del sur de Argentina y Chile.",
  //         content:
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //         image: "/placeholder.svg?height=400&width=600",
  //         created_at: "2023-05-15T10:30:00",
  //         author: "María González",
  //         likes: 156,
  //         status: "Publicado",
  //       },
  //       {
  //         id: 2,
  //         title: "Gastronomía peruana: Un festín para los sentidos",
  //         extract:
  //           "Explorando los sabores y aromas de la cocina peruana, desde el ceviche hasta el pisco sour.",
  //         content:
  //           "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //         image: "/placeholder.svg?height=400&width=600",
  //         created_at: "2023-05-10T14:45:00",
  //         author: "Carlos Rodríguez",
  //         likes: 89,
  //         status: "Borrador",
  //       },
  //       {
  //         id: 3,
  //         title: "Carnaval de Río: La fiesta más grande del mundo",
  //         extract:
  //           "Viviendo la experiencia del famoso carnaval brasileño, sus colores, música y alegría.",
  //         content:
  //           "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  //         image: "/placeholder.svg?height=400&width=600",
  //         created_at: "2023-05-05T09:15:00",
  //         author: "Ana Silva",
  //         likes: 234,
  //         status: "Publicado",
  //       },
  //     ];
  //     //peticion de posts a la api
  //     const response = await axios.get("/api/posts/");
  //     console.log(response.data.posts);

  //     setPosts(testPosts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchData = async () => {
    const response = await getPosts();
    setPosts(response.posts);
  };

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
                src={post.image || "/placeholder.svg"}
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
                  <Button variant="destructive" size="sm">
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
