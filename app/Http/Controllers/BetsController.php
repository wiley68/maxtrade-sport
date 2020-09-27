<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bet;
use App\Http\Resources\Bet as BetResource;

class BetsController extends Controller
{
    public function index()
    {
        /** Get Bets */
        $bets = Bet::where('id', '>', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        /** Return collection of Bets as resource */
        return BetResource::collection($bets);
    }

    public function store(Request $request)
    {
        $bet = $request->isMethod('put') ? Bet::findOrFail($request->bet_id) : new Bet;

        $bet->sport_id = $request->input('sport_id');
        $bet->event_id = $request->input('event_id');
        $bet->koeficient = $request->input('koeficient');
        $bet->zalog = $request->input('zalog');
        $bet->status = $request->input('status');
        $bet->win = $request->input('win');
        $bet->winprice = $request->input('winprice');

        if ($bet->save()) {
            return new BetResource($bet);
        }
    }

    public function destroy($id)
    {
        /** Get a Bet */
        $bet = Bet::findOrFail($id);

        if ($bet->delete()) {
            return new BetResource($bet);
        }
    }
}
