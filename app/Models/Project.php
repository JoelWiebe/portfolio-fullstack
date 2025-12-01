<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'summary', 'description', 'role', 
        'image_url', 'url_repo', 'url_web', 'url_ios', 'url_android',
        'categories', 'tags', 'links'
    ];

    // Automatically convert JSON from DB to PHP Arrays
    protected $casts = [
        'categories' => 'array',
        'tags' => 'array',
        'links' => 'array',
    ];
}