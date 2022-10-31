var x, y, tile;
var redNoise, greenNoise, blueNoise;
var randomRed;
var randomGreen;
var randomBlue;

function setup() {
  createCanvas(600, 600);
  
  x = width/2;
  y = height/2;
  tile = width/100;
  
  randomRed = random(100);
  randomGreen = random(100);
  randomBlue = random(100);
  
  background(51);
}

function draw() {
  
  redNoise = map(noise(randomRed), 0, 1, 0, 255);
  greenNoise = map(noise(randomGreen), 0, 1, 0, 255);
  blueNoise = map(noise(randomBlue), 0, 1, 0, 255);

  fill(redNoise, greenNoise, blueNoise);
  // noStroke();
  rect(x, y, tile, tile);

  var r = Math.floor(random(4));

  switch(r){
    case 0:
      x-=tile; 
      if(x<0){
        x=width-tile;
      }
      break;
    case 1:
      y-=tile; 
      if(y<0){
        y=height-tile;
      }
      break;
    case 2:
      x+=tile;
      if(x>width){
        x=0;
      }
      break;
    case 3:
      y+=tile; 
      if(y>height){
        y=0;
      }
      break;
  }

  randomRed+=0.003;
  randomGreen+=0.003;
  randomBlue+=0.003;
}
