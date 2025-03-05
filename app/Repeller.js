class Repeller{
    constructor(x, y, m){
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass);

        this.red = 100;
        this.green = 100;
        this.blue = 255;

        this.ember = 1;
    }

    repel(mover){
        let force = p5.Vector.sub(this.pos, mover.pos);
        let distanceSq = constrain(force.magSq(), 5000, 100000);
        // let distanceSq = force.magSq();

        // const G = 2;

        let strength = G * (this.mass * mover.mass) / distanceSq;

        force.setMag(-strength);
        mover.applyForce(force);
    }

    show(){
        strokeWeight(6);
        stroke(100, 100, 255, 120);
        fill(100, 100, 255, 75);
        ellipse(this.pos.x, this.pos.y, this.r*2);

        noStroke();
        for(let r = this.r * 2; r <= this.r * 10; r += 5){
            fill(this.red, this.green, this.blue, map(r, this.r * 2, this.r * 5, 10+this.ember/2, this.ember/2));
            ellipse(this.pos.x, this.pos.y, r * 2);
        }
    }




    spitOut() {
        let phase = 'growing';
        let interval = setInterval(() => {
            if(phase === 'growing'){
                this.ember++;
                if(this.ember >= 11){
                    phase = 'shrinking';
                }
            } else if(phase === 'shrinking'){
                this.ember--;
                if(this.ember <= 1){
                    this.ember = 1;
                    clearInterval(interval);
                }
            }
        }, 67);
    }
}