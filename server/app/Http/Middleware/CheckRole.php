<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class CheckRole
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next, $role = null)
	{
		$token = $request->bearerToken();
		$user = JWTAuth::toUser($token);

		if ($role == 'admin') {
			if ($user->role != 'ADMIN')
				return response()->json(['message' => 'Unauthorized'], 401);
		} else if ($role == 'user') {
			if ($user->role != 'USER')
				return response()->json(['message' => 'Unauthorized'], 401);
		}
		
		return $next($request);
	}
}