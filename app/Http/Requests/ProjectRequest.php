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
        // In the future, we will return auth()->check() here.
        // For now, return true to allow testing.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'summary' => 'required|string',
            'description' => 'required|string',
            'categories' => 'required|array',
            'tags' => 'required|array',
            'links' => 'nullable|array',
            // Validate internal structure of links array
            'links.*.label' => 'required_with:links|string',
            'links.*.url' => 'required_with:links|url',
        ];
    }
}