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
var status = document.getElementById("status");
playButton.addEventListener("click", function(){
    var game = new Simone;
    active_game = true;
    game.play_game();

});


var total_rounds = rounds.value;
var user_response = [];
var active_game = false;
var computer_turn;
const  START = 120;
const  TRANSITION = 4000;
const  MAIN_DELAY = 400;
//TO DO
// maybe make a Simone class? was super helpful with the buttons
var start_sequence = ["G","R","Y","Y","B","B","R","B","Y","Y","G","G"];
var firstRound = ["Y"];
var tempRound = ["Y","B","R","B","G"];
var red = new Buttons("redSq","sounds/red.wav");
var blue = new Buttons("blueSq", "sounds/blue.wav");
var green = new Buttons("greenSq", "sounds/green.wav");
var yellow = new Buttons("yellowSq", "sounds/yellow.wav");
class Simone {
constructor() {
        this.levels = rounds.value;
        this.current_level = 1;
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
                  user_response.push(button.get_string_rep());
                  console.log(user_response);
                }
             })  
          button.getElement().addEventListener("mouseout",function(){
              button.changeColor(0, color);
          })
          button.getElement().addEventListener("mouseover", function(){
              button.addHoverBorder();
          })
          
    }
is_correct(){
return user_response.length == this.pattern.length && user_response.every((val,index)=>val == this.pattern[index]); 
}
async play_pattern(pattern, d){
    for(let i = 0; i < pattern.length; i++){
        await sleep(d); 
        if(pattern[i] == "G"){
        G.playSoundFx();
        G.changeColor(1, "green");
        await sleep(d);
        G.changeColor(0, "green");
        } if(pattern[i] == "R"){
        R.playSoundFx();
        R.changeColor(1, "red");
        await sleep(d);
        R.changeColor(0, "red");
        } if(pattern[i] == "Y"){
        Y.playSoundFx();
        Y.changeColor(1, "yellow");
        await sleep(d);
        Y.changeColor(0, "yellow");
        } if(pattern[i] == "B"){    
        B.playSoundFx();
        B.changeColor(1, "blue");
        await sleep(d);
        B.changeColor(0, "blue");
            }
    }
}
get_next_pattern(level){
    let colors = ["R","G","B","Y"];
    var result = [];
    for(let i = 0; i <= level; i++){
        result.push(colors[Math.floor(Math.random()*colors.length)]);
    }
    return result;
}
play_game(){
active_game = true;
computer_turn = true;
this.play_pattern(start_sequence);
sleep(TRANSITION);
let next_pattern = this.get_next_pattern(current_level)
this.play_pattern(next_pattern);




}
}

function sleep(d){
    return new Promise((resolve)=> setTimeout(resolve, d));
}



