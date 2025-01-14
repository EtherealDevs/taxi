<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
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
        $validator = Validator::make($request->all(), [
            'date_start' => 'required|date',
            'time_start' => 'required',
            'name' => 'string',
            'user_id' => 'exists:users,id'
        ]);
        if ($validator->fails()) {
            $date = [
                'status' => 422,
                'message' => 'validation error',
                'error' => $validator->messages()
            ];
            return response()->json($date, 422);
        }
        //logica de generador de codigo
        $reservation = Reservation::create($request->all());
        //logica de station
        $date = [
            'status' => 200,
            'message' => 'reservation created',
            'reservation' => $reservation
        ];
        return response()->json($date, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            $date = [
                'status' => 404,
                'message' => 'reservation not found'
            ];
            return response()->json($date, 404);
        }
        $date = [
            'status' => 200,
            'message' => 'reservation found',
            'reservation' => $reservation
        ];
        return response()->json($date, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'date_start' => 'date',
            'name' => 'string',
            'user_id' => 'exists:users,id'
        ]);
        if ($validator->fails()) {
            $date = [
                'status' => 422,
                'message' => 'validation error',
                'error' => $validator->messages()
            ];
            return response()->json($date, 422);
        }
        $reservation = Reservation::find($id);
        if (!$reservation) {
            $date = [
                'status' => 404,
                'message' => 'reservation not found'
            ];
            return response()->json($date, 404);
        }
        $reservation->update($request->all());
        //logica de station update
        $date = [
            'status' => 200,
            'message' => 'reservation updated',
            'reservation' => $reservation
        ];
        return response()->json($date, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            $date = [
                'status' => 404,
                'message' => 'reservation not found'
            ];
            return response()->json($date, 404);
        }
        $reservation->delete();
        $date = [
            'status' => 200,
            'message' => 'reservation deleted'
        ];
        return response()->json($date, 200);
    }
}
