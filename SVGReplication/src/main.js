const main = document.querySelector("#main");

const createSVG = (width, height) => {

  return `
    <svg width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="none" stroke="black" />
        ${drawFillSquare(50, 20, 20, 20, "red", 5)}
    </svg>
  `;
}

const drawFillSquare = (x, y, width, height, color, angle=0) => {

    //I have to add it all to a concatinated string
    let sqrString = ``;
    
    for(let i = width; i > 0; i--) {
        console.log(i);
        sqrString += drawRect(x-(i/2), y-(i/2), i, i, color, angle);
    }
    console.log(sqrString);

  return `<g>${sqrString}</g>`;
}

const drawRect = (x, y, width, height, color) => {
    return `
    <path 
        fill="none"
        stroke="${color}"
        d="
        M${x}, ${y}
        L${x + width}, ${y}
        L${x + width}, ${y + height}
        L${x}, ${y + height}
        z"
    />`;
}
// 

main.outerHTML = createSVG(100, 100);