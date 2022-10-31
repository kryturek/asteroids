class Walker{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.rgb = createVector(random(255), random(255), random(255));
        // this.prev = this.pos.copy();
        this.step = createVector(0, 0.1);
    }

    walk(){
        if(random(10000)<1){
            this.step = p5.Vector.random2D().mult(0.1);
        }

        // if(random(1000)<1){
        //     this.step.mult(100);
        // }

        this.pos.add(this.step);
    }

    constrain(width, height){
        if(this.pos.x<0){
            this.pos.x = width;
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

    show(){
        stroke(this.rgb.x, this.rgb.y, this.rgb.z, 18);
        point(this.pos.x, this.pos.y);
        // stroke(this.rgb.x, this.rgb.y, this.rgb.z, 10);
        // line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
        // this.prev.set(this.pos);
    }
}