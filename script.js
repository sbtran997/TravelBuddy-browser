document.addEventListener("DOMContentLoaded", function () {
  const quizPopup = document.getElementById("quiz-popup");
  const submitButton = document.getElementById("submit-quiz");

  // Show the quiz after 3 seconds (if user hasn't already taken it)
  if (!localStorage.getItem("interests")) {
    setTimeout(() => {
      quizPopup.style.display = "block";
    }, 3000);
  }

  submitButton.addEventListener("click", function () {
    let selectedInterests = [];
    document.querySelectorAll("input[name='interest']:checked").forEach((checkbox) => {
      selectedInterests.push(checkbox.value);
    });

    if (selectedInterests.length > 0) {
      localStorage.setItem("interests", JSON.stringify(selectedInterests)); // Store interests
      quizPopup.style.display = "none"; // Hide quiz
      alert("Thanks! We'll personalize your experience.");
    } else {
      alert("Please select at least one interest.");
    }
  });
});
