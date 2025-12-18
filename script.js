// regex pattern = Regex is used to validate input format, not just empty values.
const nameRegex = /^[A-Za-z ]{3,}$/; //name need 3 char and must be letter here.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //need valid email format
const passwordRegex = /^(?=.*\d).{6,}$/; //need 6 char , one num needed

// basic info
function saveStep1() {
  const name = document.getElementById("name").value.trim(); 
  const email = document.getElementById("email").value.trim();   //trim remove the extra space
  const password = document.getElementById("password").value.trim();

  if (!nameRegex.test(name)) {
    alert("Enter a valid name (min 5 letters)");   //Checks name using Regex and stop exection if invalid
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Enter a valid email address");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Password must be 6 characters and include a number");
    return;
  }

  sessionStorage.setItem("step1", JSON.stringify({ name, email, password }));  //save step 1 in sessionstorage as json.

  document.getElementById("step1").style.display = "none"; //hide step 1
  document.getElementById("step2").style.display = "block"; //show step 2
}

//Address
function saveStep2() {
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();

  if (city === "" || country === "") {
    alert("All address fields are required");
    return;
  }

  sessionStorage.setItem("step2", JSON.stringify({ city, country }));

  document.getElementById("step2").style.display = "none"; //hide step 2
  document.getElementById("step3").style.display = "block"; //show step 3
}

// // Final submit//
function finalSubmit() {
  const degree = document.getElementById("degree").value.trim();
  const university = document.getElementById("university").value.trim();

  if (degree === "" || university === "") {
    alert("Qualification details required");
    return;
  }

  sessionStorage.setItem("step3", JSON.stringify({ degree, university }));

  // Retrieve all data
  const step1 = JSON.parse(sessionStorage.getItem("step1"));
  const step2 = JSON.parse(sessionStorage.getItem("step2"));
  const step3 = JSON.parse(sessionStorage.getItem("step3"));

  if (!step1 || !step2 || !step3) {
    alert("Incomplete form data!");
    return;
  }

  console.log("Final Form Data:", {
    ...step1,
    ...step2,
    ...step3
  });

  alert("Form submitted successfully 🎉");

  sessionStorage.clear();
}

//sign in js
document.addEventListener("DOMContentLoaded", () => {

  // Get elements
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.querySelector(".navbar .btn-outline"); // Sign in button
  const closeModal = document.getElementById("closeModal");

  // Open modal on Sign In click
  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });

  // Close modal on close button click
  closeModal.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  // Close modal on clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
    }
  });

  // Optional: handle login form submit
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent actual submission
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Simple validation
    if(email && password){
      alert(`Login Successful!\nEmail: ${email}`);
      loginModal.style.display = "none";
      loginForm.reset();
    } else {
      alert("Please fill in all fields!");
    }
  });

});


// for button
document.addEventListener("DOMContentLoaded", () => {   //it wait html (pages) to load fully

  const themeBtn = document.getElementById("themeToggle");  //botton to change the theme

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");  //it check if I already selected the theme or not
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "Light Mode";
  }

  // Toggle theme on click
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");   //ON OFF dark mode

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "Dark Mode";
    }
  });

});

