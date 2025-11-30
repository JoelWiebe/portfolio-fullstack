<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('it requires a title to create a project', function () {
    // Arrange: Prepare data without a title
    $projectData = [
        'role' => 'Test Role',
        'summary' => 'Test Summary',
        // 'title' is missing
    ];

    // Act: Attempt to store the project
    $response = $this->postJson('/api/projects', $projectData);

    // Assert: Check for a validation error for the 'title' field
    $response->assertStatus(422) // 422 Unprocessable Entity
        ->assertJsonValidationErrors('title');
});