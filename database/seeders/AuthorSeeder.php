<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $authors = [
            ['username' => 'author1', 'password' => Hash::make('author1')],
            ['username' => 'author2', 'password' => Hash::make('author2')],
            ['username' => 'author3', 'password' => Hash::make('author3')],
        ];

        foreach ($authors as $author) {
            Author::create($author);
        }
    }
}
