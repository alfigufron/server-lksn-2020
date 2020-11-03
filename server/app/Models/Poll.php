<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Poll extends Model
{
  use SoftDeletes;

  protected $fillable = [
    'title', 'description', 'deadline', 'created_by'
  ];

  public function choice() {
    return $this->hasMany(Choice::class);
  }

  public function created_by() {
    return $this->belongsTo(User::class, 'created_by');
  }
}