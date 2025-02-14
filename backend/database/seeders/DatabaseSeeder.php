<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $hashedPassword = Hash::make(env('ADMIN_PASS'));
        User::factory()->create([
            'id' => 1,
            'name' => env('ADMIN_NAME'),
            'email' => 'test@example.com',
            'password' => $hashedPassword,
        ]);
        $this->call(CarSeeder::class);
        $this->call(DriverSeeder::class);
        $this->call(RolePermissionSeeder::class);
        $this->call(ReservationSeeder::class);
        $this->call(ReviewSeeder::class);
    }
}
