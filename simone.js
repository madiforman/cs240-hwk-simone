
class Buttons {
    constructor(elem, s, c,hC){
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
}
var red = new Buttons("redSq","sounds/red.wav");
var yellow = new Buttons ("yellowSq", "sounds/yellow.wav");
var blue = new Buttons ("blueSq", "sounds/blue.wav");
var green = new Buttons ("greenSq", "sounds/green.wav");
red.getElement().addEventListener("mousedown", function(){
  red.getElement().className = "lightred"; 
})
red.getElement().addEventListener("mouseup",function(){
    red.getElement().className = "red"; 
    red.playSoundFx();
})
yellow.getElement().addEventListener("mousedown",function(){
    yellow.getElement().className = "lightyellow";
})
yellow.getElement().addEventListener("mouseup",function(){
    yellow.getElement().className = "yellow"; 
    yellow.playSoundFx();
})
blue.getElement().addEventListener("mousedown", function(){
    blue.getElement().className = "lightblue"; 
 })
blue.getElement().addEventListener("mouseup",function(){
    blue.getElement().className = "blue"; 
    blue.playSoundFx();
})

green.getElement().addEventListener("mousedown", function(){
  green.getElement().className = "lightgreen"; 
})
green.getElement().addEventListener("mouseup",function(){
    green.getElement().className = "green"; 
    green.playSoundFx();
})
    

