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
            'reactions' => $this->reactions->map(function ($reaction) {
                return [
                    'type_id' => $reaction->type_id,
                    'user_id' => $reaction->user_id,
                    'reacted_by' => $reaction->user->username,
                    'created_at' => $reaction->created_at,
                ];
            }),
            'comments' => $this->comments->map(function ($comment) {
                return [
                    'content' => $comment->content,
                    'commented_by' => $comment->user->username,
                    'created_at' => $comment->created_at,
                ];
            }),
        ];
    }
}
