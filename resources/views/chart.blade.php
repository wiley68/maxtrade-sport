@extends('layouts.app-vue')

@section('content')
<form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
    @csrf
</form>
<App userName="{{Auth::user()->name}}" userId="{{Auth::user()->id}}" route="chart"></App>
@endsection
