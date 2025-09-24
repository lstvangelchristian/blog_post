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

<div class="modal fade" id="modifyBlogModal" tabindex="-1" aria-labelledby="modifyBlogModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modifyBlogModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="js-modify-blog-form">
        <div class="modal-body">
          <div class="js-modify-blog-form-content p-3"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade" id="reactionsModal" tabindex="-1" aria-labelledby="reactionsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title js-reaction-modal-title" id="reactionsModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="js-reaction-modal-content overflow-auto p-3" style="height: 500px;">
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="commentsModal" tabindex="-1" aria-labelledby="reactionsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title js-comment-modal-title" id="reactionsModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="js-comment-modal-content overflow-auto p-3" style="height: 500px;">
        </div>
        
        <div class="d-flex justify-content-center">
          <textarea class="form-control me-1 rounded" rows="1" style="resize: none; border: 1px solid lightgray"></textarea>
          <button class="btn btn-primary btn-sm rounded">Comment</button>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

<script>
  window.reactions = [
    {type: 'like', src: '{{ asset('images/reactions/like.png') }}'},
    {type: 'love', src: '{{ asset('images/reactions/love.png') }}'},
    {type: 'care', src: '{{ asset('images/reactions/care.png') }}'},
    {type: 'haha', src: '{{ asset('images/reactions/haha.png') }}'},
    {type: 'wow', src: '{{ asset('images/reactions/wow.png') }}'},
    {type: 'sad', src: '{{ asset('images/reactions/sad.png') }}'},
    {type: 'angry', src: '{{ asset('images/reactions/angry.png') }}'}
  ]

  window.message = '{{ asset('images/comment.png') }}'
</script>

@push('scripts')
@vite('resources/js/main/public-feed.main.js')
@endpush