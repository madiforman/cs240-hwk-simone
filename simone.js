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
    changeColor(boolean, color){
        if(boolean == true) {
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

async function playSequence(pattern){
for(let i = 0; i < pattern.length; i++){
    await sleep(START);
    if(pattern[i] == "R"){
    R.changeColor(true, "red");
    R.playSoundFx();
    await sleep(START);
    R.changeColor(false, "red");
    }
    if(pattern[i] == "G"){
    G.changeColor(true, "green");
    G.playSoundFx();
    await sleep(START);
    G.changeColor(false, "green");
        }
    if(pattern[i] == "B"){
    B.changeColor(true, "blue");
    B.playSoundFx();
    await sleep(START);
    B.changeColor(false, "blue");
        }
    if(pattern[i] == "Y"){
    Y.changeColor(true, "yellow");
    Y.playSoundFx();
    await sleep(START);
    Y.changeColor(false, "yellow");
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

