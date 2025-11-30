<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use Laravel\Sanctum\Sanctum;

class ProjectControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);
    }

    public function test_index_returns_all_projects()
    {
        Project::factory()->count(3)->create();

        $response = $this->getJson('/api/projects');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_a_new_project()
    {
        $projectData = [
            'title' => 'New Project',
            'role' => 'Developer',
            'description' => 'A description of the new project.',
            'summary' => 'This is a summary.',
            'tags' => ['tag1', 'tag2'],
            'categories' => ['cat1', 'cat2'],
            'links' => [['name' => 'link1', 'url' => 'http://example.com']],
            'image' => 'http://example.com/image.jpg'
        ];

        $response = $this->postJson('/api/projects', $projectData);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'New Project']);

        $this->assertDatabaseHas('projects', ['title' => 'New Project']);
    }

    public function test_show_returns_a_single_project()
    {
        $project = Project::factory()->create();

        $response = $this->getJson("/api/projects/{$project->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => $project->title]);
    }

    public function test_update_modifies_an_existing_project()
    {
        $project = Project::factory()->create();

        $updateData = [
            'title' => 'Updated Title',
            'role' => 'Lead Developer',
            'description' => 'An updated description.',
            'summary' => 'Updated summary.',
            'tags' => ['updated-tag'],
            'categories' => ['updated-cat'],
            'links' => [['name' => 'updated-link', 'url' => 'http://updated.com']],
            'image' => 'http://example.com/updated.jpg'
        ];

        $response = $this->putJson("/api/projects/{$project->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Title']);

        $this->assertDatabaseHas('projects', ['title' => 'Updated Title']);
    }

    public function test_destroy_deletes_a_project()
    {
        $project = Project::factory()->create();

        $response = $this->deleteJson("/api/projects/{$project->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }
}
