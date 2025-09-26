export class PublicFeedModel {
  constructor () {
    this.baseUrl = '/dashboard/blog_post/public/api/blog';
    this.reactionBaseUrl = '/dashboard/blog_post/public/api/reaction';
    this.commentBaseUrl = '/dashboard/blog_post/public/api/comment';
  }

  async request (baseUrl, endpoint = '', method = 'GET', data = null) {
    try {
      const res = await $.ajax({
        url: `${baseUrl}${endpoint}`,
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

  // Blog Methods
  async createBlog (newBlog) {
    return this.request(this.baseUrl, '', 'POST', newBlog);
  }

  async getBlogs () {
    return this.request(this.baseUrl);
  }

  async getBlogById (id) {
    return this.request(this.baseUrl, `/${id}`)
  }

  async updateBlog (id, updatedData) {
    return this.request(this.baseUrl, `/${id}`, 'PUT', updatedData)
  }

  async deleteBlog (id) {
    return this.request(this.baseUrl, `/${id}`, 'DELETE')
  }

  // Reaction Method
  async createReaction (newReaction) {
    return this.request(this.reactionBaseUrl, '', 'POST', newReaction);
  }

  // Comment Method
  async createComment (newComment) {
    return this.request(this.commentBaseUrl, '', 'POST', newComment);
  }

  async updateComment (id, comment) {
    return this.request(this.commentBaseUrl, `/${id}`, 'PUT', comment);
  }

  async deleteComment (id) {
    return this.request(this.commentBaseUrl, `/${id}`, 'DELETE');
  }
}