class Attractor{
    constructor(x, y, m){
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass);

        this.red = 255;
        this.green = 100;
        this.blue = 100;
    }

    attract(mover){
        let force = p5.Vector.sub(this.pos, mover.pos);
        let distanceSq = constrain(force.magSq(), 100, 10000);
        // let distanceSq = force.magSq();

        // const G = 5;

        let strength = G * (this.mass * mover.mass) / distanceSq;
        // force.normalize();
        // mover.acc.add(force);

        force.setMag(strength);
        mover.applyForce(force);
    }

    show(){
        strokeWeight(8);
        stroke(255, 60, 60, 80);
        fill(this.red, this.green, this.blue, 75);
        ellipse(this.pos.x, this.pos.y, this.r*2);
    }

    suckIn(){
        do{
            this.red--;
            this.green--;
            this.blue--;
        } while (this.green > 100);

        // do{
        //     this.red += 10;
        //     this.green += 3;
        //     this.blue += 3;
        // } while (this.red < 250);

        // this.red = 255;
        // this.green = 100;
        // this.blue = 100;
    }
}