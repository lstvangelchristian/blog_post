export class LoginContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    this.authorSession = JSON.parse(localStorage.getItem('author-session'));
  }

  async init () {
    if (this.authorSession) {
      location.href = 'http://localhost/dashboard/blog_post/public/public-feed';
      return;
    }

    await this.view.authenticate(async (authenticateData) => {
      const result = await this.model.authenticate(authenticateData);
      await this.view.showResult(result);

      if (result.success) {
        localStorage.setItem('author-session', JSON.stringify(result.data));

        setTimeout(() => {
          location.href = 'http://localhost/dashboard/blog_post/public/public-feed';
        }, 2000)
      }
    })
  }
}