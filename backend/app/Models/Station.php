<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Station extends Model
{
    protected $fillable = [
        'name',
        'address',
        'city',
        'country',
        'latitude',
        'longitude',
        'reservation_id'
    ];

    public function reservation():BelongsTo{
        return $this->belongsTo(Reservation::class);
    }
}
