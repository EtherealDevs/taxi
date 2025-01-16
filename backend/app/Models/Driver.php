<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        return $this->belongsToMany(Car::class);
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }
}
