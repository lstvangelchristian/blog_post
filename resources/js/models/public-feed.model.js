export class PublicFeedModel {
  constructor () {
    this.baseUrl = '/dashboard/blog_post/public/api/blog';
  }

  async request (endpoint = '', method = 'GET', data = null) {
    try {
      const res = await $.ajax({
        url: `${this.baseUrl}${endpoint}`,
        method: method,
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : undefined
      })

      return {success: true, data: res || null}
    }
    catch (xhr) {
      return {success: false, error: xhr.responseJSON.message}
    }
  }

  async createBlog (newBlog) {
    return this.request('', 'POST', newBlog);
  }

  async getBlogs () {
    return this.request();
  }
}