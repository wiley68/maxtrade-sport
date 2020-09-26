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
            ->orderBy('name', 'asc')
            ->get();

        /** Return collection of Sports as resource */
        return SportResource::collection($sports);
    }

    public function store(Request $request)
    {
        $sport = $request->isMethod('put') ? Sport::findOrFail($request->sport_id) : new Sport;

        $sport->name = $request->input('name');

        if ($sport->save()) {
            return new SportResource($sport);
        }
    }

    public function destroy($id)
    {
        /** Get a Sport */
        $sport = Sport::findOrFail($id);

        if ($sport->delete()) {
            return new SportResource($sport);
        }
    }
}
