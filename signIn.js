
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const username = usernameInput.value;
  const password = passwordInput.value;

  const users = Object.values(localStorage).filter(item => item.includes("user_"));

  const user = users.find(user => {
    const { username: savedUsername, password: savedPassword } = JSON.parse(user);
    return username === savedUsername && password === savedPassword;
  });

  if (user) { 

    const { username } = JSON.parse(user);
    result.innerHTML = `Welcome, ${username}.`;
    window.location.href="./form.html"

    usernameInput.value = "";
    passwordInput.value = "";
  } else {
    result.innerHTML = "Invalid username or password.";
  }
});