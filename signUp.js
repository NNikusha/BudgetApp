const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const lastnameInput = document.getElementById("lastname");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const mobileInput = document.getElementById("mobile");

  const email = emailInput.value;
  const username = usernameInput.value;
  const lastname = lastnameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const mobile = mobileInput.value;


  if (!email || !username || !lastname || !password || !confirmPassword || !mobile) {

    if (!email) emailInput.classList.add("invalid");
    if (!username) usernameInput.classList.add("invalid");
    if (!lastname) lastnameInput.classList.add("invalid");
    if (!password) passwordInput.classList.add("invalid");
    if (!confirmPassword) confirmPasswordInput.classList.add("invalid");
    if (!mobile) mobileInput.classList.add("invalid");
    
    alert("Please fill in all fields.");
    return;
  } else {

    emailInput.classList.remove("invalid");
    usernameInput.classList.remove("invalid");
    lastnameInput.classList.remove("invalid");
    passwordInput.classList.remove("invalid");
    confirmPasswordInput.classList.remove("invalid");
    mobileInput.classList.remove("invalid");
  }


  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }


  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }


  if (isNaN(mobile) || mobile.length !== 9) {
    alert("Please enter a valid mobile number.");
    return;
  }


  let idCount = localStorage.getItem('idCount') || 0;
 
  idCount++;
  const id = 'user_' + idCount;

  const user = { id, email, username, lastname, password, mobile };
  localStorage.setItem(id, JSON.stringify(user));
  localStorage.setItem("idCount", parseInt(id.split("_")[1]));
});


const inputFields = form.querySelectorAll("input");
inputFields.forEach(function(inputField) {
  inputField.addEventListener("input", function() {
    if (inputField.validity.valid) {
      inputField.classList.remove("invalid");
    } else {
      inputField.classList.add("invalid");
    }
  });
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}