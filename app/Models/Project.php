<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'role', 'summary', 'description', 
        'categories', 'tags', 'links', 'image'
    ];

    // Automatically convert JSON from DB to PHP Arrays
    protected $casts = [
        'categories' => 'array',
        'tags' => 'array',
        'links' => 'array',
    ];
}