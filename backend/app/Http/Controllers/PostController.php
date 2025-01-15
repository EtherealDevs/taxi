<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        $data = [
            'posts' => $posts,
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
            'title' => 'required|string',
            'content' => 'required|string',
            'extract' => 'required|string',
            'image' => 'required',
            'slug' => 'required|unique,string'
        ]);
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        }
        $post = Post::create($request->only(['title', 'content', 'extract', 'slug']));
        if ($request->image) {
            foreach ($request->image as $image) {
                $post->images()->create(['url' => $image]);
            }
        }
        $data = [
            'status' => 201,
            'message' => 'Post created successfully',
            'post' => $post
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            $data = [
                'status' => 404,
                'message' => 'Post not found'
            ];
            return response()->json($data, 404);
        }
        $data = [
            'message' => 'Post found successfully',
            'status' => 200,
            'post' => $post
        ];
        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string',
            'content' => 'string',
            'extract' => 'string',
            'slug' => 'unique:string,post_id,' . $id
        ]);
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        }
        $post = Post::find($id);
        if (!$post) {
            $data = [
                'status' => 404,
                'message' => 'Post not found'
            ];
            return response()->json($data, 404);
        }
        $post->update(
            $request->only(['title', 'content', 'extract', 'slug'])
        );
        if ($request->image) {
            foreach ($request->image as $image) {
                $post->images()->create(['url' => $image]);
            }
        }
        $data = [
            'message' => 'Post updated successfully',
            'status' => 200,
            'post' => $post
        ];
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            $data = [
                'status' => 404,
                'message' => 'Post not found'
            ];
            return response()->json($data, 404);
        }
        foreach ($post->images() as $image) {
            $image->delete();
        }
        $post->delete();
        $data = [
            'message' => 'Post deleted successfully',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
