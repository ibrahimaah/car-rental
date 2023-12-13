<?php

use App\Http\Controllers\api\admin\CarController;
use App\Http\Controllers\api\RegisterController;
use App\Http\Resources\Car;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
  
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);


Route::get('cars',[CarController::class,'index']);
Route::get('cars/featured',[CarController::class,'getFeatured']);
Route::post('cars/update/{id}',[CarController::class,'update']);
Route::post('cars/store',[CarController::class,'store']);
Route::delete('cars/{id}',[CarController::class,'destroy']);
// Route::get('/cars', function () {
//     return Car::collection(User::all());
// });
// Route::middleware('auth:sanctum')->group( function () {
//     Route::resource('products', ProductController::class);
// });