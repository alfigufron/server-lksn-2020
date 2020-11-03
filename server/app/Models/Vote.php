<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
  protected $fillabel = [
		'choice_id', 'user_id', 'poll_id', 'division_id'
	];
}