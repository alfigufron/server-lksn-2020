<?php

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Division::create(['name' => 'Payment']);
		Division::create(['name' => 'Procurement']);
		Division::create(['name' => 'IT']);
		Division::create(['name' => 'Finance']);
	}
}