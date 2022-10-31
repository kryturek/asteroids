class Repeller{
    constructor(x, y, m){
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass);
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
    }
}