"use client";

import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  image: string;
  extract: string;
  created_at: string;
  // Agrega otras propiedades que sean necesarias
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (date: Date) => {
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
    try {
      const res = await axios("http://localhost:8000/api/posts");
      console.log(res.data);
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-hidden">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {post.extract}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{formatDate(new Date(post.created_at))}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
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
