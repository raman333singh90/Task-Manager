<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Category;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Task::where("category_id", $request->category_id)->where('user_id', auth()->id())->orderBy('position', 'DESC')->get();
    }

    public function reorder(Request $request, Category $category)
    {
        $tasks = $request->input('tasks', []); // [{id, position}]
        foreach ($tasks as $taskData) {
            Task::where('id', $taskData['id'])
                ->where('category_id', $category->id)
                ->update(['position' => $taskData['position']]);
        }

        return response()->json(['message' => 'Reordered']);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => auth()->id(),
            'position' => $request->position ?? 0,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->only(['title', 'description', 'category_id', 'position']));
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
    
        return response()->json(['message' => 'Task deleted']);
    }
}
