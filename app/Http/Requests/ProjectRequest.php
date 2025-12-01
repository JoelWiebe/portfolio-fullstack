<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'description' => 'nullable|string',
            'role' => 'nullable|string|max:255',
            'image_url' => 'nullable|url',
            'url_repo' => 'nullable|url',
            'url_web' => 'nullable|url',
            'url_ios' => 'nullable|url',
            'url_android' => 'nullable|url',
            'categories' => 'nullable|array',
            'tags' => 'nullable|array',
            'links' => 'nullable|array',
            // Validate internal structure of links array
            'links.*.name' => 'required_with:links|string',
            'links.*.url' => 'required_with:links|url',
        ];
    }
}