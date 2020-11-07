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
			'username' => 'userpayment01',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 1
		]);

		User::create([
			'username' => 'userprocurement01',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 2
		]);

		User::create([
			'username' => 'userprocurement02',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 2
		]);

		User::create([
			'username' => 'userprocurement03',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 2
		]);

		User::create([
			'username' => 'userit01',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 3
		]);

		User::create([
			'username' => 'userit02',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 3
		]);

		User::create([
			'username' => 'userit03',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 3
		]);

		User::create([
			'username' => 'userit04',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 3
		]);

		User::create([
			'username' => 'userit05',
			'password' => bcrypt('user123'),
			'role' => 'USER',
			'division_id' => 3
		]);
	}
}