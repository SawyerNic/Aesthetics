const main = document.querySelector("#main");
const alt = document.querySelector("#alt");

const createSVG = (width, height) => {

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

createSVG2 = (width, height) => {

    return `
      <svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="none" stroke="black" />
        ${
            drawCircle(30,30,17)+
            drawCircle(20,50,15)+
            drawCircle(45,50,15)+
            drawEllipse(65,70,10,10) +
            drawEllipse(20,60,10,10) +
            drawLine(10,10,90,90) +
            drawPolygon(90,70,70,90,30,40) +
            drawPolygon(5,60,20,10,70,40) +
            drawCircle(80,70,15)
        }
      </svg>`;
}

const drawFillSquare = (x, y, width, height, color, angle=0, opacity=1) => {

    let sqrString = ``;
    
    for(let i = width; i > 0; i--) {
        sqrString += drawRect(x-(i/2), y-(i/2), i, i, color, angle);
    }

  return `<g transform="rotate(${angle},${x},${y})", opacity="${opacity}">${sqrString}</g>`;
}

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


main.outerHTML = createSVG(100, 100);
alt.outerHTML = createSVG2(100, 100);
