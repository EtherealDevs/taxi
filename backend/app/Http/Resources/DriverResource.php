<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverResource extends JsonResource
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
            'name' => $this->name,
            'lastname' => $this->lastname,
            'phone_number' => $this->phone_number,
            'languages' => $this->languages,
            'rating' => $this->rating,
            'user_id' => $this->user_id,
            'cars' => CarResource::collection($this->whenLoaded('cars')),
            'images' => $this->images->map(fn($image) => asset('storage/' . $image->url)),
            'reservation' => new ReservationResource($this->whenLoaded('reservation')),
        ];
    }
}
