export class RegisterModel {
  constructor () {
    this.baseUrl = '/dashboard/blog_post/public/api/register';
  }

  async registerAuthor (newAuthor) {
    try {
      const res = await $.ajax({
        url: this.baseUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newAuthor)
      })

      return {success: true, data: res || null}
    }
    catch (xhr) {
      return {success: false, error: xhr.responseJSON.message}
    }
  }
}