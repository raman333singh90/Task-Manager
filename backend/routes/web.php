<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CSVImportController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('web')->group(function () {
    // Route::get('/sanctum/csrf-cookie', function () {
    //     return response()->json(['message' => 'CSRF cookie set']);
    // });
    
    Route::get('/import', fn() => view('import'));
    Route::post('/import', [CSVImportController::class, 'import'])->name('csv.import');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']); // 👈 Add this
});

Route::get('/', function () {
    return view('welcome');
});
