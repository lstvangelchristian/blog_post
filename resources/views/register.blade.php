@extends('layouts.auth')

@section('auth-content')
<div class="position-fixed top-0 end-0 m-3 js-action-result" style="z-index: 1050;"></div>

<div class="d-flex justify-content-center mt-5">
  <div class="shadow-sm rounded p-5" style="border: 1px solid lightgray; width: 33.33%">
    <h3 class="text-center m-0 mt-3">Register</h3>

    <div class="mt-3">
      <form class="js-registration-form">
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Enter username" class="form-control rounded">
        </div>

        <div class="mt-3">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter password" class="form-control rounded">
        </div>

        <div class="mt-3">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm password" class="form-control rounded">
        </div>

        <button type="submit" class="btn btn-primary form-control rounded mt-3">Register</button>
      </form>

      <div class="mt-3 text-center">
        <a href="{{ route('show.login') }}">Already have an account?</a>
      </div>

    </div>
  </div>
</div>
@endsection

@push('scripts')
@vite('resources/js/main/register.main.js')
@endpush