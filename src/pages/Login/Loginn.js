$(function() {
  $('a.scroll').on('click', function(event) {
    event.preventDefault();

    var $anchor = $(this),
        $section = $anchor.attr('data-section');
    
    if ($section === '2' || $section === '3') {
      $('#wrap .wrap-inner').addClass('goto-' + $section);
    } else {  
      $('#wrap .wrap-inner').removeClass('goto-2 goto-3');
    }
  });

  $('#login-form').on('submit', function(event) {
    event.preventDefault();
    const email = $('#login-email').val();
    const password = $('#login-password').val();
    
    // Call your API here to login
    console.log('Logging in with', email, password);
  });

  $('#signup-form').on('submit', function(event) {
    event.preventDefault();
    const name = $('#signup-name').val();
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();
    const confirmPassword = $('#signup-confirm-password').val();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Call your API here to signup
    console.log('Signing up with', name, email, password);
  });

  $('#recover-form').on('submit', function(event) {
    event.preventDefault();
    const email = $('#recover-email').val();
    
    // Call your API here to recover password
    console.log('Recovering password for', email);
  });

  $('#google-signin').on('click', function(event) {
    event.preventDefault();
    // Call your API or Google Sign-In here
    console.log('Signing in with Google');
  });

  $('#google-signup').on('click', function(event) {
    event.preventDefault();
    // Call your API or Google Sign-Up here
    console.log('Signing up with Google');
  });
});
