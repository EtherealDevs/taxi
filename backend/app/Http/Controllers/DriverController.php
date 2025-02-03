<?php

namespace App\Http\Controllers;

use App\Http\Resources\DriverResource;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $drivers = DriverResource::collection(Driver::with('images')->get());
        $data = [
            'drivers' => $drivers,
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
            'name' => 'required|string',
            'lastname' => 'required|string',
            'phone_number' => 'required|string',
            'languages' => 'required|string',
            'rating' => 'numeric',
            'user_id' => 'exists:users,id|nullable',
        ]);
        if ($validator->fails()) {
            $data = [
                'message' => 'Error',
                'status' => 400,
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }
        $driver = Driver::create($request->all());
        if ($request->image) {
            $image = $request->file('image');
            $imageName = time() . '.' . 'webp';
            $path = Storage::putFileAs('drivers', $image, $imageName);
            $driver->images()->create(['url' => $path]);
        }
        $data = [
            'message' => 'Driver created successfully',
            'status' => 201,
            'driver' => $driver
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $driver = Driver::with('images')->find($id);
        if (!$driver) {
            $data = [
                'message' => 'Driver not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'message' => 'Driver found successfully',
            'status' => 200,
            'driver' => new DriverResource($driver)
        ];
        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'lastname' => 'string',
            'phone_number' => 'string',
            'languages' => 'string',
            'rating' => 'numeric',
            'user_id' => 'exists:users,id'
        ]);
        if ($validator->fails()) {
            $data = [
                'message' => 'Error',
                'status' => 400,
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }
        $driver = Driver::find($id);
        if (!$driver) {
            $data = [
                'message' => 'Driver not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $driver->update($request->all());
        if ($request->image) {
            $image = $request->file('image');
            $imageName = time() . '.' . 'webp';
            $path = Storage::putFileAs('drivers', $image, $imageName);
            $driver->images()->create(['url' => $path]);
        }
        $data = [
            'message' => 'Driver updated successfully',
            'status' => 200,
            'driver' => $driver
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $driver = Driver::find($id);
        if (!$driver) {
            $data = [
                'message' => 'Driver not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $driver->delete();
        $data = [
            'message' => 'Driver deleted successfully',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
