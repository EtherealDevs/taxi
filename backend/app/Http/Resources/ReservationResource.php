<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'user_id' => $this->user_id,
            'driver_id' => $this->driver_id,
            'phone' => $this->phone,
            'date_start' => $this->date_start,
            'time_start' => $this->time_start,
            'code' => $this->code,
            'name' => $this->name,
            'user' => new UserResource($this->whenLoaded('user')),
            'driver' => new DriverResource($this->whenLoaded('driver')),
            'stations' => StationResource::collection($this->whenLoaded('station')),
        ];
    }
}
