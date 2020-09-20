<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Bet extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'sport_id'      => $this->sport_id,
            'event_id'      => $this->event_id,
            'koeficient'    => $this->koeficient,
            'zalog'         => $this->zalog,
            'status'        => $this->status,
            'win'           => $this->win
        ];
    }

    public function with($request)
    {
        return [
            'version'       => '1.0.1',
            'author_url'    => 'https://avalonbg.com'
        ];
    }
}
