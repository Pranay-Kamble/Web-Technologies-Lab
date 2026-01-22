let currentRole, nameValue, email, password, confirmPassword, age;

const validateName = () => {
  let errorMsgElement = document.querySelector("#name-div > .error-msg");
  if (nameValue) {
    if (errorMsgElement) errorMsgElement.remove();
    return;
  }

  const containerElement = document.querySelector("#name-div");
  if (!errorMsgElement) {
    errorMsgElement = document.createElement("p");
    errorMsgElement.setAttribute("class", "error-msg");
    errorMsgElement.textContent = "Name cannot be empty.";
  }
  containerElement.appendChild(errorMsgElement);
};

const isValidEmail = () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validateEmail = () => {
  const errorMsgElement = document.querySelector("#email-div > .error-msg");

  if (isValidEmail(email)) {
    if (errorMsgElement) errorMsgElement.remove();
    return;
  }

  if (errorMsgElement) return;

  const containerElement = document.querySelector("#email-div");
  const newErrorMsgElement = document.createElement("p");

  newErrorMsgElement.setAttribute("class", "error-msg");
  newErrorMsgElement.textContent = "Please enter valid email.";

  containerElement.appendChild(newErrorMsgElement);
};

const isValidPassword = () => {
  if (!password || !confirmPassword) return false;

  return password === confirmPassword;
};

//Taken from geeks for geeks (understood the code)
const passwordStrength = (input_string) => {
  const n = input_string.length;
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let specialChar = false;
  const normalChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

  for (let i = 0; i < n; i++) {
    if (input_string[i] >= "a" && input_string[i] <= "z") hasLower = true;
    if (input_string[i] >= "A" && input_string[i] <= "Z") hasUpper = true;
    if (input_string[i] >= "0" && input_string[i] <= "9") hasDigit = true;
    if (!normalChars.includes(input_string[i])) specialChar = true;
  }

  let strength = "Weak";
  if (hasLower && hasUpper && hasDigit && specialChar && n >= 8) {
    strength = "Strong";
  } else if ((hasLower || hasUpper) && specialChar && n >= 6) {
    strength = "Moderate";
  }

  return strength;
};

const validatePassword = () => {
  let errorMsgElement = document.querySelector(
    "#confirm-password-div > .error-msg",
  );
  if (
    isValidPassword() &&
    (currentRole !== "admin" || passwordStrength(password) === "Strong")
  ) {
    if (errorMsgElement) errorMsgElement.remove();
    return;
  }

  const parentElement = document.querySelector("#confirm-password-div");
  if (!errorMsgElement) {
    errorMsgElement = document.createElement("p");
    errorMsgElement.setAttribute("class", "error-msg");
    parentElement.appendChild(errorMsgElement);
  }
  errorMsgElement.textContent =
    !password && !confirmPassword
      ? "Password cannot be empty"
      : "Passwords do not match";

  if (
    isValidPassword() &&
    currentRole === "admin" &&
    passwordStrength(password) !== "Strong"
  )
    errorMsgElement.textContent =
      "\n Password strength is not strong enough for admin role.";
};

const validateAge = () => {
  let errorMsgElement = document.querySelector("#age-div > .error-msg");
  if (age) {
    if (errorMsgElement) errorMsgElement.remove();
    return;
  }

  const parentElement = document.querySelector("#age-div");
  if (!errorMsgElement) {
    errorMsgElement = document.createElement("p");
    errorMsgElement.setAttribute("class", "error-msg");
    errorMsgElement.textContent = "Please enter age value";
  }

  parentElement.appendChild(errorMsgElement);
};

const updateRole = (newRole) => {
  currentRole = newRole;
  validateName();
  validateEmail();
  validatePassword();
  validateAge();
};

const toggleViewPassword = (evt) => {
  evt.preventDefault();

  const passwordInputElement = document.querySelector("#password");
  const confirmPasswordInputElement =
    document.querySelector("#confirm-password");
  if (passwordInputElement.type === "password")
    passwordInputElement.type = confirmPasswordInputElement.type = "text";
  else
    passwordInputElement.type = confirmPasswordInputElement.type = "password";
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#name").addEventListener("change", (evt) => {
    nameValue = evt.target.value;
    validateName();
  });

  document.querySelector("#email").addEventListener("change", (evt) => {
    email = evt.target.value;
    validateEmail();
  });

  document.querySelector("#password").addEventListener("change", (evt) => {
    password = evt.target.value;
    validatePassword();
  });

  document
    .querySelector("#confirm-password")
    .addEventListener("change", (evt) => {
      confirmPassword = evt.target.value;
      validatePassword();
    });

  document.querySelector("#age").addEventListener("change", (evt) => {
    age = evt.target.value;
    validateAge();
  });

  document
    .querySelector("#registration-form")
    .addEventListener("submit", (evt) => {
      evt.preventDefault();
      alert("Form Submitted Successfully")
      document.querySelector('#registration-form').reset()
    });

  document
    .querySelector("#confirm-password-div > button")
    .addEventListener("click", toggleViewPassword);

  document.querySelector('#registration-form').addEventListener('change', () => {
    const errorList = document.querySelector('.error-msg')
    const submitButtonElement = document.querySelector("button[type='submit']")
    
    if (errorList) submitButtonElement.disabled = true
    else submitButtonElement.disabled = false
  })
});
