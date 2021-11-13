/* Simone Game */
/* Author: Madison Sanchez-Forman | Version: */
class Buttons {
    constructor(elem, file){
    this.element = document.getElementById(elem);
    this.sound = file; }
    playSoundFx(){
    var sound = new Audio(this.sound);
     sound.play();  }
    getElement(){
        return this.element;  }
    changeColor(int, color){
        if(int == 1) {
        this.element.className = "light" + color;
        } else {
            this.element.className = color;
        } }
    addHoverBorder(){
    this.element.classList.add("hover");
    }
    get_string_rep(){
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
var playButton = document.getElementById("play");
var rounds = document.getElementById("rounds");
var display_status = document.getElementById("status");
playButton.addEventListener("click", function(){
    total_rounds = parseInt(rounds.value);
    var game = new Simone;
    game.play_game();
    console.log(rounds.value);
    console.log(total_rounds);
});

var current_level = 1;
var total_rounds;
var user_response = [];
var solution;
var active_game = false;
var computer_turn = true;
var position = 0;
const  START = 120;
const  TRANSITION = 4000;
const  MAIN_DELAY = 400;
//TO DO
// maybe make a Simone class? was super helpful with the buttons
var start_sequence = ["G","R","Y","Y","B","B","R","B","Y","Y","G","G"];

var red = new Buttons("redSq","sounds/red.wav");
var blue = new Buttons("blueSq", "sounds/blue.wav");
var green = new Buttons("greenSq", "sounds/green.wav");
var yellow = new Buttons("yellowSq", "sounds/yellow.wav");
class Simone {
constructor() {
        this.add_button_event_listeners(red, "red");
        this.add_button_event_listeners(yellow, "yellow");
        this.add_button_event_listeners(blue, "blue");
        this.add_button_event_listeners(green, "green");  
    }
add_button_event_listeners(button, color){
        button.getElement().addEventListener("mousedown", function(){
          button.changeColor(1, color);
          })
          button.getElement().addEventListener("mouseup",function(){
              button.changeColor(0, color);
              button.playSoundFx();
              if(computer_turn == false && active_game == true){
                  position++;
                  user_response.push(button.get_string_rep());
                  console.log(user_response);
                  console.log(is_correct());
                  if(is_correct_two){
                    if(current_level == total_rounds){
                        console.log("end game");
                        end_game(1);     
                    } else if(user_response.length == solution.length){
                        console.log(current_level==total_rounds);
                        console.log(current_level);
                        console.log(total_rounds);
                        current_level++;
                        new Audio("sounds/nextRound.wav").play();
                        display_status.innerHTML = "Good job! prepare for next round";
                        user_response = [];
                        solution = [];
                    } else if(position < current_level){
                        display_status.innerHTML = "So far so good! " + (current_level-position) + "more to go!";
                    }
                  } else if(!is_correct()){
                    end_game(0);
                  }
                }
             })  
          button.getElement().addEventListener("mouseout",function(){
              button.changeColor(0, color);
          })
          button.getElement().addEventListener("mouseover", function(){
              button.addHoverBorder();
          })
          
    }
is_turn_over(){
    return user_response.length == solution.length;
}
switch_turns(){
    if(computer_turn){
        computer_turn = false;
    } else if(!computer_turn){
        computer_turn = true;
    }
}

async play_game(){
await play_pattern(start_sequence, START);    
await sleep(TRANSITION);
active_game = true;
solution = get_next_pattern(current_level);
console.log(solution);
await play_pattern(solution, MAIN_DELAY);
this.switch_turns();
}
}
function end_game(int){
active_game = false;
if(int = 1){
document.body.style.backgroundColor = "DeepSkyBlue";
new Audio("sounds/win.mp3").play();
display_status.innerHTML = "Yay! You win!";
}else {
    document.body.style.backgroundColor = "hotpink";
    new Audio("sounds/lose.wav");
    display_status.innerHTML = "Incorrect! You lose";
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
async function play_pattern(pattern, d){
    for(let i = 0; i < pattern.length; i++){
        await sleep(d); 
        if(pattern[i] == "G"){
        green.playSoundFx();
        green.changeColor(1, "green");
        await sleep(d);
        green.changeColor(0, "green");
        } if(pattern[i] == "R"){
        red.playSoundFx();
        red.changeColor(1, "red");
        await sleep(d);
        red.changeColor(0, "red");
        } if(pattern[i] == "Y"){
        yellow.playSoundFx();
        yellow.changeColor(1, "yellow");
        await sleep(d);
        yellow.changeColor(0, "yellow");
        } if(pattern[i] == "B"){    
        blue.playSoundFx();
        blue.changeColor(1, "blue");
        await sleep(d);
        blue.changeColor(0, "blue");
            }
    }
}
function sleep(d){
    return new Promise((resolve)=> setTimeout(resolve, d));
}
function is_correct_two(){
    return user_response.length == solution.length && user_response.every((val,index)=>val == solution[index]); 
    }
function is_correct(){
    return user_response[position] === solution[position];
    }