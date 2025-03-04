const EQUALITY_COEFFICIENT = 0.2;
let G = 0.3;
let attractors = [];
let repellers = [];
let boulders = [];
let movers = [];
let mouseVector;
let info;
let entityInfo;
let walls = false;
let showHelp = false;
let pause = false;
let walkers = [];

document.oncontextmenu = () => {
  return false;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  info = loadStrings('./info.txt');
  entityInfo = loadStrings('./entityInfo.txt');


  attractors.push(new Attractor(width*0.15, height*0.34, 500));
  repellers.push(new Repeller(width*0.85, height*0.65, 500));
  movers.push(new NewMover(100, 100, 4));
  for(let i=0; i<8; i++){
    movers.push(new NewMover(random(width/2), random(height/2), random(4, 150)));
  }
  for(let i=0; i<5; i++){
    boulders.push(new Boulder(random(width/2)+width/4, random(height), random(1500, 3000)));
  }
  for(let i=0; i<100; i++){
    walkers.push(new Walker(random(width), random(height)));
  }
}

function draw() {
  background(0, 21, 31);

  noStroke();
  fill(180);
  if(showHelp){
    for(let i=0; i<info.length; i++){
      text(info[i], 10, 10+15*i, 300, 300);
    }
    for(let j=0; j<entityInfo.length; j++){
      text(entityInfo[j], width-350, (height-255)+15*j, 500, 500);
    }
  } else {
    text('H - Show help', 10, 20);
  }
  
  textSize(24);
  if(G<0){
    strokeWeight(3);
    stroke(255, 50, 0);
  }
  text("Gravitational force: " + floor(G*10), 15, height-30);
  textSize(12);
  
  walkers.forEach(element => {
    element.show();
    element.walk();
    element.constrain(width, height);
  })

  movers.forEach(element => {
    element.move();
    element.show();

    if ((mouseIsPressed && mouseButton === RIGHT) || keyIsDown(BACKSPACE)) {
      if (checkMouseCollision(element)) {
        let index = movers.indexOf(element);
        movers.splice(index, 1);
      }
    }

    if(walls){
      element.constrain(width, height);

      strokeWeight(1);
      stroke(255, 100, 100);
      fill(255);
      textSize(24);
      text('Walls ON', width-120, 45);
      textSize(12);
    }
    
    //save ram
    // if(element.r < 0.5){
      //   let index = movers.indexOf(element);
      //   movers.splice(index, 1);
      // }

    attractors.forEach(attractor => {
      attractor.attract(element);
      if(checkCollision(element, attractor)){
        let index = movers.indexOf(element);
        let newMass = pow(element.r, 2) / 2;
        movers.splice(index, 1);
        if(repellers.length > 0){
          let randomRepellerIndex = floor(random(repellers.length));
          movers.push(
            new NewMover(
              repellers[randomRepellerIndex].pos.x+(random([-repellers[randomRepellerIndex].r, repellers[randomRepellerIndex].r])), 
              repellers[randomRepellerIndex].pos.y+(random([-repellers[randomRepellerIndex].r, repellers[randomRepellerIndex].r])), 
              newMass,
              true
            )
          );
          if(newMass>1){
            movers.push(
              new NewMover(
                repellers[randomRepellerIndex].pos.x+(random([-repellers[randomRepellerIndex].r, repellers[randomRepellerIndex].r])), 
                repellers[randomRepellerIndex].pos.y+(random([-repellers[randomRepellerIndex].r, repellers[randomRepellerIndex].r])), 
                newMass,
                true
              )
            );
          }
        }
      }
    });
    repellers.forEach(repeller=>{
      repeller.repel(element);
    })

    boulders.forEach(boulder => {
      if(checkCollision(element, boulder)){
        element.pos.set(element.prevPos);
        element.vel.mult(-0.5);
      }
    })
    movers.forEach(other => {
      if(element!==other){
        if(checkCollision(element, other)){
          let radiusDiff = Math.abs(element.r - other.r);
          let radiusAvg = element.r + other.r;
          
          if(radiusDiff/radiusAvg > EQUALITY_COEFFICIENT){
            let newRadius = sqrt(pow(element.r, 2) + pow(other.r, 2));

            //ternary logic line
            element.r > other.r ? element.r = newRadius : other.r = newRadius;
  
            let smaller = element.r < other.r ? element : other;
            let index = movers.indexOf(smaller);
            movers.splice(index, 1);
          }
        }
      }
    })

  });//movers.forEach(element) end

  attractors.forEach(element => {
    element.show();
    if ((mouseIsPressed && mouseButton === RIGHT) || keyIsDown(BACKSPACE)) {
      if (checkMouseCollision(element)) {
        let index = attractors.indexOf(element);
        attractors.splice(index, 1);
      }
    }
  })

  repellers.forEach(element => {
    element.show();
    if ((mouseIsPressed && mouseButton === RIGHT) || keyIsDown(BACKSPACE)) {
      if (checkMouseCollision(element)) {
        let index = repellers.indexOf(element);
        repellers.splice(index, 1);
      }
    }
  })

  boulders.forEach(element => {
    element.show();
    if ((mouseIsPressed && mouseButton === RIGHT) || keyIsDown(BACKSPACE)) {
      if (checkMouseCollision(element)) {
        let index = boulders.indexOf(element);
        boulders.splice(index, 1);
      }
    }
  })

} // end of draw()

function checkCollision(moverA, moverB){
  let distance = p5.Vector.sub(moverA.pos, moverB.pos);
  let radii = moverA.r + moverB.r;
  if(distance.mag()<radii){
    return distance.mag();
  }
}

function checkMouseCollision(element){
  let mousePos = createVector(mouseX, mouseY);
  let distance = p5.Vector.sub(element.pos, mousePos);
  if(distance.mag()<element.r){
    return true;
  }
}

function mouseClicked(){
  movers.push(new NewMover(mouseX, mouseY, random(5, 30)));
}

function mouseWheel(ev){
  if(ev.delta>0){
    G+=0.1;
  }else if(ev.delta<0){
    G-=0.1;
  }
}

function keyTyped(){
  if(key === "a" || key === "A"){
    attractors.push(new Attractor(mouseX, mouseY, random(200, 600)));
  }
  if(key === "r" || key === "R"){
    repellers.push(new Repeller(mouseX, mouseY, random(200, 600)));
  }
  if(key === "b" || key === "B"){
    boulders.push(new Boulder(mouseX, mouseY, random(1000, 3000)));
  }
  if(key === "c" || key === "C"){
    walls ? walls=false : walls=true;
  }
  if((key === "p" || key === "P") && isLooping()){
    noLoop();
  } else if (isLooping()==false){
    loop();
  }
  if(key === "h" || key === "H"){
    showHelp ? showHelp = false : showHelp = true;
  }

  if (key === "f" || key === "F") {
    let fs = fullscreen();
    fullscreen(!fs);
    setTimeout(() => {
      if (fullscreen()) {
        resizeCanvas(windowWidth, windowHeight);
      } else {
        resizeCanvas(1200, 800);
      }
    }, 100); // Slight delay to allow fullscreen transition
  }
}