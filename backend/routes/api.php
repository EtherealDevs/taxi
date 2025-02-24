<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\UserController;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = $request->user();
    $user->load('roles');
    // User::find($user->id);
    return $user;
});
Route::group(
    [
        'middleware' =>
        [
            'auth:sanctum',
            'can:access admin'
        ]
    ],
    function () {
        Route::apiResources([
            'reservations' => ReservationController::class,
            'stations' => StationController::class
        ]);
    }
);
Route::group(['middleware' => ['auth:sanctum', 'can:access admin']], function () {
    Route::apiResource('posts', PostController::class)->except(['index', 'show']);
    Route::apiResource('drivers', DriverController::class)->except('index');
    Route::apiResource('cars', CarController::class)->except('index');
    Route::apiResource('users', UserController::class)->only(['index', 'update']);
    Route::get('users/roles', [UserController::class, 'roles']);
});
Route::get('reservations/user/{id}', [ReservationController::class, 'getByUserId'])->middleware('auth:sanctum');
Route::get('reservations/user_review/{id}', [ReservationController::class, 'getByUserIdWithPendingReview'])->middleware('auth:sanctum');
Route::post('reviews', [ReviewController::class, 'store'])->middleware('auth:sanctum');
Route::apiResource('reviews', ReviewController::class)->only('index');
Route::apiResource('posts', PostController::class)->only(['index', 'show']);
Route::apiResource('drivers', DriverController::class)->only('index');
Route::apiResource('cars', CarController::class)->only('index');
