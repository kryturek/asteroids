class Boulder{
    constructor(x, y, m){
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass);
    }

    show(){
        strokeWeight(5);
        stroke(150, 120);
        fill(150, 210);
        ellipse(this.pos.x, this.pos.y, this.r*2);
    }
}