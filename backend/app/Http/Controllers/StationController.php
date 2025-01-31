<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $station = Station::find($id);
        if (!$station) {
            $date = [
                'message' => 'Station not found',
                'status' => 404,
            ];
            return response()->json($date, 404);
        }
        $date = [
            'status' => 200,
            'message' => 'Station found',
            'station' => new ReviewResource($station),
        ];
        return response()->json($date, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'address' => 'string',
            'latitude' => 'string',
            'longitude' => 'string',
            'country' => 'string',
            'city' => 'string',
            'observations' => 'string',
        ]);
        if ($validator->fails()) {
            $date = [
                'status' => 422,
                'error' => $validator->errors()->first(),
                'message' => 'validation error'
            ];
            return response()->json($date, 422);
        }
        $station = Station::find($id);
        $station->update($request->all());
        $date = [
            'status' => 200,
            'station' => $station,
            'message' => 'station updated'
        ];
        return response()->json($date, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $station = Station::find($id);
        $station->delete();
    }
}
