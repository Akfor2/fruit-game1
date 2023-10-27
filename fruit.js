
// Initialize variables
let playing = false;
let score;
let trailsLeft;
let step;
let action; // Used for set interval
let fruits = ['apple', 'bananas', 'grapes', 'guava', 'mango', 'peach', 'pineapple'];

$(function() {
    // Click on start reset button
    $("#startreset").click(function() {
        // If we are playing
        if (playing === true) {
            // Reload the page
            location.reload();
        } else {
            // If we aren't playing

            playing = true; // Game initiated
            // Set score to 0
            score = 0;
            $("#scorevalue").html(score);

            // Show trials left
            $("#trailsleft").show();
            trailsLeft = 3;
            addHearts();

            // Change button text to reset game
            $("#startreset").html("Reset Game");

            // Start sending fruits
            startAction();
        }
    });

    // Function to add heart images
    function addHearts() {
        $("#trailsleft").empty();
        for (let i = 0; i < trailsLeft; i++) {
            $("#trailsleft").append('<img src="/images/heart.png" class="life">');
        }
    }

    // Handle mouseover event on the fruit
    $("#fruit1").mouseover(function() {
        score++;
        $("#scorevalue").html(score); // Update score

        // Play the sound for slicing fruit
        $("#slicesound")[0].play();

        // Stop the fruit from going down
        clearInterval(action);

        // Hide the fruit with an explosion effect (500ms)
        $("#fruit1").hide("explode", 500);

        // Send a new fruit after a delay
        setTimeout(startAction, 500);
    });

    // Function to start sending fruits
    function startAction() {
        // Generate a fruit
        $("#fruit1").show();

        // Choose a random fruit
        chooseFruit();

        // Position the fruit randomly
        $("#fruit1").css({
            'left': Math.round(550 * Math.random()),
            'top': -50
        });

        // Fixed step value for consistent fruit movement
        const fixedStep = 1;

        // Move fruit down by one step every 10ms
        action = setInterval(function() {
            // Move the fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + fixedStep);

            // Check if the fruit is too low
            if ($("#fruit1").position().top > $("#fruitcontainer").height()) {
                // Check if we have trials left
                if (trailsLeft > 1) {
                    // Generate a new fruit
                    $("#fruit1").show();
                    chooseFruit(); // Choose a random fruit
                    $("#fruit1").css({
                        'left': Math.round(550 * Math.random()),
                        'top': -50
                    }); // Random position

                    // Set a fixed step
                    step = 1;

                    // Reduce trials by one
                    trailsLeft--;

                    // Populate trialsLeft box
                    addHearts();

                    $("#gameover").hide(); // Hide the game over message
                } else { // Game over
                    playing = false; // We are not playing anymore
                    $("#startreset").html("Start Game"); // Change the button text to Start Game
                    $("#gameover").show(); // Show the game over message
                    $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $("#trailsleft").hide(); // Hide the trailsLeft icon
                    stopAction();
                }
            }
        }, 10);
    }

    // Function to choose a random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(7 * Math.random())] + '.png');
    }

    // Initial game setup
    startAction();
});



