<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    public function run()
    {
        $user = User::create([
            'name' => 'Nelson Olivera',
            'email' => 'nelsonolivera.viajes@gmail.com',
            'password' => bcrypt('NelOliViajes_2024'),
        ]);
        $driver = Driver::create([
            'name' => 'Nelson',
            'lastname' => 'Olivera',
            'phone_number' => '+5493757543174',
            'languages' => 'en,fr,pt',
            'rating' => null,
            'user_id' => $user->id
        ]);
        // Driver Car
        $driver->cars()->attach(1); // Car ID 1
    }
}
