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
      await this.view.showResult(result);

      const updatedBlogs = await this.model.getBlogs();
      await this.view.renderPublicFeed(updatedBlogs.data.data);
    })
  }
}