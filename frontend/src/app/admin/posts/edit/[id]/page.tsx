"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
import { useParams } from "next/navigation";
import { usePost } from "@/hooks/posts";
export interface Post {
  id: string;
  title: string;
  extract: string;
  content: string;
  image: string;
  created_at: string;
  author: string;
  likes: number;
  status: "Publicado" | "Borrador";
}

export default function EditBlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
  const { getPost, update } = usePost();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getPost(id as string);
        setPost(post.post);
      } catch (error) {
        console.error("Error al cargar las publicaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  //   const handleInputChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     const { name, value } = e.target;
  //     setPost((prevPost) => ({
  //       ...prevPost,
  //       [name]: value,
  //     }));
  //   };
  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImagePreview(reader.result as string);
  //         setPost((prevPost) => ({
  //           ...prevPost,
  //           image: reader.result as string,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleAddTag = () => {
  //     if (newTag && !post.tags.includes(newTag)) {
  //       setPost((prevPost) => ({
  //         ...prevPost,
  //         tags: [...prevPost.tags, newTag],
  //       }));
  //       setNewTag("");
  //     }
  //   };

  //   const handleRemoveTag = (tagToRemove: string) => {
  //     setPost((prevPost) => ({
  //       ...prevPost,
  //       tags: prevPost.tags.filter((tag) => tag !== tagToRemove),
  //     }));
  //   };

  //   const handleSwitchChange = (name: string) => {
  //     setPost((prevPost) => ({
  //       ...prevPost,
  //       [name]: !prevPost[name as keyof typeof prevPost],
  //     }));
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the updated post data to your backend
    console.log("Updated post:", post);
    // Implement your save logic here
  };
  if (loading) return <p>Cargando publicaciones...</p>;
  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Editar Post: {post?.title}
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
                  <Input id="title" name="title" value={post?.title} />
                </div>

                <div>
                  <Label htmlFor="extract">Extracto</Label>
                  <Textarea
                    id="extract"
                    name="extract"
                    value={post?.extract}
                    className="h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={post?.content}
                    className="h-64"
                  />
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
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
