document.addEventListener("DOMContentLoaded", function () {
    const quizPopup = document.getElementById("quiz-popup");
    const openQuizBtn = document.getElementById("quiz-tab"); // Ensure correct ID
    const closeQuizBtn = document.querySelector(".close-btn");
    const submitQuizBtn = document.getElementById("submit-quiz");

    // Open quiz and display stored data
    function openQuiz() {
        quizPopup.style.display = "block";
        displayStoredData(); // Show previous inputs
    }

    // Close quiz popup
    function closeQuiz() {
        quizPopup.style.display = "none";
    }

    // Attach event listener to close button
    closeQuizBtn.addEventListener("click", closeQuiz);
    openQuizBtn.addEventListener("click", openQuiz);

    // Function to display stored interests and budget
    function displayStoredData() {
        let storedData = JSON.parse(localStorage.getItem("quizData")) || { interests: [], budget: "Not set" };

        let interestsText = storedData.interests.length > 0 ? storedData.interests.join(", ") : "No interests selected";
        let budgetText = storedData.budget ? `$${storedData.budget}` : "Not set";

        let resultDiv = document.getElementById("stored-results");
        if (!resultDiv) {
            resultDiv = document.createElement("div");
            resultDiv.id = "stored-results";
            resultDiv.style.marginTop = "15px";
            resultDiv.style.padding = "10px";
            resultDiv.style.background = "#f4f4f4";
            resultDiv.style.borderRadius = "5px";
            resultDiv.style.color = "#000";
            document.querySelector(".popup-content").appendChild(resultDiv);
        }

        resultDiv.innerHTML = `<strong>Your Interests:</strong> ${interestsText} <br> 
                               <strong>Your Budget:</strong> ${budgetText}`;
    }

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
        alert("Preferences saved successfully!");

        // Refresh the stored data display
        displayStoredData();
    });
});


