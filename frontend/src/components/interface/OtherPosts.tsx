"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/posts";
import { Post } from "@/app/admin/posts/page";

// Mock data for testing

export default function OtherPosts() {
  const { t } = useTranslation();
  const { getPosts } = usePost();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        const response = await getPosts();
        setPosts(response.posts);
      } catch (err) {
        setError(
          t("OtherPosts.error")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const visiblePosts = showAllPosts ? posts : posts.slice(0, 4);

  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-1">
          Mis viajes y anuncios
        </h3>
        <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
        <div className="text-center">Cargando posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-1">
          Mis viajes y anuncios
        </h3>
        <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h3 className="text-2xl font-bold text-gray-700 mb-1">
        Mis viajes y anuncios
      </h3>
      <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visiblePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={post.images[0] || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">
                {formatDate(post.created_at)}
              </p>
              <h4 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {post.extract}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {posts.length > 4 && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => setShowAllPosts(!showAllPosts)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            {showAllPosts ? "Ver menos" : "Ver más"}
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllPosts ? "rotate-180" : ""
                }`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
