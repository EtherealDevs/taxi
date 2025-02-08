<?php

namespace App\Listeners;

use App\Events\ReviewDeleted;
use App\Events\ReviewSaved;
use App\Events\ReviewUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateDriverRatings
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ReviewSaved|ReviewUpdated|ReviewDeleted $event): void
    {
        // Update driver's average rating based on the new reviews
        if ($event->driver != null) {
            $driver = $event->driver;
        } else {
            $driver = $event->review->reservation->driver;
        }
        $reviews = $driver->reviews;
        $average = $reviews->avg('stars');
        $driver->update(['rating' => $average]);
    }
}
