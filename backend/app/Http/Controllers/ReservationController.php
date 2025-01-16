<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Station;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::all();
        $date = [
            'reservations' => $reservations,
            'status' => 200
        ];
        return response()->json($date, 200);
    }

    public function generateRandomCode()
    {
        // Configuración del código aleatorio
        $length = 4; // Longitud del código
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos
        $randomCode = '';

        // Generar el código aleatorio
        for ($i = 0; $i < $length; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomCode .= $characters[$index];
        }

        return $randomCode;
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
            'phone' => 'required|string',
            'user_id' => 'exists:users,id',
            'driver_id' => 'required|exists:drivers,id'
        ]);
        if ($validator->fails()) {
            $date = [
                'status' => 422,
                'message' => 'validation error',
                'error' => $validator->messages()
            ];
            return response()->json($date, 422);
        }
        $user = User::find($request->user_id);
        if ($user) {
            $request['name'] = $user->name;
        }
        $reservation = Reservation::create([
            'date_start' => $request->date_start,
            'time_start' => $request->time_start,
            'name' => $request->name,
            'phone' => $request->phone,
            'user_id' => $request->user_id,
            'driver_id' => $request->driver_id,
            'status' => 1,
        ]);
        $code = $this->generateRandomCode();
        $code = $reservation->id . '-' . $code;
        $reservation->update(['code' => $code]);

        foreach ($request->stations as $station) {
            Station::create(
                [
                    'reservation_id' => $reservation->id,
                    'name' => $reservation->name,
                    'address' => $station['address'],
                    'city' => $station['city'],
                    'country' => $station['country'],
                    'latitude' => $station['latitude'],
                    'longitude' => $station['longitude'],
                    'observations' => $station['observations']
                ]
            );
        }
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
            'phone' => 'string',
            'user_id' => 'exists:users,id',
            'driver_id' => 'exists:drivers,id'
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
