<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/** List All Sports */
Route::get('sports', 'SportsController@index');
/** Create new Sport */
Route::post('sport', 'SportsController@store');
/** Update a Sport */
Route::put('sport', 'SportsController@store');
/** Delete a Sport */
Route::delete('sport/{id}', 'SportsController@destroy');

/** List All Events */
Route::get('events', 'EventsController@index');
/** Create new Event */
Route::post('event', 'EventsController@store');
/** Update a Event */
Route::put('event', 'EventsController@store');
/** Delete a Event */
Route::delete('event/{id}', 'EventsController@destroy');

/** List All Bets */
Route::get('bets', 'BetsController@index');