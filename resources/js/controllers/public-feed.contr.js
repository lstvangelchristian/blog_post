export class PublicFeedContr {
  constructor (authorSession, model, view) {
    this.authorSession = authorSession;
    this.model = model;
    this.view = view;
  }

  async init () {
    if (this.authorSession.length === 0) {
      location.href = 'http://localhost/dashboard/blog_post/public/';
      return;
    }

    await this.view.renderAuthorInformation();

    await this.view.changeUi();

    const blogs = await this.model.getBlogs();
    await this.view.renderPublicFeed(blogs.data.data);
    
    await this.view.createBlog(async (newBlog) => {
      const result = await this.model.createBlog({...newBlog, author_id: this.authorSession.id});
      await this.view.showResult('create', result);

      const updatedBlogs = await this.model.getBlogs();
      await this.view.renderPublicFeed(updatedBlogs.data.data);
    })

    $(document).on('click', '.js-blog-modal', async (e) => {
      const action = $(e.currentTarget).data('action');
      const id = $(e.currentTarget).data('id');

      if (!id) return;
      
      const blogToBeModified = await this.model.getBlogById(id)

      await this.view.showModal(action, blogToBeModified.data);
    })

    await this.view.modifyBlogFormOnSubmit(async (action, id, data) => {
      let result = '';

      if (!data) {
        result = await this.model.deleteBlog(id)
      }
      else {
        result = await this.model.updateBlog(id, data);
      }

      if (result.success) {
        const updatedBlogs = await this.model.getBlogs();
        await this.view.renderPublicFeed(updatedBlogs.data.data);

        await this.view.hideModal();
      }

      await this.view.showResult(action, result);
    })

    $(document).on('click', '.reaction-button', async (e) => {
      const userId = this.authorSession.id;

      const blogId = $(e.currentTarget).data('blogId');
      const reactionType = $(e.currentTarget).data('reactionType');

      const reaction_id = { like: 1, love: 2, care: 3, haha: 4, wow: 5, sad: 6, angry: 7 }

      const newReaction = {
        blog_id: blogId,
        type_id: reaction_id[reactionType],
        user_id: userId
      }

      const result = await this.model.createReaction(newReaction);

      if (result.success) {
        const updatedBlogs = await this.model.getBlogs();
        await this.view.renderPublicFeed(updatedBlogs.data.data);
      }
    })

    $(document).on('click', '.js-view-reactions', async (e) => {
      const blogId = $(e.currentTarget).data('reactionBlogId');

      const blogs = await this.model.getBlogs();

      if (blogs.success) {
        const blogReactionsToBeFetched = blogs.data.data.find(b => b.blog_id === blogId)

        await this.view.showReactionModal(blogReactionsToBeFetched.reactions);
      }
    })

    $(document).on('click', '.message-button', async (e) => {
      const blogId = $(e.currentTarget).data('blogId');

      const blogs = await this.model.getBlogs();

      const blog = blogs.data.data.find(c => c.blog_id === blogId);

      const comments = blog.comments;

      await this.view.showCommentModal(comments, blogId)
    })

    await this.view.createComment(async (newComment) => {
      if (!newComment.content) return;

      await this.model.createComment(newComment);

      const commentSectionBlogId = newComment.blog_id;

      const blogs = await this.model.getBlogs();


      const blog = blogs.data.data.find(c => c.blog_id === Number(commentSectionBlogId));

      const updatedComments = blog.comments

      await this.view.showCommentModal(updatedComments, commentSectionBlogId)
    })

    await this.view.logout((logout) => {
      if (logout) {
        localStorage.removeItem('author-session');

        location.href = 'http://localhost/dashboard/blog_post/public/';
      }
    })

    $(document).on('click', '.js-modify-comment-button', async (e) => {
      const comment = {
        action: $(e.currentTarget).data('action'),
        id: $(e.currentTarget).data('commentId'),
        content: $(e.currentTarget).data('commentContent')
      }

      if (comment.action === 'update') {
        await this.view.makeCommentEditable(comment)
      }

      if (comment.action === 'delete') {
        await this.view.showDeleteConfirmation(comment.id);
      } 
    })

    $(document).on('submit', '.js-update-comment-form', async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      const updateCommentFormData = new FormData(form);

      const commentId = updateCommentFormData.get('comment-id');
      const comment = { content: updateCommentFormData.get('comment') };

      const result = await this.model.updateComment(commentId, comment);

      if (result.success) {
        const commentSectionBlogId = result.data.blog_id;

        const blogs = await this.model.getBlogs();


        const blog = blogs.data.data.find(c => c.blog_id === Number(commentSectionBlogId));

        const updatedComments = blog.comments

        await this.view.showCommentModal(updatedComments, commentSectionBlogId)
      }
    });

    $(document).on('submit', '.js-delete-comment-form', async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      const deleteCommentFormData = new FormData(form);

      const commentId = deleteCommentFormData.get('comment-id');

      const result = await this.model.deleteComment(commentId);

      if (result.success) {
        const commentSectionBlogId = result.data.blog_id;

        const blogs = await this.model.getBlogs();


        const blog = blogs.data.data.find(c => c.blog_id === Number(commentSectionBlogId));

        const updatedComments = blog.comments

        await this.view.showCommentModal(updatedComments, commentSectionBlogId)

        const commentsModal = $("#deleteCommentModal");
        const modal = bootstrap.Modal.getInstance(commentsModal[0]) || new bootstrap.Modal(commentsModal[0]);
        modal.hide();
      }
    })
  }
}