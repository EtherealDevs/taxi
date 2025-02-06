"use client";

import { useEffect, useState } from "react";
import { Upload, Plus, X } from "lucide-react";
import Image from "next/image";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, useCar } from "@/hooks/cars";
import { Drivers, useDriver } from "@/hooks/drivers";

export default function CreateCar() {
  const [carInfo, setCarInfo] = useState<Car>({
    id: "",
    patent: "",
    brand: "",
    model: "",
    year: "",
    type: "",
    description: "",
    seats: 0,
    driverId: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const { createCar } = useCar();
  const [drivers, setDrivers] = useState<Drivers[]>();
  const { getDrivers } = useDriver();

  useEffect(() => {
    getDrivers().then((response) => setDrivers(response.drivers));
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCarInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCarInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (carInfo.driverId) {
      formData.append("driver_id", carInfo.driverId);
    }
    formData.append("brand", carInfo?.brand as string);
    formData.append("year", carInfo?.year);
    formData.append("model", carInfo?.model as string);
    formData.append("type", carInfo?.type as string);
    formData.append("description", carInfo?.description as string);
    formData.append("patent", carInfo?.patent as string);
    formData.append("seats", carInfo?.seats);
    await createCar(formData);
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-y-hidden">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Agregar Nuevo Autoooo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                name="brand"
                value={carInfo?.brand ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                name="model"
                value={carInfo?.model}
                onChange={handleInputChange}
              />
            </div>
            {/* drivers */}
            <div>
              <Label htmlFor="driverId">Chofer</Label>
              <Select
                onValueChange={(value) => handleSelectChange("driverId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo de vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {drivers?.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} {driver.lastname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="patent">Patente</Label>
              <Input
                id="patent"
                name="patent"
                value={carInfo?.patent ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={carInfo?.year ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo de vehículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedán</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="seats">Asientos</Label>
              <Input
                id="seats"
                name="seats"
                type="number"
                value={carInfo?.seats ?? ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={carInfo?.description ?? ""}
              onChange={handleInputChange}
              className="h-32"
            />
          </div>

          {/* <div>
                        <Label>Imagen del Auto</Label>
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

                    <div>
                        <Label htmlFor="features">Características</Label>
                        <div className="flex items-center space-x-2 mt-1">
                            <Input
                                id="features"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                placeholder="Agregar característica"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                            />
                            <Button type="button" onClick={handleAddFeature} size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar
                            </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {carInfo.features.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                    {feature}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(feature)}
                                        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div> */}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit">Guardar Auto</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
