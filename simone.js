/* Simone Game */
/* Author: Madison Sanchez-Forman | Version: */
class Buttons {
    constructor(elem, s){
    this.element = document.getElementById(elem);
    this.sound = s;

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
    // removeHoverBorder(){
    //     this.element.classList.remove("hover");
    // }

}
var red = new Buttons("redSq","sounds/red.wav");
var yellow = new Buttons ("yellowSq", "sounds/yellow.wav");
var blue = new Buttons ("blueSq", "sounds/blue.wav");
var green = new Buttons ("greenSq", "sounds/green.wav");
var playButton = document.getElementById("play")
var arr = [red,green,yellow,blue];
addButtonEventListeners(red, "red");
addButtonEventListeners(yellow, "yellow");
addButtonEventListeners(blue, "blue");
addButtonEventListeners(green, "green");
let startSequence = ["G","R","Y","Y","B","B","R","B","Y","Y","G","G"]

function playSequence(pattern){
 for(let i = 0; i < pattern.length; i++){
     if(pattern[i] == "R"){
         red.changeColor(true,"red");
         //red.changeColor(false,"red");
         setTimeout(120);
     }else if(pattern[i] == "G"){
        green.changeColor(true,"green");
       // green.changeColor(false,"green");
        setTimeout(120);
    }else if(pattern[i] == "B"){
        blue.changeColor(true,"blue");
       // blue.changeColor(false,"blue");
        setTimeout(120);
    }else if(pattern[i] == "Y"){
        yellow.changeColor(true,"yellow");
       // yellow.changeColor(false,"yellow");
        setTimeout(120);

    }
}
}
playButton.addEventListener("click", function(){
   var r = parseInt(document.getElementById("rounds").innerHTML);
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

