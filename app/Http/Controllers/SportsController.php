<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sport;
use App\Http\Resources\Sport as SportResource;

class SportsController extends Controller
{
    public function index()
    {
        /** Get Sports */
        $sports = Sport::where('id', '>', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        /** Return collection of Sports as resource */
        return SportResource::collection($sports);
    }
}
