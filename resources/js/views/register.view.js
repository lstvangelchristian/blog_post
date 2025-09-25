export class RegisterView {
  async registerAuthor (callback) {
    const registrationForm = $('.js-registration-form');

    registrationForm.on('submit', (e) => {
      e.preventDefault();

      

      const registrationFormData = new FormData(registrationForm[0]);

      const newAuthorData = {
        username: registrationFormData.get('username'),
        password: registrationFormData.get('password'),
        confirmPassword: registrationFormData.get('confirm-password')
      }

      callback(newAuthorData);
    })
  }

  async showResult (result) {
    const message = result.success
      ? 'Registration Successful'
      : `${result.error}`;

    const color = result.success ? "success" : "danger";

    $('.js-action-result').html(`
      <div class="alert alert-${color} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);

    if (result.success) {
      $('.js-registration-form').trigger('reset');
      $('.js-registration-form').find('button[type="submit"]').prop("disabled", true);
    }
  }
}