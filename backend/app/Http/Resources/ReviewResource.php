<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'reservation_id' => $this->reservation_id,
            'stars' => $this->stars,
            'content' => $this->content,
            'user' => new UserResource($this->whenLoaded('user')),
            'reservation' => new ReservationResource($this->whenLoaded('reservation')),
        ];
    }
}
