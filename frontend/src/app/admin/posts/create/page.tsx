"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { usePost } from "@/hooks/posts";

export default function CreateBlogPost() {
  const { create } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [extract, setExtract] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("extract", extract);
    create(formData);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Crear Nuevo Post
        </h1>

        <Tabs defaultTab="content">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="media">Multimedia</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>
          <form
            className="space-y-6"
            onSubmit={submitForm}
            encType="multpart/from-data"
          >
            <TabsContent value="content">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ingrese el título del post"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="extract">Extracto</Label>
                  <Textarea
                    id="extract"
                    name="extract"
                    value={extract}
                    onChange={(event) => setExtract(event.target.value)}
                    placeholder="Ingrese un breve resumen del post"
                    className="mt-1 h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="Escriba el contenido del post"
                    className="mt-1 h-64"
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
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button type="button" onClick={handleAddTag} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
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
                          {image ? (
                            <Image
                              src={image}
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
                                <span className="font-semibold">
                                  Click para subir
                                </span>{" "}
                                o arrastre y suelte
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
                          name="image"
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
                  <Select>
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
                  <Select>
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
                  <Label htmlFor="comments" className="flex items-center gap-2">
                    Permitir comentarios
                  </Label>
                  <Switch id="comments" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="flex items-center gap-2">
                    Destacar post
                  </Label>
                  <Switch id="featured" />
                </div>
              </div>
            </TabsContent>

            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline">Cancelar</Button>
              <Button>Publicar Post</Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
