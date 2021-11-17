/* Simone Game */ 
/* Author: Madison Sanchez-Forman | Version: November 15, 2021 */
const axios = require('axios'); //import axios library
 /************************************************************************************/
class Buttons {
    /**
     * Button class for 4 colors on the board of the game. 
     * controlled by corresponding DOM element
     * @param {*} elem corresponding DOM element
     * @param {*} file sound that will be played when the user clicks a button
     */
    constructor(elem, file){
    this.element = document.getElementById(elem);
    this.sound = file; 
}
/* play_sound will play the sound of the button corresponding to its collor */
play_soundfx(){ 
    var sound = new Audio(this.sound);
    sound.play();  
}
/**
 * Will return corresponding HTML element associated with DOM
 * @returns DOM element associated with current button
 */
get_element(){ 
    return this.element; 
 }
 /** 
 * change_color will be used to toggle the color of the button between 
 * light and regular upon interactions with the mouse 
 * @param int - if the integer entered == 1 it will mean I want the button to lighten in color, else return to normal
 * @param color - will be a string value of corresponding color desired
 */
change_color(int, color){
    if(int == 1) {
    this.element.className = "light" + color; //color being concatenated  with light to change CSS class name
    } else {
    this.element.className = color; //regular color for regular CSS class name
    } 
}
/**
 * add_hover_border will be used when the users mouse is hovering over the button, I will add to the buttons
 * class list "hover" (provided CSS class) 
 */
add_hover_border(){ 
    this.element.classList.add("hover");
}
/**
 * char_representation will be used when the game begins to help keep track of the user's response. It simply returns
 * 'R' for red, 'Y' for yellow, 'G' for green, or 'B' for blue depending on which color had been pressed.
 * Formatting was chosen to correspond with the arrays of sequence that will be returned by the API, so that it is
 * easeier to check for correct and incorrect responses.  
 * @returns 'R', 'Y', 'G', 'B' depending on what color button had been pressed
 */
char_representation(){
    if (this.element.className.includes("red")){
        return 'R';
    } else if (this.element.className.includes("yellow")){
        return 'Y';
    } else if (this.element.className.includes("green")){
        return 'G';
    } else if (this.element.className.includes("blue")){
        return 'B';
    }
}
}
/************************************************************************************/
const API = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/"; //axios library url
var current_level = 1, //game starts at level 1
total_rounds, //will hold the value of rounds element
user_response = [], //will store the user's response
computer_turn = true; //is it the users' turn?

var play_button = document.getElementById("play"), //button that will instantiate game
rounds = document.getElementById("rounds"), //number of rounds the user wants to play
display_status = document.getElementById("status");//where the status of the game will be displayed to the user

var red = new Buttons("redSq","sounds/red.wav"), //create button objects, wont respond to clicks yet 
blue = new Buttons("blueSq", "sounds/blue.wav"),
green = new Buttons("greenSq", "sounds/green.wav"),
yellow = new Buttons("yellowSq", "sounds/yellow.wav");
/***********************************************************q*************************/
play_button.addEventListener("click", function(){ //if the start button is clicked
    total_rounds = parseInt(rounds.value); //get the # of rounds to be played
    if(isNaN(total_rounds)){ //if what the user entered cant be coverted to a number
    display_status.innerHTML = "I don't think you entered a number, reload your page and try again.";
    } else if(total_rounds <= 0){ //if what the user enterted is negative or == 0
    display_status.innerHTML = "The fewest number of rounds you can play is 1, reload your page and try again.";
    }
    else {
    add_button_event_listeners(red, "red"); //give buttons funtionality
    add_button_event_listeners(blue, "blue");
    add_button_event_listeners(green, "green");
    add_button_event_listeners(yellow, "yellow");
    next_round(); //start round 1   
    }
});
/************************************************************************************/
/**
 * request_start() Will send a request to the API provided, specifically for a randomized starting sequence 
 * @returns start_sequence - sequence played at the beginning of the game
 */
async function request_start(){ 
    let data = {
        type: {"start": "sequence"}  };
    try {
    let response = await axios.get(API + "?cmd=start");
    var start_sequence = response.data.sequence;
    return start_sequence;
    } catch(err){
        console.log("Error: " + err);
    }
 }
 /**
  * request_round() Will send a request to the API provided, specifically for a randomized solution
  * for the current level of the game
  * @returns solution - pattern that will be played to the user, and then matched against the users response
  */
 async function request_round(){
    let data = {
                type: {"solution": "key"}  };
            try {
             let response = await axios.get(API + "?cmd=getSolution&rounds=" + current_level);
             var solution = response.data.key;
             return(solution);
            } catch(err){
                console.log("Error " + err);
            }
 }
 /**
  * next_round() - Will get called after the user answers each round (assuming response was correct).
  * If its the first round of the game, it will begin by playing requesting the starting sequence (request_start()),
  * if not it will call request_round() to get the next solution and await its response (which is why its async). 
  * If its the first round the opening sequence will be played(with a 120 ms delay in between each button), 
  * and then a delay of 40000 ms will follow. If its not the first round it will clear the user's previous response, 
  * play the next round's solution (with a 400 ms delay in between each button), and finally change it to the users turn. 
  */
async function next_round(){
if (current_level == 1){ //if game is starting play start sequence
play_pattern(await request_start(), 120);    
await sleep(4000);    
}
solution = (await request_round()); // else request solution for current level 
user_response = []; //empty previous answer from user
play_pattern(solution, 400); //play solution
computer_turn = false;
}
/**
 * play_pattern() Will light up each button and play its corresponding sound depending on sequence of the array given.
 * each button play will be followed by awaiting a sleep delay, making the function asynch
 * @param {*} pattern - array of R,G,B,Y to determine order of buttons
 * @param {*} d - amount of delay in between each color that is required (in milliseconds)
 */
async function play_pattern(pattern, d){
    for(let i = 0; i < pattern.length; i++){
            await sleep(d); 
            if(pattern[i] == 'G'){ //if the pattern[i] == one of the colors
            green.play_soundfx(); //play that buttons corresponding sound
            green.change_color(1, "green"); //1 for light up button
            await sleep(d); //begin awaiting delay
            green.change_color(0, "green"); //0 for return to normal
            } if(pattern[i] == 'R'){
            red.play_soundfx();
            red.change_color(1, "red");
            await sleep(d);
            red.change_color(0, "red");
            } if(pattern[i] == 'Y'){
            yellow.play_soundfx();
            yellow.change_color(1, "yellow");
            await sleep(d);
            yellow.change_color(0, "yellow");
            } if(pattern[i] == 'B'){    
            blue.play_soundfx();
            blue.change_color(1, "blue");
            await sleep(d);
            blue.change_color(0, "blue");
                }
        }
}
/**
 * user_turn() will handle functionality when user is responding to a round's sequence.
 * if its not the computers turn, push the char rep of any button click onto user_response.
 * the number of remaining plays the user has left to make = the solution's length - user_response.length.
 * if their response wasn't correct, end game.
 * else, see if this is the last round, if it is the user has won.
 * if it is not, start the next round 
 * @param {*} button - button that user has clicked, its clicks are being tracked by event listeners
 * @returns - does not return anything but leaves function if game has been won or lost
 */
async function user_turn(button){ 
    if(computer_turn == false){
    user_response.push(button.char_representation());
    var remaining_plays = solution.length - user_response.length;
    if(!is_correct()){
    end_game("lose"); //see end_game() comments to know why its being passed either "win" or "lose"
    return;
    }
     if(is_correct()){
    if(user_response.length == solution.length){
        if(current_level === total_rounds) {
            end_game("win");
            return;
        }
    display_status.innerHTML = "Good job! Prepare for next round. " //if theres another round display message to user
    await sleep(800);
    current_level++;
    display_status.innerHTML = "Round " + current_level + " of " + total_rounds; //wait 800 ms and then display current_round/total_rounds
    await sleep(800); //wait 800 ms
    next_round(); //start next round
    } else if(user_response.length < solution.length) { //else user has more plays to make
    display_status.innerHTML = "So far so good! " + remaining_plays + " more to go!"; //display remaining plays of soln
    }
    }
    }
}
/**
 * If the user has lost or won the game, end_game() will be called to make the necessary changes to the status
 * bar and background. will also play appropriate sounds. 
 * @param {*} win_or_lose - a string either "win" or "lose", if "win" is passed, the background will be changed to DeepSkyBlue and the user
 * will be alerted that they've won, if "lose" is passed the background will be changed to hot pink and the user will be alerted that they've lost
 */
function end_game(win_or_lose){
    computer_turn = true; //either way if its win or lose its no longer the user's turn
    if(win_or_lose == "win"){
    document.body.style.backgroundColor = "DeepSkyBlue";
    new Audio("sounds/win.mp3").play();
    display_status.innerHTML = "Yay! You win!";
   
    }else if (win_or_lose == "lose"){
        document.body.style.backgroundColor = "hotpink";
        new Audio("sounds/lose.wav").play();
        display_status.innerHTML = "Incorrect! You lose";
    }
    
}
/**
 * sleep() will be used to add delays throughout the game. This method was taken from in class lectures on promise objects. 
 * @param {*} d - amount of delay in ms requested
 * @returns a JS promise object that has either failed and terminated or is delaying 
 */
function sleep(d){
 return new Promise((resolve)=> setTimeout(resolve, d));
}
/**
 * is_correct() will return true if the user's response was the correct pattern false otherwise
 * @returns True/False depedning on wether or not the user's response was correct
 */
function is_correct(){
        return user_response.every((val,index)=>val == solution[index]); 
}
/**
 * add_button_event_listeners() is used to give buttons functionality and to handle user's response during the game/
 * @param {*} button - button currently clicked/interacted with
 * @param {*} color - corresponding string of the button's color to be passed to change_color()
 */
function add_button_event_listeners(button, color){
        button.get_element().addEventListener("mousedown", function(){
          button.change_color(1, color); //if mouse is pressed down, light up button
          })
          button.get_element().addEventListener("mouseup",function(){ //if mouse is pressed down, and then released
              button.change_color(0, color); //return color to normal
              button.play_soundfx(); //play corresponding sound.
              user_turn(button); //will handle game functionality of clicks
              if(user_response.length > current_level || user_response.length > total_rounds){ //if buttons are being pressed after game has ended, display game over status
            display_status.innerHTML = "Game over!";
               }
             })  
          button.get_element().addEventListener("mouseout",function(){ //if mousedown and then pulled out before mouse up, change color to normal
              button.change_color(0, color);
          })
          button.get_element().addEventListener("mouseover", function(){ //if the mouse is hovering over the button add hover border
              button.add_hover_border();
          })
          
}

