"use client"

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

export default function OtherPosts() {

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
    console.log(posts[0]);
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
        <div className="mt-2 h-[350px] w-34">
            <h3 className="text-2xl font-bold text-gray-700 mb-1">Otros anuncios y viajes</h3>
            <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
            <div className="h-[600px] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full gap-4">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                            onClick={() => setSelectedPost(post)}
                        >
                            <div className="relative h-48">
                                <Image
                                    src={post.images[0] || "/placeholder.svg"}
                                    alt={post.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-500 mb-2">{formatDate(post.created_at)}</p>
                                <h4 className="font-semibold text-lg line-clamp-2 group-hover:text-[#6944ff] transition-colors">
                                    {post.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
