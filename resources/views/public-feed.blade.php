@extends('layouts.default')

@section('main-content')
<div class="d-flex flex-column vh-100">
  <div>
    <h3 class="m-0">Create a blog</h3>
  </div>

  <!-- Create Blog Section -->
  <div class="mt-3 shadow-sm p-3 rounded" style="border: 1px solid lightgray !important;">
    <form class="js-create-blog-form">
      <div class="d-flex">
        <div class="bg-light d-flex align-items-center justify-content-center"
          style="width: 50px; height: 50px; border-radius: 50%;">
            <h5 class="m-0">A</h5>
        </div>

        <div class="flex-grow-1 ms-3">
          <textarea placeholder="What's on your mind?" name="blog-content" style="resize: none;" class="form-control w-100 js-create-blog-field" rows="1"></textarea>
        </div>
      </div>

      <div class="text-end mt-3">
        <button type="submit" class="btn btn-dark btn-sm rounded">Post</button>
      </div>
    </form>
  </div>

  <div>
    <h3 class="m-0 mt-3">Public Feed</h3>
  </div>

  <!-- Feed Section -->
  <div class="js-public-feed overflow-auto"></div>

  <div class="position-fixed top-0 end-0 m-3 js-action-result" style="z-index: 1050;">
  </div>
</div>
@endsection

@push('scripts')
@vite('resources/js/main/public-feed.main.js')
@endpush