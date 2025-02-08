<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(){
        $driver = Driver::first();
        $user = User::first();

        $reservation = $driver->reservation()->create([
            'name' => "test name",
            'user_id' => $user->id,
            'driver_id' => $driver->id,
            'phone' => '0123456789',
            'date_start' => now(),
            'time_start' => '01:20',
            'code' => 'ABCD'
        ]);
    }
}