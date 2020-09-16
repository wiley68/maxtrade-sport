@extends('layouts.app')

@section('content')
<App userName="{{Auth::user()->name}}" userId="{{Auth::user()->id}}"></App>
@endsection