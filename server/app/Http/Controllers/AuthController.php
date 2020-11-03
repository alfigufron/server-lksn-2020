<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class AuthController extends Controller
{
  public function login(Request $req) {
		$loginData = $req->only('username', 'password');
		if (!$token = Auth::attempt($loginData))
			return response()->json(['error' => 'Unauthorized'], 401);

		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => Auth::factory()->getTTL() * 60
		], 200);
	}

	public function me() {
		return response()->json(Auth::user(), 200);
	}

	public function logout() {
		Auth::logout();

		return response()->json([
			'message' => 'Successfully logged out'
		], 200);
	}

	public function resetPassword(Request $req) {
		$validated = Validator::make($req->all(), [
			'old_password' => 'required|alpha_num',
			'new_password' => 'required|alpha_num',
		]);

		if ($validated->fails())
			return response()->json($validated->errors(), 422);

		$user = Auth::user();
		$check = Hash::check($req->old_password, $user->password);

		if (!$check)
			return response()->json([
				'message' => 'Old password did not match'
			], 422);

		$user = User::find($user->id);
		$user->password = bcrypt($req->new_password);
		$user->save();
		Auth::logout();
			
		return response()->json([
			'message' => 'Reset success, user logged out'
		], 200);
	}
}