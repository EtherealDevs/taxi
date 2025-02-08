<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(){
        $reservations = Reservation::all();
        foreach ($reservations as $reservation) {
            $reservation->reviews()->create([
                'user_id' => $reservation->user_id,
                'reservation_id' => $reservation->id,
                'content' => "test content",
                'stars' => rand(1, 5)
            ]);
            $reservation->reviews()->create([
                'user_id' => $reservation->user_id,
                'reservation_id' => $reservation->id,
                'content' => "test content 2",
                'stars' => rand(1, 5)
            ]);
        }
        $review = Review::first();
        $driver = $review->reservation->driver;
        $reviews = $driver->reviews;
        $average = $reviews->avg('stars');
        $driver->update(['rating' => $average]);
    }
}

