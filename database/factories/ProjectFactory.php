<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'role' => $this->faker->jobTitle,
            'summary' => $this->faker->paragraph,
            'description' => $this->faker->text,
            'categories' => $this->faker->words(3),
            'tags' => $this->faker->words(5),
            'links' => [
                ['name' => 'GitHub', 'url' => $this->faker->url],
                ['name' => 'Live Demo', 'url' => $this->faker->url],
            ],
            'image' => $this->faker->imageUrl,
        ];
    }
}
