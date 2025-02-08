"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
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
import { Drivers, useDriver } from "@/hooks/drivers";
import { useParams } from "next/navigation";
import AnimatedLoadingWheel from "@/components/ui/animated-loading-wheel";
import { Car, useCar } from "@/hooks/cars";

export default function CreateDriver() {
  const [file, setFile] = useState<File | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState<Drivers>({
    id: "",
    name: "",
    lastname: "",
    phone_number: "",
    languages: "",
    rating: 0,
    userId: "",
    images: [],
    carId: "", // Si `cars` es un array
  });
  const [cars, setCars] = useState<Car[]>();
  const { getCars } = useCar();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { updateDriver, getDriver } = useDriver();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDriver(id);
        setDriver(data.driver);
        setImagePreview(driver.images[0]);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    getCars().then((response) => setCars(response.cars));
    fetchData();
  }, []);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDriver((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setDriver((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    if (driver.carId) {
      formData.append("car_id", driver.carId);
    }
    formData.append("name", driver?.name as string);
    formData.append("lastname", driver?.lastname as string);
    formData.append("phone_number", driver?.phone_number as string);
    formData.append("languages", driver?.languages as string);
    await updateDriver(id, formData);
  };
  if (loading) return <AnimatedLoadingWheel />;
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Agregar Nuevo Chofer
      </h1>

      <form
        className="space-y-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              value={driver?.name ?? ""}
              onChange={handleInputChange}
              placeholder="Nombre del chofer"
            />
          </div>

          <div>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              value={driver?.lastname ?? ""}
              onChange={handleInputChange}
              placeholder="Apellido del chofer"
            />
          </div>

          <div>
            <Label htmlFor="phone_number">Teléfono</Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="text"
              value={driver?.phone_number ?? ""}
              onChange={handleInputChange}
              placeholder="+1234567890"
            />
          </div>

          {/* <div>
                                    <Label htmlFor="car">Vehículo</Label>
                                    <Input id="car" placeholder="Marca y modelo" />
                                </div> */}

          <div>
            <Label htmlFor="languages">Idiomas</Label>
            <Input
              id="languages"
              name="languages"
              value={driver?.languages ?? ""}
              onChange={handleInputChange}
              placeholder="Español, Inglés, etc."
            />
          </div>

          {/* <div>
                                    <Label htmlFor="experience">Años de Experiencia</Label>
                                    <Input id="experience" type="number" min="0" />
                                </div> */}
        </div>

        {/* <div>
                                <Label htmlFor="bio">Biografía</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Descripción del chofer"
                                    className="h-32"
                                />
                            </div> */}

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
                        <span className="font-semibold">Click para subir</span>{" "}
                        o arrastre y suelte
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
          <Label htmlFor="carId">Auto</Label>
          <Select onValueChange={(value) => handleSelectChange("carId", value)}>
            <SelectTrigger>
              <SelectValue placeholder={driver.carId || "seleccionar auto"} />
            </SelectTrigger>
            <SelectContent>
              {cars?.map((car) => {
                return (
                  <SelectItem key={car.id} value={car.id}>
                    {car.brand} {car.model}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar Chofer</Button>
        </div>
      </form>
    </div>
  );
}
