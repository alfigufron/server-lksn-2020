<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		User::create([
			'username' => 'admin01',
			'password' => bcrypt('admin123'),
			'role' => 'ADMIN',
			'division_id' => 1
		]);

		User::create([
			'username' => 'admin02',
			'password' => bcrypt('admin123'),
			'role' => 'ADMIN',
			'division_id' => 2
		]);

		User::create([
			'username' => 'admin03',
			'password' => bcrypt('admin123'),
			'role' => 'ADMIN',
			'division_id' => 3
		]);

		User::create([
			'username' => 'user01',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 1
		]);

		User::create([
			'username' => 'user02',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 2
		]);

		User::create([
			'username' => 'user03',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 3
		]);
	}
}