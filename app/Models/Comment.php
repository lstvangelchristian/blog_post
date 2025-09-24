<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content', 'blog_id', 'user_id'];

    public function blog()
    {
        return $this->belongsTo(Blog::class, 'blog_id');
    }

    public function replies()
    {
        return $this->hasMany(Reply::class, 'comment_id');
    }

    public function user()
    {
        return $this->belongsTo(Author::class, 'user_id');
    }
}
