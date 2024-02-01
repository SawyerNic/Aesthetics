const main = document.querySelector("#main");

const canvasWidth = 500;
const canvasHeight = 500;

const createSVG = (width, height) => {
    const skewed = new Geometry(0,0,50,50,"black",0,1);
    console.log(skewed);
    let prect = new polyRect(0,0,50,50);

    let grid = new drawGrid(0,0,10,10,50,50,10,10);
  return `
    <svg width="${width}" height="${height}">
        <rect width="${width}"
         height="${height}" 
         fill="none" 
         stroke="black" 
        />
        
        ${prect.draw()}
        ${grid.draw()}

    </svg>
  `;
}

let objArr = [];

function r() {
    return Math.random()*4-2;
}

class DesShape {
    constructor(geo, transforms, appearence) {
        this.geo = geo;
        this.transforms = transforms;
        this.appearence = appearence;
    }

    draw = () => {
    }
}

let vector = {
    x: 0,
    y: 0
}

let rotate = {
    point: vector,
    angle: 0,
}

let scale = {
    mag: 1,
}

class Transforms {
    constructor(translate, rotate, scale) {
        this.tr = translate;
        this.rot = rotate;
        this.sc = scale;
    }

    get translate() {
        return this.tr;
    }

    set translate(value) {
        this.tr = value;
    }

    get rotate() {
        return this.rot;
    }

    set rotate(value) {
        this.rot = value;
    }

    get scale() {
        return this.sc;
    }

    set scale(value) {
        this.sc = value;
    }
}

class Appearence {
    constructor(color, opacity, stroke, strokeWidth) {
        this.col = color;
        this.op = opacity;
        this.str = stroke;
        this.strWidth = strokeWidth;
    }

    get color() {
        return this.col;
    }

    set color(color) {
        this.col = color;
    }

    get opacity() {
        return this.op;
    }

    set opacity(opacity) {
        this.op = opacity;
    }

    get stroke() {
        return this.str;
    }

    set stroke(stroke) {
        this.str = stroke;
    }

    get strokeWidth() {
        return this.strWidth;
    }

    set strokeWidth(strokeWidth) {
        this.strWidth = strokeWidth;
    }
}

class Geometry {
    constructor(pos, size) {
        this.pos = pos;
        this.s = size;
    }

    get position() {
        return this.pos;
    }

    set position(value) {
        this.pos = value;
    }

    get size() {
        return this.s;
    }

    set size(value) {
        this.s = value;
    }
}


class drawGrid {
    constructor(startX, startY, cols, rows, colWidth=0, rowHeight=0) {
        this.startX = startX;
        this.startY = startY;
        this.cols = cols;
        this.rows = rows;
        this.colWidth = colWidth;
        this.rowHeight = rowHeight;
        this.drawStr = ``;
        
    }

    

    draw = () => {
        for(let i = 0; i < this.cols; i++) {
            for(let j = 0; j < this.rows; j++){
                //let obj = new polySpiral(this.startX + (i*this.colWidth), this.startY + (j*this.rowHeight), this.colWidth)//
                let obj = new polyRect(this.startX + (i*this.colWidth), this.startY + (j*this.rowHeight), this.colWidth, this.rowHeight);
                this.drawStr += obj.draw();
                this.drawStr += polySpiral(this.startX + (i*this.colWidth), this.startY + (j*this.rowHeight), this.colWidth);
                objArr.push(obj);
            }
        }

        return `<g>${this.drawStr}</g>`;
    }
}

const polySpiral = (x,y,size) => {
    let psStr = ``;
    let s = size;

    let randInt = Math.floor(Math.random()*10);
    for(let i = 0; i < randInt + randInt; i++){
        let spir = new polyRect(x+(i*2.5), y+(i*2.5), s, s);
        psStr += spir.draw();
        s -= (size)/(10);
    }

    return `<g>${psStr}</g>`;
}


class polyRect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw = () => {
        console.log("drawing");
        return `
        <polyline
            stroke="black"
            fill="none"
            points="
            ${this.x}, ${this.y}
            ${this.x + r() + this.width}, ${this.y + r()}
            ${this.x + r() + this.width}, ${this.y + r() + this.height}
            ${this.x}, ${this.y + r() + this.height}
            ${this.x}, ${this.y}"
        />`
    };
}


const drawRow = (startX, startY, squareFun, spacing, color, angle=0, opacity=1) => {
    let sqrString = ``;
    let unitX = startX;
    
    for(let i = 0; i < 10 ; i++) {
        sqrString += squareFun(unitX, startY, 50, 50, color, angle, opacity);
        unitX += spacing;
    }
  return `<g>${sqrString}</g>`;
}

const drawSquareGrid = (columns, square, transforms, randMag, spacing) => {
    for(let i = 0; i < columns; i++) {
        drawSquareRow(i*spacing, 0, square, square, "black", 0, 1);
    }
}

const drawFillSquare = (x, y, width, height, color, angle=0, opacity=1) => {

    let sqrString = ``;
    
    for(let i = width; i > 0; i--) {
        sqrString += drawRect(x-(i/2), y-(i/2), i, i, color, angle);
    }

  return `<g transform="rotate(${angle},${x},${y})", opacity="${opacity}">${sqrString}</g>`;
};


const drawRect = (x, y, width, height, color) => {
    return `
    <path 
        fill="none"
        stroke=${color}
        d="
        M${x}, ${y}
        L${x + width}, ${y}
        L${x + width}, ${y + height}
        L${x}, ${y + height}
        z"
    />`;
};




const drawCircle = (x,y,r) => {
    return `
    <path 
        fill="none"
        stroke="red"
        d="
        M ${x+r} ${y}
        C ${x+r}, ${y+r*1.4}, ${x-r}, ${y+r*1.4}, ${x-r}, ${y}
        C ${x-r}, ${y-r*1.4}, ${x+r}, ${y-r*1.4}, ${x+r}, ${y}"
        stroke="black"
    />`;
}

const drawEllipse = (x,y,r,h) => {
    return `
    <path 
        fill="none"
        stroke="red"
        d="
        M ${x+r} ${y}
        C ${x+r}, ${y+r+h}, ${x-r}, ${y+r+h}, ${x-r}, ${y}
        C ${x-r}, ${y-(r+h)}, ${x+r}, ${y-(r+h)}, ${x+r}, ${y}"
        stroke="black"
    />`;
};

const drawLine = (x1,y1,x2,y2) => {
    return `
    <path 
        fill="none"
        stroke="red"
        d="
        M ${x1} ${y1}
        L ${x2} ${y2}"
    />`;
}

const drawPolygon = (x,y,x1,y1,x2,y2) => {
    return `
    <path 
        fill="none"
        stroke="red"
        d="
        M ${x}, ${y}
        L ${x1}, ${y1}
        L ${x2}, ${y2}
        z"
    />`;
}


main.outerHTML = createSVG(canvasWidth, canvasHeight);
