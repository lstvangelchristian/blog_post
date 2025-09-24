<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'blog_id' => $this->id,
            'author_id' => $this->author_id,
            'author' => $this->author->username,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'reactions' => $this->reactions,
            'comments' => $this->comments,
        ];
    }
}
