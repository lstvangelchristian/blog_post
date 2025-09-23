export class PublicFeedView {
  constructor () {
    this.$createBlogField = $('.js-create-blog-field');
    this.$createBlogForm = $('.js-create-blog-form');
    this.$actionResult = $('.js-action-result');

    this.$publicFeed = $('.js-public-feed');
  }

  async changeUi () {
    this.$createBlogField.on('focus', function() {
      $(this).attr('rows', 5)
    });

    this.$createBlogField.on('blur', function() {
      if ($(this).val()) {
        return;
      }

      $(this).attr('rows', 1)
    });
  }

  async createBlog (callback) {
    this.$createBlogForm.on('submit', (e) => {
      e.preventDefault();

      const createBlogForm = new FormData(this.$createBlogForm[0]);

      const newBlog = {
        content: createBlogForm.get('blog-content')
      }

      callback (newBlog)

      this.$createBlogField.attr('rows', 1);

      this.$createBlogField.attr('rows', 1).val(''); 
      this.$createBlogForm[0].reset();
    })
  }

  formatDate(date) {
    return `Posted on: ${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} at ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`;
  }

  async renderPublicFeed (blogs) {
    this.$publicFeed.empty()

    if (blogs.length === 0) {
      console.log('no blogs found');
      return;
    }

    let blogsHTML = '';

    $.each(blogs, (_, b) => {
      blogsHTML += `
        <div class="mt-3 p-3 shadow-sm rounded" style="border: 1px solid lightgray !important;">
          <!-- Feed Header -->
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <div class="bg-light d-flex align-items-center justify-content-center" 
                  style="width: 50px; height: 50px; border-radius: 50%;">
                <h5 class="m-0">${b.author.charAt(0).toUpperCase()}</h5>
              </div>
              
              <div class="ms-2">
                <h5 class="m-0">${b.author}</h5>
                <span>Author</span>
              </div>
            </div>

            <div class="w-100 text-end">
              <span>${this.formatDate(new Date(b.created_at))}</span>
            </div>
          </div>

          <!-- Feed Content -->
          <div class="shadow-sm p-3 mt-3 bg-light rounded">
            <span>${b.content}</span>
          </div>

          <!-- Post Summary -->
          <div class="d-flex mt-3">
            <span class="w-100">Reactions: ${b.reactions.length}</span>
            <span class="w-100 text-end">Comments: ${b.comments.length}</span>
          </div>

          <!-- Submit Reaction and View Comment -->
          <div class="mt-3">
            <div class="d-flex">
              <div class="w-100 text-center">
                <button class="btn btn-outline-info btn-sm rounded">Like</button>
                <button class="btn btn-danger btn-sm rounded">Love</button>
                <button class="btn btn-outline-success btn-sm rounded">Care</button>
                <button class="btn btn-outline-warning btn-sm rounded">Haha</button>
                <button class="btn btn-outline-success btn-sm rounded">Wow</button>
                <button class="btn btn-outline-warning btn-sm rounded">Sad</button>
                <button class="btn btn-outline-danger btn-sm rounded">Angry</button>
              </div>

              <div class="w-100 text-center">
                <button class="btn btn-outline-dark btn-sm rounded">Write a Comment</button>
              </div>
            </div>
          </div>
        </div>
      `
    })

    this.$publicFeed.html(blogsHTML);
  }

  async showResult (result) {
    const message = result.success ? 'Your blog has been posted successfully' : `${result.error}`;
    const color = result.success ? 'success' : 'danger';

    this.$actionResult.html(`
      <div class="alert alert-${color} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `)

    setTimeout(() => {
      $('.alert').removeClass('show');
    }, 3000)
  }
}