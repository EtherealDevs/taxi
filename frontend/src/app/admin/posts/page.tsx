'use client'

import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function BlogPage() {
    const posts = [
        {
            id: '1',
            title: 'Viaje a Rio de Janeiro',
            excerpt: 'Descubre la vibrante metrópolis brasileña con sus rascacielos...',
            image: '/placeholder.svg?height=400&width=600',
            author: 'Juan Pérez',
            date: '2023-05-15',
            status: 'Publicado'
        },
        {
            id: '2',
            title: 'Aventura en Buenos Aires',
            excerpt: 'Una experiencia única en la capital argentina...',
            image: '/placeholder.svg?height=400&width=600',
            author: 'María García',
            date: '2023-05-16',
            status: 'Borrador'
        }
    ]

    return (
        <div className='overflow-hidden'>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
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
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>{post.author}</span>
                                <span>{post.date}</span>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className={`px-3 py-1 rounded-full text-xs ${post.status === 'Publicado'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                    {post.status}
                                </span>
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
    )
}

