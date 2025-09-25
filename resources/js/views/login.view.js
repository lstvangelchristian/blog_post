export class LoginView {
  async authenticate (callback) {
    const loginForm = $('.js-login-form');

    loginForm.on('submit', (e) => {
      e.preventDefault();

      const loginFormData = new FormData(loginForm[0]);

      const authenticateData = {
        username: loginFormData.get('username'),
        password: loginFormData.get('password'),
      }
      
      callback(authenticateData);
    })
  }

  async showResult (result) {
    const message = result.success
      ? 'Login Successful'
      : `${result.error}`;

    const color = result.success ? "success" : "danger";

    $('.js-action-result').html(`
      <div class="alert alert-${color} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);

    if (result.success) {
      $('.js-login-form').trigger('reset');
      $('.js-login-form').find('button[type="submit"]').prop("disabled", true);
    }
  }
}