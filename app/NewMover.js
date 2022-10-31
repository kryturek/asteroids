class NewMover{
    constructor(x, y, m, autogenerated=false){
        this.INIT_VEL = 2;
        this.pos = createVector(x, y);
        if(autogenerated){
            this.vel = createVector(0, 0);
        } else {
            this.vel = createVector(random(-this.INIT_VEL, this.INIT_VEL), random(-this.INIT_VEL, this.INIT_VEL));
        }
        this.acc = createVector(0, 0);
        this.mass = m;
        this.r = sqrt(this.mass);

        this.red = random(100, 255);
        this.green = random(100, 255);
        this.blue = random(100, 255);

        this.path = [];
    }

    move(){
        this.prevPos = this.pos.copy();
        if(this.path.length > 10){
            this.path.shift();
            this.vel.add(this.acc);
        }
        this.path.push(this.pos.copy());

        if(p5.Vector.sub(this.pos, this.path[9] == 0)){
            // this.vel.set(random(-5, 5), random(-5, 5));
        }

        this.pos.add(this.vel);
        this.acc.set(0, 0);

        // this.tailVector = p5.Vector.sub(this.pos, prevPos);
    }

    applyForce(force){
        let prev = force.copy();
        force.div(this.mass);
        this.acc.add(force);
        force.set(prev);
    }

    constrain(width, height){
        if(this.pos.y+this.r>height){
            this.pos.y = height-this.r;
            this.vel.y *= -1;
        }
        if(this.pos.y-this.r<0){
            this.pos.y = this.r;
            this.vel.y *= -1;
        }
        if(this.pos.x-this.r<0){
            this.pos.x = this.r;
            this.vel.x *= -1;
        }
        if(this.pos.x+this.r>width){
            this.pos.x = width-this.r;
            this.vel.x *= -1;
        }
    }

    friction(){
        // F = -1 * mu * N * v^
        const mu = 0.03;
        let normalForce = this.mass;
        let friction = this.vel.copy();
        friction.normalize();
        friction.mult(-1);

        friction.setMag(mu * normalForce);

        this.applyForce(friction);
    }


    show(){
        noStroke();

        fill(this.red, this.green, this.blue);
        ellipse(this.pos.x, this.pos.y, this.r*2);

        //tail
        for(let i=1; i<this.path.length; i++){
            strokeWeight(this.r/10+i);
            stroke(this.red, this.green, this.blue, 10+4*i);
            line(this.path[i].x, this.path[i].y, this.path[i-1].x, this.path[i-1].y);
        }
    }
}