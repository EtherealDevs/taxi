<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    public function run(){
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => bcrypt('password'),
        ]);
        $driver = Driver::create([
            'name' => 'John',
            'lastname' => 'Doe',
            'phone_number' => '1234',
            'languages' => 'en,fr,pt',
            'rating' => null,
            'user_id' => $user->id
        ]);
        // Driver Car
        $driver->cars()->attach(1); // Car ID 1
    }
}