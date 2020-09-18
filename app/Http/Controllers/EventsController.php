<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Http\Resources\Event as EventResource;

class EventsController extends Controller
{
    public function index()
    {
        /** Get Events */
        $events = Event::where('id', '>', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        /** Return collection of Events as resource */
        return EventResource::collection($events);
    }

    public function store(Request $request)
    {
        $event = $request->isMethod('put') ? Event::findOrFail($request->event_id) : new Event;

        $event->name = $request->input('name');
        $event->sport_id = $request->input('sport_id');

        if ($event->save()) {
            return new EventResource($event);
        }
    }

    public function destroy($id)
    {
        /** Get a Event */
        $event = Event::findOrFail($id);

        if ($event->delete()) {
            return new EventResource($event);
        }
    }
}
