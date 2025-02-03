<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'patent' => $this->patent,
            'brand' => $this->brand,
            'model' => $this->model,
            'year' => $this->year,
            'type' => $this->type,
            'description' => $this->description,
            'seats' => $this->seats,
            'drivers' => DriverResource::collection($this->whenLoaded('drivers')) || null,
        ];
    }
}
