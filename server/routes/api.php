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

Route::prefix('auth')->group(function() {
	Route::post('login', 'AuthController@login');
	
	Route::middleware('check.token')->group(function() {
		Route::post('me', 'AuthController@me');
		Route::post('reset_password', 'AuthController@resetPassword');
		Route::post('logout', 'AuthController@logout');
	});
});

Route::group([
	'prefix' => 'poll',
	'middleware' => 'check.token'
], function () {
	Route::middleware('role:admin')->group(function() {
		Route::post('/', 'PollController@create');
		Route::delete('/{id}', 'PollController@delete');
	});

	Route::get('/', 'PollController@all');
	Route::get('/{id}', 'PollController@detail');
	Route::post('/{poll_id}/vote/{choice_id}', 'PollController@vote')
		->middleware('role:user');
});