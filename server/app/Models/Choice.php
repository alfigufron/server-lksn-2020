<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
  protected $fillable = [
		'choice', 'poll_id'
	];

	public function poll() {
		return $this->belongsTo(Poll::class);
	}
}