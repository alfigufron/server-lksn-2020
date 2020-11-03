<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as SetAuth;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends SetAuth implements JWTSubject
{
	use Notifiable;

  protected $fillable = [
		'username', 'password', 'role', 'division_id'
	];

	protected $hidden = [
		'password'
	];

	public function getJWTIdentifier() {
		return $this->getKey();
	}

	public function getJWTCustomClaims() {
		return [];
	}

	public function poll() {
		return $this->hasMany(Poll::class, 'created_by');
	}

	public function division() {
		return $this->belongsTo(Division::class);
	}
}