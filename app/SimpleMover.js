class SimpleMover{
    constructor(x, y, r){
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.radius = r;
    }

    move(){

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show(){
        stroke(255);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, this.radius*2);
    }

    applyForce(force){
        // this.acc = force;
        this.acc.add(force);
    }

    constrain(width, height){
		if(this.pos.x<0 || this.pos.x>width || this.pos.y>height){
            // this.vel.mult(-1);
		}
		if(this.pos.x<0){
            this.pos.x = 0;
            this.vel.x *= -1;
        }
        if(this.pos.x>width){
            this.pos.x = width;
            this.vel.x *= -1;
        }
        if(this.pos.y>height){
            this.pos.y = height;
            this.vel.y *= -1;
        }
	}
}