const main = document.querySelector("#main");

const createSVG = (width, height) => {

    let myRot = rotate(30,"square",{x:50,y:50})

    console.log(myRot);

  return `
    <svg width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="none" stroke="black" />
        ${
            drawFillSquare(12, 45, 20, 20, "firebrick", 5) +
            drawFillSquare(22, 18, 20, 20, "#551625", 60) +
            drawFillSquare(36, 17, 20, 20, "#BB2A2D", 88, .98) +
            drawFillSquare(20, 31, 20, 20, "#E84139", 45) +
            drawFillSquare(58, 52, 20, 20, "#551625", 5) +
            drawFillSquare(49, 57, 20, 20, "#551625", 63) +
            drawFillSquare(48, 35, 20, 20, "#E84139", 78) +
            drawFillSquare(60, 73, 20, 20, "#BB2A2D", 45) +
            drawFillSquare(73, 74, 20, 20, "#d70000", 12) 
            
        }
        

    </svg>
  `;
}

const drawSquareGrid = (rows, columns, square, transforms, randMag, spacing) => {

}

const drawFillSquare = (x, y, width, height, color, angle=0, opacity=1) => {

    let sqrString = ``;
    
    for(let i = width; i > 0; i--) {
        sqrString += drawRect(x-(i/2), y-(i/2), i, i, color, angle);
    }

  return `<g transform="rotate(${angle},${x},${y})", opacity="${opacity}">${sqrString}</g>`;
}

const rotate = (degrees, obj, point={x:0,y:0}) => ({
   type: 'rotation',
   degrees,
   point,
   object: obj 
});

const translate = (offsetX, offsetY) => ({
    offsetX,
    offsetY
});

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
}

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
}

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


main.outerHTML = createSVG(500, 500);
