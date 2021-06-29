/**
 * Date : June 28th, 2021
 * Author : Elsa Z.
 * 
 * Javascript functions of Simon Game
 */

//Colors array
let buttonColours = [ "red", "blue", "green", "yellow" ];
let gamePattern = [  ];
let userClickedPattern = [  ];

//Variables to track wheter the game started or not
let hasStarted = false;
let level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$( document ).keydown( function () {
    if ( !hasStarted ) 
    {
        $( "#level-title" ).text( "Level " + level );
        nextSequence();
        hasStarted = true;  //The game has started so no need to call nextSequence a second time
    }
} )

//Play sound function()
function playSound(name) 
{
    var audio = new Audio( "sounds/" + name + ".mp3" );
    audio.play();
}

//Using jQuery to detect when any of the buttons is clicked
$( ".btn" ).on( "click", function () { 
    let userChosenColour = $( this ).attr( "id" ); //get the id value of the button that got clicked
    playSound( userChosenColour );
 
    userClickedPattern.push( userChosenColour );    //Append each userChosenColour to this array
    checkAnswer( ( userClickedPattern.length - 1 ) );

    //Add an animation
    animatePress( userChosenColour );
} )

//nextSequence() function
function nextSequence() 
{
    userClickedPattern = [  ];  //reset the array to the next level

    //Increasing the value of the level
    level++;

    //Update the h1
    $( "#level-title" ).text( "Level " + level ); 

    let randomNumber = Math.floor( Math.random() * 4 ); //random numbers [ 0 - 3 ]
    let randomChosenColour = buttonColours[ randomNumber ]; //random number --> random color
    gamePattern.push( randomChosenColour ); // Append each color to gamePattern array

    $( "#" + randomChosenColour ).fadeIn( 150 ).fadeOut( 150 ).fadeIn( 150 );
    playSound( randomChosenColour );

    //Add an animation
    animatePress( randomChosenColour );
}

//Add and remove pressed class with a delay
function animatePress(currentColour) 
{
    $( "#" + currentColour ).addClass( "pressed" );
    setTimeout( function() { $( "#" + currentColour ).removeClass( "pressed" );}, 100 );  
}

//Checking player'sanswers
function checkAnswer( currentLevel ) 
{
    if ( userClickedPattern[ currentLevel ] === gamePattern[ currentLevel ] ) //if the answer is correct
    {
        if ( userClickedPattern.length === gamePattern.length ) //if the user finishes his sequence
            setTimeout( function() { nextSequence() }, 1000 );    //call nextSequence() each second (1000ms)          
    }
    else
    {
        playSound( "wrong" );   
        $( "body" ).addClass( "game-over" );    //add the game-over class to the body
        setTimeout( function() { $( "body" ).removeClass( "game-over" ); }, 200);   //remove it after 200ms
        $( "h1" ).text( "Game Over, Press Any Key To Restart" );
        startOver();
    }
}

//Restart the game : reset the values of level, gamePattern and hasStarted
function startOver() 
{
    gamePattern = [ ];
    hasStarted = false;
    level = 0;  
}