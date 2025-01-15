'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Upload, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { useParams } from 'next/navigation'

export default function EditBlogPost() {
    const { id } = useParams()
    const [post, setPost] = useState({
        title: 'Viaje a Rio de Janeiro',
        excerpt: 'Descubre la vibrante metrópolis brasileña con sus rascacielos...',
        content: 'Contenido completo del post...',
        image: '/placeholder.svg?height=400&width=600',
        status: 'published',
        category: 'travel',
        tags: ['Rio', 'Brasil', 'Viajes'],
        allowComments: true,
        isFeatured: false
    })
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [newTag, setNewTag] = useState('')

    useEffect(() => {
        // Simulating API call to fetch post data
        const fetchPost = async () => {
            // In a real application, you would fetch the post data using the id
            // For now, we'll just use the initial state
            setImagePreview(post.image)
        }
        fetchPost()
    }, [id, post.image])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }))
    }

    const handleStatusChange = (value: string) => {
        setPost(prevPost => ({
            ...prevPost,
            status: value
        }))
    }

    const handleCategoryChange = (value: string) => {
        setPost(prevPost => ({
            ...prevPost,
            category: value
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
                setPost(prevPost => ({
                    ...prevPost,
                    image: reader.result as string
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddTag = () => {
        if (newTag && !post.tags.includes(newTag)) {
            setPost(prevPost => ({
                ...prevPost,
                tags: [...prevPost.tags, newTag]
            }))
            setNewTag('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setPost(prevPost => ({
            ...prevPost,
            tags: prevPost.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSwitchChange = (name: string) => {
        setPost(prevPost => ({
            ...prevPost,
            [name]: !prevPost[name as keyof typeof prevPost]
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Here you would typically send the updated post data to your backend
        console.log('Updated post:', post)
        // Implement your save logic here
    }

    return (
        <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Editar Post: {post.title}
                </h1>

                <Tabs defaultTab="content">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="content">Contenido</TabsTrigger>
                        <TabsTrigger value="media">Multimedia</TabsTrigger>
                        <TabsTrigger value="settings">Configuración</TabsTrigger>
                    </TabsList>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <TabsContent value="content">
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="title">Título</Label>
                                    <Input id="title" name="title" value={post.title} onChange={handleInputChange} />
                                </div>

                                <div>
                                    <Label htmlFor="excerpt">Extracto</Label>
                                    <Textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={post.excerpt}
                                        onChange={handleInputChange}
                                        className="h-20"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="content">Contenido</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={post.content}
                                        onChange={handleInputChange}
                                        className="h-64"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="tags">Etiquetas</Label>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Input
                                            id="tags"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            placeholder="Agregar etiqueta"
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                        />
                                        <Button type="button" onClick={handleAddTag} size="sm">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Agregar
                                        </Button>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm">
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="media">
                            <div className="space-y-6">
                                <div>
                                    <Label>Imagen Principal</Label>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {imagePreview ? (
                                                        <Image
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            width={400}
                                                            height={300}
                                                            className="h-full w-full object-cover rounded-lg"
                                                            priority
                                                        />
                                                    ) : (
                                                        <>
                                                            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">Click para subir</span> o arrastre y suelte
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                PNG, JPG o GIF (MAX. 800x400px)
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings">
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="category">Categoría</Label>
                                    <Select defaultValue={post.category} onValueChange={handleCategoryChange}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Seleccione una categoría" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="travel">Viajes</SelectItem>
                                            <SelectItem value="lifestyle">Estilo de Vida</SelectItem>
                                            <SelectItem value="technology">Tecnología</SelectItem>
                                            <SelectItem value="food">Gastronomía</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="status">Estado</Label>
                                    <Select defaultValue={post.status} onValueChange={handleStatusChange}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Seleccione el estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Borrador</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="allowComments" className="flex items-center gap-2">
                                        Permitir comentarios
                                    </Label>
                                    <Switch
                                        id="allowComments"
                                        checked={post.allowComments}
                                        onChange={() => handleSwitchChange('allowComments')}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="isFeatured" className="flex items-center gap-2">
                                        Destacar post
                                    </Label>
                                    <Switch
                                        id="isFeatured"
                                        checked={post.isFeatured}
                                        onChange={() => handleSwitchChange('isFeatured')}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <div className="flex justify-end gap-4 pt-6">
                            <Button type="button" variant="outline">Cancelar</Button>
                            <Button type="submit">Guardar Cambios</Button>
                        </div>
                    </form>
                </Tabs>
            </CardContent>
        </Card>
    )
}

