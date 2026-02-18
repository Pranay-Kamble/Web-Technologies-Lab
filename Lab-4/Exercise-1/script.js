function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.querySelector("input").addEventListener("keyup", async (evt) => {
  const inputValue = evt.target.value,
    msgField = document.querySelector("#message"),
    button = document.querySelector("button");

  if (inputValue === "") {
    msgField.innerHTML = "";
    button.disabled = true;
    return;
  }

  msgField.textContent = "Message: Loading ...";
  msgField.style.color = "black";

  const response = await fetch("data.json"),
    data = await response.json();

  const users = data["users"];

  if (users.includes(inputValue)) {
    msgField.textContent = "Message: Username already taken";
    msgField.style.color = "red";
    button.disabled = true;
  } else {
    msgField.textContent = "Message: Username available";
    msgField.style.color = "green";
    button.disabled = false;
  }
});

document.querySelector("#data-field").innerHTML =
  `<b>Pre-existing Usernames:</b> "neon_strider",
    "quantum_flux99",
    "cipher_punk_x",
    "lunar_drift",
    "pixel_forge",
    "echo_baseline",
    "nova_burst_7",
    "circuit_breaker",
    "retro_vibe_84",
    "stellar_wind"`;

document.querySelector("button").addEventListener("click", (evt) => {
  const inputField = document.querySelector("input"),
    msgField = document.querySelector("#message"),
    button = document.querySelector("button");
  alert(`Form Submitted, Your username is ${inputField.value}`);

  inputField.value = "";
  msgField.innerHTML = "";
  button.disabled = true;
});
