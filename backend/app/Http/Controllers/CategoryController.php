<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::with('tasks')->where('user_id', auth()->id())->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Category::create([
            'name' => $request->name,
            'user_id' => auth()->id(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->only('name'));
        return $category;
    }

    /**
     * Remove the specified category from storage, along with its associated tasks.
     *
     * @param  int  $id  The ID of the category to be deleted.
     * @return \Illuminate\Http\JsonResponse
     */

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->tasks()->delete(); // optional: delete tasks in category
        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}
