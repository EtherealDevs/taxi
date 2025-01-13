<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Driver extends Model
{
    protected $fillable = [
        'name',
        'lastname',
        'phone_number',
        'lenguages',
        'rating',
        'user_id'
    ];

    public function cars(): BelongsToMany{
        return $this->belongsToMany(Car::class);
    }
}
