<?php

namespace Database\Seeders;

use App\Models\ReactionType;
use Illuminate\Database\Seeder;

class ReactionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reactions = [
            ['type' => 'Like'],
            ['type' => 'Love'],
            ['type' => 'Care'],
            ['type' => 'Haha'],
            ['type' => 'Wow'],
            ['type' => 'Sad'],
            ['type' => 'Angry'],
        ];

        foreach ($reactions as $reaction) {
            ReactionType::create($reaction);
        }
    }
}
