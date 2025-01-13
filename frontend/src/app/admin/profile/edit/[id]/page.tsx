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

export default function CreateDriver() {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Agregar Nuevo Chofer</h1>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" placeholder="Nombre del chofer" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="email@ejemplo.com" />
                    </div>

                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="+1234567890" />
                    </div>

                    <div>
                        <Label htmlFor="car">Vehículo</Label>
                        <Input id="car" placeholder="Marca y modelo" />
                    </div>

                    <div>
                        <Label htmlFor="languages">Idiomas</Label>
                        <Input id="languages" placeholder="Español, Inglés, etc." />
                    </div>

                    <div>
                        <Label htmlFor="experience">Años de Experiencia</Label>
                        <Input id="experience" type="number" min="0" />
                    </div>
                </div>

                <div>
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                        id="bio"
                        placeholder="Descripción del chofer"
                        className="h-32"
                    />
                </div>

                <div>
                    <Label>Foto de Perfil</Label>
                    <div className="mt-2">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Profile preview image"
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
                            <SelectItem value="active">Activo</SelectItem>
                            <SelectItem value="inactive">Inactivo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Chofer</Button>
                </div>
            </form>
        </div>
    )
}

