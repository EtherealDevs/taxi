"use client";

import { useState, useEffect } from "react";
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
import { useParams } from "next/navigation";
import { Car, useCar } from "@/hooks/cars";
import AnimatedLoadingWheel from "@/components/ui/animated-loading-wheel";

export default function EditCar() {
  const { id } = useParams();
  const { getCar, updateCar } = useCar();
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
  const [loading, setLoading] = useState(false);
  const fetchCar = async () => {
    setLoading(true);
    try {
      const response = await getCar(id);
      setCarInfo(response.car);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCar();
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
    formData.append("brand", carInfo?.brand as string);
    formData.append("year", carInfo?.year);
    formData.append("model", carInfo?.model as string);
    formData.append("type", carInfo?.type as string);
    formData.append("description", carInfo?.description as string);
    formData.append("patent", carInfo?.patent as string);
    formData.append("seats", carInfo?.seats);
    await updateCar(id, formData);
  };
  if (loading) return <AnimatedLoadingWheel />;
  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Editar Auto
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
                value={carInfo?.model ?? ""}
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
                defaultValue={carInfo?.type ?? ""}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={carInfo?.type ?? ""} />
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

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
