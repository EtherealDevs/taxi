<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = CarResource::collection(Car::with('drivers')->get());
        $data = [
            'cars' => $cars,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patent' => 'required|string',
            'brand' => 'required|string',
            'model' => 'required|string',
            'year' => 'required',
            'type' => 'required|string',
            'description' => 'required|string',
            'seats' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        $car = Car::create($request->all());
        $data = [
            'message' => 'Car created successfully',
            'car' => $car,
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::with('drivers')->find($id);
        if (!$car) {
            $data = [
                'errors' => 'Car not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'car' => new CarResource($car),
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'patent' => 'string',
            'brand' => 'string',
            'model' => 'string',
            'type' => 'string',
            'description' => 'string',
            'seats' => 'integer'
        ]);
        if ($validator->fails()) {
            $data = [
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }
        $car = Car::find($id);
        if (!$car) {
            $data = [
                'errors' => 'Car not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $car->update($request->all());
        $data = [
            'message' => 'Car updated successfully',
            'car' => $car,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::find($id);
        if (!$car) {
            $data = [
                'errors' => 'Car not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $car->delete();
        $data = [
            'message' => 'Car deleted',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
