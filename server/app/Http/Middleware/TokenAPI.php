<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\TokenInvalidException as TokenInvalid;
use Tymon\JWTAuth\Exceptions\TokenExpiredException as TokenExpired;

class TokenAPI extends BaseMiddleware
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		try {
			$user = JWTAuth::parseToken()->authenticate();
			if (!$user) throw new Exception(404);
		} catch (Exception $err) {
			if ($err instanceof TokenInvalid) {
				return response()->json(['message' => 'Unauthorized'], 401);
			} elseif ($err instanceof TokenExpired) {
				return response()->json(['message' => 'Token expired', 401]);
			} else {
				if ($err->getMessage() === 404)
					return response()->json(['message' => 'User not found'], 404);
				
				return response()->json(['message' => 'Unauthorized'], 401);
			}
		}

		return $next($request);
	}
}