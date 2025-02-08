<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Driver extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'lastname',
        'phone_number',
        'languages',
        'rating',
        'user_id'
    ];

    public function cars(): BelongsToMany
    {
        return $this->belongsToMany(Car::class, 'driver_car');
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }
    public function reviews(): HasManyThrough
    {
        return $this->hasManyThrough(Review::class, Reservation::class);
    }
}
