document.addEventListener("DOMContentLoaded", function () {
    const quizPopup = document.getElementById("quiz-popup");
    const openQuizBtn = document.getElementById("quiz-tab"); // Ensure correct ID
    const closeQuizBtn = document.querySelector(".close-btn");
    const submitQuizBtn = document.getElementById("submit-quiz");

    // Default context if user skips the quiz
    const defaultContext = {
        food: true,
        sports: false,
        beaches: true,
        entertainment: false,
        music: true,
        budget: 500
    };

    // Load stored data or set default
    function getStoredData() {
        let storedData = JSON.parse(localStorage.getItem("quizData"));
        return storedData ? storedData : defaultContext;
    }

    // Show stored data in quiz popup
    function displayStoredData() {
        let storedData = getStoredData();

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

        let interestsText = Object.keys(storedData)
            .filter(key => storedData[key] === true && key !== "budget")
            .join(", ") || "No interests selected";

        let budgetText = storedData.budget ? `$${storedData.budget}` : "Not set";

        resultDiv.innerHTML = `<strong>Your Interests:</strong> ${interestsText} <br> 
                               <strong>Your Budget:</strong> ${budgetText}`;
    }

    // Open quiz popup and notify if data already exists
    function openQuiz() {
        quizPopup.style.display = "block";
        let storedData = JSON.parse(localStorage.getItem("quizData"));

        if (storedData) {
            alert("You have already provided your preferences. You can review or update them.");
        }
        displayStoredData();
    }

    // Close quiz popup
    function closeQuiz() {
        quizPopup.style.display = "none";
    }

    // Attach event listeners
    closeQuizBtn.addEventListener("click", closeQuiz);
    openQuizBtn.addEventListener("click", openQuiz);

    // Submit quiz data
    submitQuizBtn.addEventListener("click", function () {
        let interests = {
            food: document.getElementById("interest-food").checked,
            sports: document.getElementById("interest-sports").checked,
            beaches: document.getElementById("interest-beaches").checked,
            entertainment: document.getElementById("interest-entertainment").checked,
            music: document.getElementById("interest-music").checked,
            budget: parseFloat(document.getElementById("budgetInput").value.trim()) || defaultContext.budget
        };

        // Ensure at least one interest is selected
        if (!interests.food && !interests.sports && !interests.beaches && !interests.entertainment && !interests.music) {
            alert("Please select at least one interest.");
            return;
        }

        localStorage.setItem("quizData", JSON.stringify(interests));
        alert("Preferences saved successfully!");
        displayStoredData();
    });

    // Set default data if none exists
    if (!localStorage.getItem("quizData")) {
        localStorage.setItem("quizData", JSON.stringify(defaultContext));
    }

    // Display stored data on page load
    displayStoredData();
});




