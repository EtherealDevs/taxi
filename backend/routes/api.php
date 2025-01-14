<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'posts' => PostController::class,
    'reservations' => ReservationController::class,
    'drivers' => DriverController::class,
    'cars' => CarController::class,
    'reviews' => ReviewController::class,
    'stations' => StationController::class
]);
