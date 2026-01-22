const questions = [
  {
    id: "q_name",
    type: "text",
    label: "Full Name",
    required: true,
    minLength: 3,
  },
  {
    id: "q_role",
    type: "radio",
    label: "What is your current role?",
    options: ["Student", "Developer", "Manager"],
    required: true,
  },
  {
    id: "q_skills",
    type: "checkbox",
    label: "Select your skills",
    options: ["HTML", "CSS", "JavaScript", "Python", "SQL", "Others"],
    minSelection: 1
  }
];

function generateForm() {
  const container = document.getElementById("survey-container");
  const form = document.createElement("form");
  form.id = "dynamic-form";

  for (q of questions) {

    const wrapper = document.createElement("div");
    wrapper.className = "question-block";

    const label = document.createElement("label");
    label.className = "question-label";
    label.textContent = q.label + (q.required || q.minSelection ? " *" : "");
    wrapper.appendChild(label);

    if (q.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.name = q.id;
      wrapper.appendChild(input);
    } else if (q.type === "radio" || q.type === "checkbox") {
      q.options.forEach((opt) => {
        const div = document.createElement("div");

        const input = document.createElement("input");
        input.type = q.type; 
        input.name = q.id; 
        input.value = opt;
        input.id = `${q.id}_${opt}`; // gives unique id based on value of option

        const optLabel = document.createElement("label");
        optLabel.textContent = opt;
        optLabel.setAttribute("for", `${q.id}_${opt}`);

        div.appendChild(input);
        div.appendChild(optLabel);
        wrapper.appendChild(div);
      });
    }

    const errorSpan = document.createElement("p");
    errorSpan.className = "error-msg";
    errorSpan.id = `error_${q.id}`; 
    wrapper.appendChild(errorSpan);

    form.appendChild(wrapper);
  }

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit Survey";
  form.appendChild(submitBtn);

  form.addEventListener("submit", handleValidation);
  container.appendChild(form);
}

function handleValidation(e) {
  e.preventDefault(); 
  let isFormValid = true;

  questions.forEach((q) => {
    const errorEl = document.getElementById(`error_${q.id}`);
    let isValid = true;
    let message = "";

    if (q.type === "text") {
      const input = document.querySelector(`input[name="${q.id}"]`);
      const val = input.value.trim();

      if (q.required && val === "") {
        isValid = false;
        message = "This field is required.";
      } else if (q.minLength && val.length < q.minLength) {
        isValid = false;
        message = `Must be at least ${q.minLength} characters.`;
      }
    } else if (q.type === "radio") {
      const checked = document.querySelector(`input[name="${q.id}"]:checked`);
      if (q.required && !checked) {
        isValid = false;
        message = "Please make a selection.";
      }
    } else if (q.type === "checkbox") {
      const checkedCount = document.querySelectorAll(
        `input[name="${q.id}"]:checked`,
      ).length;
      if (q.minSelection && checkedCount < q.minSelection) {
        isValid = false;
        message = `Please select at least ${q.minSelection} options.`;
      }
    }

    if (!isValid) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
      isFormValid = false;
    } else {
      errorEl.classList.remove("visible");
    }
  });

  if (isFormValid) {
    alert("Form Submitted Successfully!");
    document.getElementById("dynamic-form").reset();
  }
}


generateForm();
