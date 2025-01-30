<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'title' => $this->title,
            'extract' => $this->extract,
            'content' => $this->content,
            'images' => $this->images->map(fn($image) => asset('storage/' . $image->url)),
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}
