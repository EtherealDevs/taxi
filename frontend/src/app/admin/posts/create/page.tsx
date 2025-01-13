'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Upload } from 'lucide-react'
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

export default function CreateBlogPost() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Crear Nuevo Post</h1>

            <form className="space-y-6">
                <div>
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" placeholder="Ingrese el título del post" />
                </div>

                <div>
                    <Label htmlFor="excerpt">Extracto</Label>
                    <Textarea
                        id="excerpt"
                        placeholder="Ingrese un breve resumen del post"
                        className="h-20"
                    />
                </div>

                <div>
                    <Label htmlFor="content">Contenido</Label>
                    <Textarea
                        id="content"
                        placeholder="Escriba el contenido del post"
                        className="h-64"
                    />
                </div>

                <div>
                    <Label>Imagen Principal</Label>
                    <div className="mt-2">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview image"
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

                <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione el estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Borrador</SelectItem>
                            <SelectItem value="published">Publicado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Publicar Post</Button>
                </div>
            </form>
        </div>
    )
}

