<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', 'IndexController@index')->name('index');

Auth::routes();

Route::get('/stat', 'AppController@stat')->name('stat');
Route::get('/chart', 'AppController@chart')->name('chart');
Route::get('/{any}', 'AppController@index')->where('any', '.*');
