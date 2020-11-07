<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
  protected $fillabel = [
		'choice_id', 'user_id', 'poll_id', 'division_id'
	];

	public function choice() {
		return $this->belongsTo(Choice::class);
	}

	public function division() {
		return $this->belongsTo(Division::class);
	}
}