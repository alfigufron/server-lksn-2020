<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
  protected $fillable = [
		'name'
	];

	public function user() {
		return $this->hasMany(User::class);
	}

	public function vote() {
		return $this->hasMany(Vote::class);
	}
}