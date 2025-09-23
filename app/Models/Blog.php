<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['content', 'author_id'];

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'blog_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id');
    }
}
