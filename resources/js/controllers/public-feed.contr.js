export class PublicFeedContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  async init () {
    await this.view.changeUi();

    const blogs = await this.model.getBlogs();
    await this.view.renderPublicFeed(blogs.data.data);
    
    await this.view.createBlog(async (newBlog) => {
      const result = await this.model.createBlog({...newBlog, author_id: 1});
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
      const staticSessionId = 1; // This is a static session id for testing purpose :)))

      const blogId = $(e.currentTarget).data('blogId');
      const reactionType = $(e.currentTarget).data('reactionType');

      const reaction_id = { like: 1, love: 2, care: 3, haha: 4, wow: 5, sad: 6, angry: 7 }

      const newReaction = {
        blog_id: blogId,
        type_id: reaction_id[reactionType],
        user_id: staticSessionId
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
  }
}