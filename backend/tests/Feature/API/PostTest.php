<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('can get list of posts', function () {

    $response = $this->get('api/posts');

    $response->assertStatus(200);

});
test('can only store post if logged in', function () {
    $response = $this->post('api/posts', [
        'title' => 'title test',
        'content' => 'contents test',
        'extract' => 'extract test',
        'slug' => 'title-test'
    ]);
    $response->assertStatus(302);
});
test('can store post if logged in', function () {
    Storage::fake('testImages');

    $file = UploadedFile::fake()->image('testImage.jpg');
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post('api/posts', [
        'title' => 'title test',
        'content' => 'contents test',
        'extract' => 'extract test',
        'slug' => 'title-test',
        'image' => [$file]
    ]);
    $response->assertStatus(201);
});
test('can edit post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create();
    $response = $this->actingAs($user)->patch("api/posts/$post->id", [
        'title' => 'title changed',
    ]);
    $this->assertAuthenticated();
    $response->assertStatus(200);
});