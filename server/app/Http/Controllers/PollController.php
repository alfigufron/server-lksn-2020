<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;
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
			$data = Poll::latest()->get();
		} else {
			$data = Poll::latest()
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
		$poll = Poll::with('choices')->find($id);
		if (!$poll)
			return response()->json(['message' => 'Data Not Found'], 404);
		
		$user = Auth::user();
		$checkVote = Vote::where([
			['poll_id', $id],
			['user_id', $user->id]
		])->first();
		$deadline = Carbon::parse($poll->deadline)->timestamp;

		if ($user->role == 'USER') {
			if (!$checkVote) {
				if (Carbon::now()->timestamp < $deadline) {
					return response()->json(['message' => 'Data Not Found'], 404);
				}
			}
		}

		$listChoice = Choice::select('id', 'choice')
			->where('poll_id', $id)
			->get();

		if (count($listChoice) == 0)
			return response()->json(['message' => 'Data Choice Not Found'], 404);

		$divisionVote = Vote::select('division_id')
			->where('poll_id', $id)
			->groupBy('division_id')
			->get();
		
		if (count($divisionVote) == 0) {
			foreach ($listChoice as $choice) {
				$result[$choice->choice] = 0;
			}

			$poll->creator = User::find($poll->created_by)->username;
			$poll->created_at = $poll->created_at;
			$poll->result = $result;

			return response()->json($poll, 200);
		}
		
		foreach ($divisionVote as $key => $division) {
			foreach ($listChoice as $choice) {
				$count = Vote::where('division_id', $division->division_id)
					->where('choice_id', $choice->id)
					->count();
				
				$resultChoices[$choice->id] = $count;
			}

			$data['division_id'] = $division->division_id;
			$data['max_choice'] = $resultChoices;
			$resultDivision[$key] = $data;
		}

		$points = [];
		foreach ($resultDivision as $data) {
			$max = max($data['max_choice']);
			$arrayMax = array_keys($data['max_choice'], $max);

			foreach ($arrayMax as $item) {
				if (count($arrayMax) > 1) {
					$point = 1 / count($arrayMax);
					if (isset($points[$item])) {
						$points[$item] += $point;
					} else {
						$points[$item] = $point;
					}
				} else {
					$point = 1;
					$points[$item] = $point;
				}
			}	
		}

		$sum = array_sum($points);
		foreach ($points as $key => $point) {
			$res = ($point / $sum) * 100;
			$option = Choice::where('id', $key)->first();

			$resultPoints[$option->choice] = number_format($res, 2);
		}

		$poll->creator = User::find($poll->created_by)->username;
		$poll->created_at = $poll->created_at;
		$poll->result = $resultPoints;

		return response()->json($poll, 200);
	}

	public function vote($poll_id, $choice_id) {
		$user = Auth::user();
		$poll = Poll::find($poll_id);

		$deadline = Carbon::parse($poll->deadline)->timestamp;
		if (Carbon::now()->timestamp > $deadline)
			return response()->json(['message' => 'Voting Deadline'], 404);

		if (!$poll)
			return response()->json(['message' => 'Invalid Choice'], 404);
		
		$choice = Choice::find($choice_id);
		if (!$choice)
			return response()->json(['message' => 'Invalid Choice'], 404);
			
		$vote = Vote::where([
			['user_id', '=', $user->id],
			['poll_id', '=', $poll->id],
			['division_id', '=', $user->division->id]
		])->get();
			
		if (count($vote) != 0)
			return response()->json(['message' => 'Already Voted'], 422);
		
		$newVote = new Vote;
		$newVote->choice_id = $choice->id;
		$newVote->user_id = $user->id;
		$newVote->poll_id = $poll->id;
		$newVote->division_id = $user->division->id;
		$newVote->save();

		return response()->json(['message' => 'Voting Success'], 200);
	}
}