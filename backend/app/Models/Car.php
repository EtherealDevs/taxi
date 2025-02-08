<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Car extends Model
{
    protected $fillable = [
        'patent',
        'brand',
        'model',
        'year',
        'type',
        'description',
        'seats',
    ];

    public function drivers(): BelongsToMany
    {
        return $this->belongsToMany(Driver::class, 'driver_car');
    }
}
