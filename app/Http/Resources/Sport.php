<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Sport extends JsonResource
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
            'name'          => $this->name,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at
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
