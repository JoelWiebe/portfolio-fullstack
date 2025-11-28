<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class ProjectController extends BaseController
{
    public function index(): JsonResponse
    {
        // Simple and efficient: Get all rows.
        // The Model's $casts array handles the JSON decoding automatically.
        $projects = Project::all();
        
        return response()->json($projects);
    }
}