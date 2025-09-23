<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReactionType extends Model
{
    protected $fillable = ['type'];

    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'type_id');
    }
}
