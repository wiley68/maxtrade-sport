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
}
