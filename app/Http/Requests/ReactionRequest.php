<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReactionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'blog_id' => 'required|integer',
            'type_id' => 'required|integer',
            'user_id' => 'required|integer',
        ];
    }
}
