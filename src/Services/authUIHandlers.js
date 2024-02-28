// Example of using the signUp function with UI elements
document.getElementById("signUpButton").addEventListener("click", function() {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
    signUp(email, password);
  });
  // For Sign Out

  document.getElementById("btnLogin").addEventListener("click", function() {
    // Retrieve email and password from input fields
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPassword").value;
  
    // Call the signIn function with the provided credentials
    signIn(email, password);
  });
document.getElementById("signOutButton").addEventListener("click", function() {
    signOut();
  });
  
  // For Password Reset
  document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById("emailForPasswordReset").value;
    resetPassword(email);
  });
  