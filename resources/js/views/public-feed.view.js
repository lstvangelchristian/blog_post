export class PublicFeedView {
  constructor () {
    this.staticSessionId = 1; // For Testing Purposes

    this.$createBlogField = $('.js-create-blog-field');
    this.$createBlogForm = $('.js-create-blog-form');
    this.$actionResult = $('.js-action-result');

    this.$publicFeed = $('.js-public-feed');

    this.$modifyBlogFormContent = $('.js-modify-blog-form-content');
    this.$modifyBlogForm = $('.js-modify-blog-form');

    this.$reactionButtonContainer = $('.js-reaction-button-container');
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

      if (createBlogForm.get('blog-content') !== '') {
        this.$createBlogForm.find('button[type="submit"]').prop('disabled', true);
      }

      const newBlog = {
        content: createBlogForm.get('blog-content')
      }

      callback (newBlog)
        .finally(() => {
            this.$createBlogForm.find('button[type="submit"]').prop('disabled', false);
        })

      this.$createBlogField.attr('rows', 1);

      this.$createBlogField.attr('rows', 1).val(''); 
      this.$createBlogForm[0].reset();
    })
  }

  formatDate(date) {
    return `Posted on: ${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} at ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`;
  }

  createReactionButton (reaction, blogId) {
    const reactionButton = $('<span>', {
      class: `reaction-button`,
      'data-reaction-type': reaction.type,
      'data-blog-id': blogId,
      css: { padding: '10px', cursor: 'pointer' }
    })
      .append(
        $('<img>', {
          src: reaction.src,
          css: { width: '40px', }
        })
      )
    
    return reactionButton;
  }

  async renderPublicFeed (blogs) {
    this.$publicFeed.empty()

    if (blogs.length === 0) {
      console.log('no blogs found');
      return;
    }

    let blogsHTML = ''

    $.each(blogs, (_, b) => {
      const currentUserReaction = b.reactions.find(r => r.user_id === this.staticSessionId);

      blogsHTML += `
        <div class="mt-3 p-3 shadow-sm rounded" style="border: 1px solid lightgray !important;">

          ${b.author_id === this.staticSessionId
            ? `
              <div class="text-end mb-3">
                <button class="btn btn-warning rounded js-blog-modal" data-action="update" data-id="${b.blog_id}">
                  <i class="bi bi-pencil-square"></i>
                </button>

                <button class="btn btn-danger rounded js-blog-modal" data-action="delete" data-id="${b.blog_id}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            `
            : ''
          }

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
            <div class="w-100 js-view-reactions" style="cursor: pointer;">
              <img src="${currentUserReaction ? `${window.reactions[currentUserReaction.type_id - 1].src}` : ''}" style="width: 20px;" class="me-1" onerror="this.style.display='none';">
              <span>Reactions: ${b.reactions.length}</span>
            </div>
            <span class="w-100 text-end">Comments: ${b.comments.length}</span>
          </div>

          <!-- Submit Reaction and View Comment -->
          <div class="mt-3 pb-3">
            <div class="d-flex">
              <div class="w-100 text-center js-reaction-button-container" data-blog-id="${b.blog_id}"></div>

              <div class="w-100 text-center">
                <span class="bg-info p-3" style="height: 50%; width: 50%; border-radius: 50%;"><i class="bi bi-chat-dots text-light"></i></span>
              </div>
            </div>
          </div>
        </div>
      `
    })

    this.$publicFeed.html(blogsHTML);

    this.$publicFeed.find('.js-reaction-button-container').each((index, container) => {
      const $container = $(container);
      const blogId = $container.data('blog-id');
      
      window.reactions.forEach(reaction => {
        $container.append(this.createReactionButton(reaction, blogId));
      })
    })
  }

  async showModal (action, blogToBeModified) {
    const modifyBlogModal = $('#modifyBlogModal');
    
    console.log(blogToBeModified)

    $('.modal-title').text(`${action} Blog`)

    if (action === 'update') {
      this.$modifyBlogFormContent.html(`
        <input type="hidden" name="action" value="update">
        <input type="hidden" name="blog-id" value="${blogToBeModified.id}">

        <textarea placeholder="What's on your mind?" name="updated-blog-content" style="resize: none;" class="form-control w-100 js-create-blog-field" rows="5">${blogToBeModified.content}</textarea>
      `)
    }
    
    else {
      this.$modifyBlogFormContent.html(`
        <input type="hidden" name="action" value="delete">
        <input type="hidden" name="blog-id" value="${blogToBeModified.id}">

        <p class="text-danger">Are you sure you want to delete this blog? This action cannot be undone.</p>
      `)
    }

    const modal = new bootstrap.Modal(modifyBlogModal);
    modal.show();
  }

  async modifyBlogFormOnSubmit (callback) {
    this.$modifyBlogForm.on('submit', (e) => {
      e.preventDefault();

      this.$modifyBlogForm.find('button[type="submit"]').prop('disabled', true);

      const modifyBlogForm = new FormData(this.$modifyBlogForm[0]);

      const action = modifyBlogForm.get('action');
      const id = modifyBlogForm.get('blog-id');

      let modifyData = null;

      if (action === 'update') {
        modifyData = {
          content: modifyBlogForm.get('updated-blog-content')
        }
      }

      callback (action, id, modifyData)
        .finally(() => {
          this.$modifyBlogForm.find('button[type="submit"]').prop('disabled', false);
        })
    })
  }

  async hideModal () {
    const modifyBlogModal = $('#modifyBlogModal');
    const modalInstance = bootstrap.Modal.getInstance(modifyBlogModal);

    if (modalInstance) {
      modalInstance.hide();
    }
    else {
      console.log(false);
    }
  }

  async showResult (action = 'create', result) {
    const message = result.success ? `Your blog has been ${action}d successfully` : `${result.error}`;
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