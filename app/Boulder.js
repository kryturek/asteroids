class Boulder{
    constructor(x, y, m, shade){
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass);
        this.shade = shade;
    }


    show(){
        push();
        // Use the 2D drawing context to define one composite path.
        let ctx = drawingContext;
        ctx.beginPath();
        // Main body ellipse.
        ctx.ellipse(this.pos.x, this.pos.y, this.r, this.r, 0, 0, Math.PI * 2);
        // Decoration ellipses.
        for (let i = 0; i < 10; i++) {
            let angle = (TWO_PI / 10) * i + (this.mass % TWO_PI);
            let distance = this.r * (0.66 + ((this.mass + i) % 20) / 100);
            let xOffset = cos(angle) * distance;
            let yOffset = sin(angle) * distance;
            ctx.ellipse(this.pos.x + xOffset, this.pos.y + yOffset, this.r * 0.25, this.r * 0.25, 0, 0, Math.PI * 2);
        }
        // Convert p5 color values to CSS rgba strings.
        let fillCol = color(this.shade, 255);
        let strokeCol = color(this.shade, 220);
        ctx.lineWidth = 0;
        ctx.fillStyle = 'rgba(' + red(fillCol) + ',' + green(fillCol) + ',' + blue(fillCol) + ',' + (alpha(fillCol) / 255) + ')';
        ctx.strokeStyle = 'rgba(' + red(strokeCol) + ',' + green(strokeCol) + ',' + blue(strokeCol) + ',' + (alpha(strokeCol) / 255) + ')';
        // Fill and stroke the entire shape.
        ctx.fill();
        ctx.stroke();
        pop();
    }
    }
