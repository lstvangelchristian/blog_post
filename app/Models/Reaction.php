<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    protected $fillable = ['blog_id', 'type_id', 'user_id'];

    public function blog()
    {
        return $this->belongsTo(Blog::class, 'blog_id');
    }

    public function type()
    {
        return $this->belongsTo(ReactionType::class, 'type_id');
    }

    public function user()
    {
        return $this->belongsTo(Author::class, 'user_id');
    }
}
