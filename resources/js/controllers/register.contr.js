export class RegisterContr {
  constructor (model, view) {
    this.model = model,
    this.view = view

    this.authorSession = JSON.parse(localStorage.getItem('author-session'));
  }

  async init () {
    if (this.authorSession) {
      location.href = 'http://localhost/dashboard/blog_post/public/public-feed';
      return;
    }

    await this.view.registerAuthor(async (newAuthor) => {
      const result = await this.model.registerAuthor(newAuthor);
      await this.view.showResult(result);

      if (result.success) {
        setTimeout(() => {
          location.href = 'http://localhost/dashboard/blog_post/public/';
        }, 2000)
      }
    })
  }
}