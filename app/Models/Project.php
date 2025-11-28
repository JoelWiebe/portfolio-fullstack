<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'role', 'summary', 'description', 
        'categories', 'tags', 'links'
    ];

    // Automatically convert JSON from DB to PHP Arrays
    protected $casts = [
        'categories' => 'array',
        'tags' => 'array',
        'links' => 'array',
    ];
}