<?php

namespace App\Models;

use App\Events\ReviewDeleted;
use App\Events\ReviewSaved;
use App\Events\ReviewUpdated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'reservation_id',
        'stars',
        'content',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function reservation(): BelongsTo{
        return $this->belongsTo(Reservation::class);
    }

}
