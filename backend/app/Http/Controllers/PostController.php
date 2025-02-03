<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use Spatie\Image\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = PostResource::collection(Post::with('images')->get());
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
        ]);
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        }
        $post = Post::create($request->only(['title', 'content', 'extract']));
        if ($request->image) {
            $image = $request->file('image');
            $imageName = time() . '.' . 'webp';
            $path = Storage::putFileAs('posts', $image, $imageName);
            $post->images()->create(['url' => $path]);
        }
        $data = [
            'status' => 201,
            'message' => 'Post created successfully',
            'post' => new PostResource($post)
        ];
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('images')->find($id);
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
            'post' => new PostResource($post)
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
            $request->only(['title', 'content', 'extract'])
        );
        if ($request->image) {
            $image = $request->file('image');
            $imageName = time() . '.' . 'webp';
            $path = Storage::putFileAs('posts', $image, $imageName);
            $post->images()->create(['url' => $path]);
        }
        $data = [
            'message' => 'Post updated successfully',
            'status' => 200,
            'post' => new PostResource($post)
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
        foreach ($post->images as $image) {
            Storage::delete($image->url);
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
