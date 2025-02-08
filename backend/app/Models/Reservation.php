<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'driver_id',
        'phone',
        'date_start',
        'time_start',
        'code',
        'name',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function station(): HasMany
    {
        return $this->hasMany(Station::class);
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
