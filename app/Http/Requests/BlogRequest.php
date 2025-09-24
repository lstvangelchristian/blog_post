<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        if ($this->isMethod('post')) {
            return [
                'content' => 'required',
                'author_id' => 'required|integer',
            ];
        } else {
            return [
                'content' => 'required|string',
            ];
        }
    }
}
