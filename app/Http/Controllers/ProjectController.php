<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class ProjectController extends BaseController
{
    /**
     * Display a listing of the resource.
     * GET /api/projects
     */
    public function index(): JsonResponse
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     * POST /api/projects
     */
    public function store(ProjectRequest $request): JsonResponse
    {
        // Validated data comes from the ProjectRequest
        $project = Project::create($request->validated());

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     * GET /api/projects/{id}
     */
    public function show(Project $project): JsonResponse
    {
        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     * PUT/PATCH /api/projects/{id}
     */
    public function update(ProjectRequest $request, Project $project): JsonResponse
    {
        $project->update($request->validated());

        return response()->json($project);
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/projects/{id}
     */
    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(null, 204);
    }
}