(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Simone Game */
/* Author: Madison Sanchez-Forman | Version: */
class Buttons {
    constructor(elem, file){
    this.element = document.getElementById(elem);
    this.sound = file; 
}
play_soundfx(){
    var sound = new Audio(this.sound);
    sound.play();  }
get_element(){
    return this.element;  }
change_color(int, color){
    if(int == 1) {
    this.element.className = "light" + color;
    } else {
    this.element.className = color;
    } 
}
add_hover_border(){
    this.element.classList.add("hover");
}
string_representation(){
    if (this.element.className.includes("red")){
        return "R";
    } else if (this.element.className.includes("yellow")){
        return "Y";
    } else if (this.element.className.includes("green")){
        return "G";
    } else if (this.element.className.includes("blue")){
        return "B";
    }
}
}
var current_level = 1, total_rounds, user_response = [], solution, position = 0, computer_turn = true;
var start_sequence = ["G","R","Y","Y","B","B","R","B","Y","Y","G","G"];
var playButton = document.getElementById("play"), rounds = document.getElementById("rounds"), display_status = document.getElementById("status");

var red = new Buttons("redSq","sounds/red.wav"),
blue = new Buttons("blueSq", "sounds/blue.wav"),
green = new Buttons("greenSq", "sounds/green.wav"),
yellow = new Buttons("yellowSq", "sounds/yellow.wav");
playButton.addEventListener("click", function(){
    total_rounds = parseInt(rounds.value);
    add_button_event_listeners(red, "red");
    add_button_event_listeners(blue, "blue");
    add_button_event_listeners(green, "green");
    add_button_event_listeners(yellow, "yellow");
    next_round();

});

function end_game(win_or_lose){
    if(win_or_lose == "win"){
    document.body.style.backgroundColor = "DeepSkyBlue";
    new Audio("sounds/win.mp3").play();
    display_status.innerHTML = "Yay! You win!";
    computer_turn = true;
    }else if (win_or_lose == "lose"){
        document.body.style.backgroundColor = "hotpink";
        new Audio("sounds/lose.wav").play();
        display_status.innerHTML = "Incorrect! You lose";
        computer_turn = true;
    }
    
}
function get_next_pattern(level){
        let colors = ["R","G","B","Y"];
        var result = [];
        for(let i = 0; i < level; i++){
            result.push(colors[Math.floor(Math.random()*colors.length)]);
        }
        return result;
}
function sleep(d){
 return new Promise((resolve)=> setTimeout(resolve, d));
}
function is_correct(){
        return user_response.every((val,index)=>val == solution[index]); 
}
async function next_round(){
if (current_level == 1){
await play_pattern(start_sequence, 120);    
await sleep(4000);    
}
solution = get_next_pattern(current_level);
console.log(solution);
user_response = [];
play_pattern(solution, 400);
computer_turn = false;

    
}
async function play_pattern(pattern, d){
    for(let i = 0; i < pattern.length; i++){
            await sleep(d); 
            if(pattern[i] == "G"){
            green.play_soundfx();
            green.change_color(1, "green");
            await sleep(d);
            green.change_color(0, "green");
            } if(pattern[i] == "R"){
            red.play_soundfx();
            red.change_color(1, "red");
            await sleep(d);
            red.change_color(0, "red");
            } if(pattern[i] == "Y"){
            yellow.play_soundfx();
            yellow.change_color(1, "yellow");
            await sleep(d);
            yellow.change_color(0, "yellow");
            } if(pattern[i] == "B"){    
            blue.play_soundfx();
            blue.change_color(1, "blue");
            await sleep(d);
            blue.change_color(0, "blue");
                }
        }
}
async function user_turn(button){ 
    if(computer_turn == false){
    user_response.push(button.string_representation());
    console.log(user_response);
    var remaining_plays = solution.length - user_response.length;
    if(!is_correct()){
    end_game("lose");
    return;
    console.log("game lost");
    }
     if(is_correct()){
    if(user_response.length == solution.length){
        if(current_level === total_rounds) {
            console.log("game won");
            end_game("win");
            return;
        }
    display_status.innerHTML = "Good job! Prepare for next round. "
    await sleep(800);
    current_level++;
    display_status.innerHTML = "Round " + current_level + " of " + total_rounds;
    await sleep(800);
    next_round();
    } else if(user_response.length < solution.length) {
    display_status.innerHTML = "So far so good! " + remaining_plays + " more to go!";

    }
    }
    }
}
function add_button_event_listeners(button, color){
        button.get_element().addEventListener("mousedown", function(){
          button.change_color(1, color);
          })
          button.get_element().addEventListener("mouseup",function(){
              button.change_color(0, color);
              button.play_soundfx();
              user_turn(button);
              if(user_response.length > current_level || user_response.length > total_rounds){
            display_status.innerHTML = "Game over!";
               }
             })  
          button.get_element().addEventListener("mouseout",function(){
              button.change_color(0, color);
          })
          button.get_element().addEventListener("mouseover", function(){
              button.add_hover_border();
          })
          
}

},{}]},{},[1]);
