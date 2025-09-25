export class LoginModel {
  constructor () {
    this.baseUrl = '/dashboard/blog_post/public/api/login';
  }

  async authenticate (authenticateData) {
    try {
      const res = await $.ajax({
        url: this.baseUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(authenticateData),
      })

      return res;
    }
    catch (xhr) {
      return {success: false, error: xhr.responseJSON.message}
    }
  }
}