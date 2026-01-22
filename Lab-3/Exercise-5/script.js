const totalSteps = 4;
let currentStep = 1;
const formDataStore = {};

const steps = document.querySelectorAll(".step-group"),
  indicator = document.getElementById("step-indicator"),
  btnNext = document.getElementById("btn-next"),
  btnPrev = document.getElementById("btn-prev"),
  btnSubmit = document.getElementById("btn-submit"),
  reviewPanel = document.getElementById("review-panel");

function updateUI() {
  steps.forEach((step) => {
    const stepNum = parseInt(step.dataset.step);
    if (stepNum === currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  indicator.textContent = `Step ${currentStep} of ${totalSteps}`;

  btnPrev.disabled = currentStep === 1;

  if (currentStep === totalSteps) {
    btnNext.classList.add("hidden");
    btnSubmit.classList.remove("hidden");
    renderReview();
  } else {
    btnNext.classList.remove("hidden");
    btnSubmit.classList.add("hidden");
  }

  document.querySelector('#progress-bar').style.width = `${((currentStep/totalSteps) * 100)}%`
}

function validateCurrentStep() {
  const activeDiv = document.querySelector(".step-group.active");
  const inputs = activeDiv.querySelectorAll("input, select");
  let isStepValid = true;

  inputs.forEach((input) => {
    const errorSpan = input.nextElementSibling || input.parentElement.nextElementSibling;

    if (!input.checkValidity()) {
      isStepValid = false;
      errorSpan.textContent = input.validationMessage;
    } else {
      errorSpan.textContent = "";

      formDataStore[input.name] = input.value;
    }
  });

  return isStepValid;
}

function renderReview() {
  let html = "<ul>";
  for (let key in formDataStore) {
    html += `<li><strong>${key}:</strong> ${formDataStore[key]}</li>`;
  }
  html += "</ul>";
  reviewPanel.innerHTML = html;
}

btnNext.addEventListener("click", () => {
  if (validateCurrentStep()) {
    currentStep++;
    updateUI();
  }
});

btnPrev.addEventListener("click", () => {
  currentStep--;
  updateUI();
});

document.getElementById("work-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Successfully Submitted");
});

updateUI();
