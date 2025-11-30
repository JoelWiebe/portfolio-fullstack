<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('it requires a title to create a project', function () {
    // Arrange: Create and authenticate a user
    $user = User::factory()->create();
    $this->actingAs($user);

    // Arrange: Prepare data without a title
    $projectData = Project::factory()->make(['title' => null])->toArray();

    // Act: Attempt to store the project
    $response = $this->postJson('/api/projects', $projectData);

    // Assert: Check for a validation error for the 'title' field
    $response->assertStatus(422) // 422 Unprocessable Entity
        ->assertJsonValidationErrors('title');
});

test('it requires a role, summary, and description to create a project', function ($field) {
    // Arrange: Create and authenticate a user
    $user = User::factory()->create();
    $this->actingAs($user);

    // Arrange: Prepare data with one field missing
    $projectData = Project::factory()->make([$field => null])->toArray();

    // Act: Attempt to store the project
    $response = $this->postJson('/api/projects', $projectData);

    // Assert: Check for a validation error for the specified field
    $response->assertStatus(422)
        ->assertJsonValidationErrors($field);
})->with(['role', 'summary', 'description']);

test('it requires categories and tags to be arrays', function ($field) {
    // Arrange: Create and authenticate a user
    $user = User::factory()->create();
    $this->actingAs($user);

    // Arrange: Prepare data with the field as a string instead of an array
    $projectData = Project::factory()->make([$field => 'not-an-array'])->toArray();

    // Act: Attempt to store the project
    $response = $this->postJson('/api/projects', $projectData);

    // Assert: Check for a validation error for the specified field
    $response->assertStatus(422)
        ->assertJsonValidationErrors($field);
})->with(['categories', 'tags']);

test('it validates that link urls are valid urls', function() {
    // Arrange: Create and authenticate a user
    $user = User::factory()->create();
    $this->actingAs($user);

    // Arrange: Prepare data with an invalid URL in the links
    $projectData = Project::factory()->make(['links' => [['name' => 'bad link', 'url' => 'not-a-valid-url']]])->toArray();

    // Act & Assert
    $this->postJson('/api/projects', $projectData)
        ->assertStatus(422)
        ->assertJsonValidationErrors('links.0.url');
});