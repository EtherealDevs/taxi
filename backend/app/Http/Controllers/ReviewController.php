<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::all();
        $data = [
            'reviews' => $reviews,
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
            'user_id' => 'required|exists:users,id',
            'reservation_id' => 'required|exists:reservations,id',
            'content' => 'required|string',
            'stars' => 'required|numeric|between:1,5'
        ]);
        if ($validator->fails()) {
            $data = [
                'error' => $validator->messages(),
                'status' => 422
            ];
            return response()->json($data, 422);
        }
        $review = Review::create($request->all());
        $data = [
            'review' => $review,
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = Review::find($id);
        if (!$review) {
            $data = [
                'error' => 'Review not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'review' => $review,
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
            'content' => 'string',
            'stars' => 'numeric|between:1,5'
        ]);
        if ($validator->fails()) {
            $data = [
                'error' => $validator->messages(),
                'status' => 422
            ];
            return response()->json($data, 422);
        }
        $review = Review::find($id);
        if (!$review) {
            $data = [
                'error' => 'Review not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $review->update($request->all());
        $data = [
            'review' => $review,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $review = Review::find($id);
        if (!$review) {
            $data = [
                'error' => 'Review not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $review->delete();
        $data = [
            'message' => 'Review deleted successfully',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
