<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as SetAuth;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends SetAuth implements JWTSubject
{
	use Notifiable;

  protected $fillable = [
		'username', 'password', 'role', 'default_password', 'division_id'
	];

	protected $hidden = [
		'password'
	];

	public static function boot() {
		parent::boot();

		static::creating(function($model) {
			$model->default_password = 1;
		});
	}

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