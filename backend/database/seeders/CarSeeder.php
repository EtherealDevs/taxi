<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(){

        $car = Car::create([
            'patent' => 'test1234',
            'brand' => 'testbrand',
            'model' => 'testmodel',
            'year' => '2000',
            'type' => 'testtype',
            'description' => 'a test description',
            'seats' => '4'
        ]);
    }
}