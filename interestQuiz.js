document.addEventListener("DOMContentLoaded", function () {
    const quizPopup = document.getElementById("quiz-popup");
    const openQuizBtn = document.getElementById("open-quiz-btn");
    const closeQuizBtn = document.querySelector(".close-btn");
    const submitQuizBtn = document.getElementById("submit-quiz");

    // Quiz Pop-up Logic
    function openQuiz() {
        document.getElementById("quiz-popup").style.display = "block";
    }
    function closeQuiz() {
        document.getElementById("quiz-popup").style.display = "none";
    }
    
    // Attach event listener to close button
    document.querySelector(".close-btn").addEventListener("click", closeQuiz);


    // Submit quiz data
    submitQuizBtn.addEventListener("click", function () {
        let selectedInterests = [];
        document.querySelectorAll("input[name='interest']:checked").forEach((checkbox) => {
            selectedInterests.push(checkbox.value);
        });

        let budget = document.getElementById("budgetInput").value.trim();

        if (selectedInterests.length === 0) {
            alert("Please select at least one interest.");
            return;
        }

        if (!budget || isNaN(budget) || parseFloat(budget) < 0) {
            alert("Please enter a valid budget amount.");
            return;
        }

        let quizData = {
            interests: selectedInterests,
            budget: parseFloat(budget)
        };

        localStorage.setItem("quizData", JSON.stringify(quizData));
        quizPopup.classList.remove("active");
        alert("Preferences saved successfully!");
    });
});

