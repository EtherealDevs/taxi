"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  X,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Post } from "@/app/admin/posts/page";
import { usePost } from "@/hooks/posts";

interface TravelPost {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  driver: string;
  images: string[];
  rating: number;
  fullDescription: string;
  highlights: string[];
}

export default function TravelPosts() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const { getPosts } = usePost();
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await getPosts();
    setPosts(response.posts);
  };

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [emblaModalRef, emblaModalApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const scrollModalPrev = useCallback(() => {
    if (emblaModalApi) emblaModalApi.scrollPrev();
  }, [emblaModalApi]);

  const scrollModalNext = useCallback(() => {
    if (emblaModalApi) emblaModalApi.scrollNext();
  }, [emblaModalApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="bg-gray-100/50 rounded-3xl pt-16 h-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-start text-gray-700 mb-1">
            {t("travelPosts.intro")}
          </h2>
          <div className="w-24 h-2 bg-blue-500 mt-1 mb-2" />
          <p className="text-gray-500 text-start">
            Aqui anuncio los viajes hechos y otros anuncios importantes
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaMainRef}>
            <div className="flex">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="relative lg:w-[55vw] w-full h-72">
                      <Image
                        src={post.images[0] || "/placeholder.svg"}
                        alt={post.title}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-3 text-sm line-clamp-2">
                        {post.extract}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPost(post)}
                        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-3xl font-medium hover:bg-blue-7 00 transition-colors text-sm"
                      >
                        Read More
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* <div className="mt-6" ref={emblaThumbsRef}>
          <div className="flex">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`flex-[0_0_33.33%] min-w-0 pl-4 ${index === selectedIndex ? "opacity-100" : "opacity-50"
                  }`}
              >
                <button
                  onClick={() => onThumbClick(index)}
                  className="w-full focus:outline-none"
                >
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <Image
                      src={post.images[0] || "/placeholder.svg"}
                      alt={post.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPost(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative max-w-6xl mx-auto my-8 bg-white rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-4 top-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-[60vh]" ref={emblaModalRef}>
                <div className="flex h-full">
                  {selectedPost.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] min-w-0 relative h-full"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${selectedPost.title} - Image ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollModalPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollModalNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">{selectedPost.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-6">
                        {selectedPost.content}
                      </p>
                      <h3 className="text-xl font-semibold mb-4">
                        Trip Highlights
                      </h3>
                      {/* <ul className="space-y-2">
                        {selectedPost.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <span className="w-2 h-2 bg-[#6944ff] rounded-full mr-2" />
                            {highlight}
                          </li>
                        ))}
                      </ul> */}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Trip Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-3" />
                          <span>{formatDate(selectedPost.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {/* {selectedPost.images.slice(0, 6).map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            setModalImageIndex(index);
                            if (emblaModalApi) emblaModalApi.scrollTo(index);
                          }}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${selectedPost.title} - Thumbnail ${
                              index + 1
                            }`}
                            width={100}
                            height={100}
                            layout="responsive"
                            className="object-cover"
                          />
                        </div>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
