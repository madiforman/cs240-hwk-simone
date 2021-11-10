/* Simone Game */
/* Author: Madison Sanchez-Forman | Version: */
class Buttons {
    constructor(elem, file){
    this.element = document.getElementById(elem);
    this.sound = file;
    }
    playSoundFx(){
    var sound = new Audio(this.sound);
     sound.play();
    }
    getElement(){
        return this.element; 
     }
    changeColor(int, color){

        if(int == 1) {
        this.element.className = "light" + color;
        } else {
            this.element.className = color;
        } }
    addHoverBorder(){
    this.element.classList.add("hover");
    }

}
var R = new Buttons("redSq","sounds/red.wav");
var Y = new Buttons ("yellowSq", "sounds/yellow.wav");
var B = new Buttons ("blueSq", "sounds/blue.wav");
var G = new Buttons ("greenSq", "sounds/green.wav");
var playButton = document.getElementById("play");
var startSequence = ["G","R","Y","Y","B","B","R","B","Y","Y","G","G"];
const  START = 120;
//TO DO
// maybe make a Simone class? was super helpful with the buttons
class SimoneSays {
constructor(buttonsArray, boolean, api) {
        this.isPlaying = boolean
        this.buttons = buttonsArray;
        this.API = api;
        this.len = document.getElementById("rounds").value;
    }
playing(){
    return this.isPlaying;
}
getButtons(){
    return this.buttons;
}
getPattern(r){

}

}
async function playSequence(pattern){
for(let i = 0; i < pattern.length; i++){
    await sleep(START); 
    if(pattern[i] == "G"){
    G.playSoundFx();
    G.changeColor(1, "green");
    await sleep(START);
    G.changeColor(0, "green");
    } if(pattern[i] == "R"){
    R.playSoundFx();
    R.changeColor(1, "red");
    await sleep(START);
    R.changeColor(0, "red");
    } if(pattern[i] == "Y"){
    Y.playSoundFx();
    Y.changeColor(1, "yellow");
    await sleep(START);
    Y.changeColor(0, "yellow");
    } if(pattern[i] == "B"){    
    B.playSoundFx();
    B.changeColor(1, "blue");
    await sleep(START);
    B.changeColor(0, "blue");
        }
   
}
}
 function sleep(d){
    return new Promise((resolve)=> setTimeout(resolve, d));
}
playButton.addEventListener("click", function(){
    addButtonEventListeners(R, "red");
    addButtonEventListeners(Y, "yellow");
    addButtonEventListeners(B, "blue");
    addButtonEventListeners(G, "green");
    playSequence(startSequence);
})
function addButtonEventListeners(button, color){
    button.getElement().addEventListener("mousedown", function(){
        button.changeColor(true, color);
      })
      button.getElement().addEventListener("mouseup",function(){
          button.changeColor(false, color);
          button.playSoundFx();
      })
      button.getElement().addEventListener("mouseout",function(){
          button.changeColor(false, color);
      })
      button.getElement().addEventListener("mouseover", function(){
          button.addHoverBorder();
      })
      
}

