class Mover {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.vel.mult(random(3));
	}
	
	update() {
		let mouse = createVector(mouseX, mouseY);
		this.acc = p5.Vector.sub(mouse, this.pos);
		this.acc.setMag(0.15);

		this.vel.add(this.acc);
		this.vel.limit(10);

		this.pos.add(this.vel);
	}

	show(){
		stroke(255);
		strokeWeight(2);
		this.fillColor = map(this.vel.x+this.vel.y, 0, 10, 0, 255);

		fill(this.fillColor, 100);
		ellipse(this.pos.x, this.pos.y, 32);
	}

	constrainWithMagicWalls(width, height){
        if(this.pos.x<0){
            this.pos.x = width;
			// this.vel.mult(-1);
        }
        if(this.pos.x>width){
            this.pos.x = 0;
        }
        if(this.pos.y<0){
            this.pos.y = height;
        }
        if(this.pos.y>height){
            this.pos.y = 0;
        }
    }

	constrainWithSolidWalls(width, height){
		if(this.pos.x<0 || this.pos.x>width || this.pos.y<0 || this.pos.y>height){
			this.vel.mult(-1);
		}
		if(this.pos.x<0){
            this.pos.x = 0;
        }
        if(this.pos.x>width){
            this.pos.x = width;
        }
        if(this.pos.y<0){
            this.pos.y = 0;
        }
        if(this.pos.y>height){
            this.pos.y = height;
        }
	}
}
