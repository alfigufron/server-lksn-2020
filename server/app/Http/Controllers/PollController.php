<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Poll;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PollController extends Controller
{
  public function create(Request $req) {
		$validated = Validator::make($req->all(), [
			'title' => 'required|string',
			'description' => 'required|string',
			'deadline' => 'required|date_format:Y-m-d H:i',
			'choices' => 'array|min:2',
			'choices.*' => 'required|string',
		]);

		if ($validated->fails())
			return response()->json([
				'message' => $validated->errors()
			], 422);
		
		$poll = new Poll;
		$poll->title = $req->title;
		$poll->description = $req->description;
		$poll->deadline = $req->deadline;
		$poll->created_by = Auth::user()->id;
		$poll->save();

		foreach ($req->choices as $item):
			$choice = new Choice;
			$choice->choice = $item;
			$choice->poll_id = $poll->id;
			$choice->save();
		endforeach;

		$poll['choice'] = $poll->choice;

		return response()->json($poll, 200);
	}

	public function delete($id) {
		$data = Poll::find($id);
		if (!$data)
			return response()->json(['message' => 'Data Not Found'], 404);
		$data->delete();
		
		return response()->json(['message' => 'Delete Poll Success'], 200);
	}

	public function all() {
		$user = Auth::user();
		$dateNow = Carbon::now()->format('Y-m-d H:i:s');

		if ($user->role == 'ADMIN') {
			$data = Poll::all();
		} else {
			$data = DB::table('polls')
				->whereExists(function($q) {
					$q->select(DB::raw(1))
						->from('votes')
						->whereRaw('votes.poll_id = polls.id')
						->whereRaw('votes.user_id = '.Auth::user()->id);
				})
				->orWhere('deadline', '<=', $dateNow)
				->get();
		}

		return response()->json($data, 200);
	}

	public function detail($id) {
		return 200;
	}

	public function vote($poll_id, $choice_id) {
		return 200;
	}
}