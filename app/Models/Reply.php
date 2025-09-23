<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = ['comment_id', 'user_id', 'content'];

    public function comments()
    {
        return $this->belongsTo(Comment::class, 'comment_id');
    }

    public function authors()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }
}
