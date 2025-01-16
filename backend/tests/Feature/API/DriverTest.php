<?php

use App\Models\Driver;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('can retrieve list of drivers', function () {
    $response = $this->get('api/drivers');
    $response->assertStatus(200);
});
test('user can not store driver if not logged in', function () {
    $response = $this->post('api/drivers');
    $response->assertStatus(302);
});
test('can store driver if logged in', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post('api/drivers', [
        'name' => 'name test',
        'lastname' => 'last name test',
        'phone_number' => 'phone number test',
        'languages' => 'language test',
        'rating' => 1,
        'user_id' => $user->id,
    ]);
    $response->assertStatus(201);
});
test('can edit driver', function () {
    $user = User::factory()->create();
    $driver = Driver::factory()->create(['user_id' => $user->id]);
    $response = $this->actingAs($user)->patch('api/drivers/'. $driver->id, [
        'name' => 'edited name test',
        'lastname' => 'edited last name test',
        'phone_number' => 'edited phone number test',
        'languages' => 'edited language test',
    ]);
    $response->assertStatus(200);
});