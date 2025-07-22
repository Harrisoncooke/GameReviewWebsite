// Handle Add Game form and display games

// Wait for the DOM to be fully loaded before running the script
// This ensures all elements are available for manipulation

document.addEventListener('DOMContentLoaded', function() 
{
    // Get references to the form and the games container
    const addGameForm = document.getElementById('addGameForm');
    const gamesContainer = document.getElementById('gamesContainer');

    // Load games from localStorage or initialize as an empty array
    let games = JSON.parse(localStorage.getItem('games')) || [];

    // Function to render the list of games on the page
    function renderGames() {
        gamesContainer.innerHTML = '';
        if (games.length === 0) {
            gamesContainer.innerHTML = '<li>No games added yet.</li>';
            return;
        }
        // Loop through each game and create a list item
        games.forEach((game, index) => {
            const li = document.createElement('li');
            // Display game name, description, and rating
            li.innerHTML = `<strong>${game.name}</strong>: ${game.desc} <br> <em>Rating: ${game.rating || 'N/A'}/5</em>`;
            gamesContainer.appendChild(li);
        });
    }

    // Handle the form submission event to add a new game
    addGameForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        // Get values from the form fields
        const name = document.getElementById('gameName').value.trim();
        const desc = document.getElementById('gameDesc').value.trim();
        const rating = document.getElementById('gameRating').value;
        if (name && desc && rating) {
            // Add the new game to the games array
            games.push({ name, desc, rating });
            // Save the updated games array to localStorage
            localStorage.setItem('games', JSON.stringify(games));
            // Re-render the games list
            renderGames();
            // Reset the form fields
            addGameForm.reset();
        }
    });

    // Initial render of the games list when the page loads
    renderGames();
}); 