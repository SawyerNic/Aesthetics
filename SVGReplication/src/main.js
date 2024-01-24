const main = document.querySelector("#main");

const createSVG = (width, height) => {

  return `
    <svg width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="none" stroke="black" />
        ${drawSquare(10, 10, 20, 20, "red", 5)}
        ${drawSquare(5, 5, 20, 20, "red", 5)}
    </svg>
  `;
}

const drawSquare = (x, y, width, height, color, angle=0) => {

    //I have to add it all to a concatinated string
    let sqrString = ``;
    
    for(let i = width; i > 0; i--) {
        console.log(i);
        sqrString += drawRect(x+i, y+i, i, i, color, angle);
    }
    console.log(sqrString);

  return sqrString;
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
    </path>`;
}
// 

main.outerHTML = createSVG(100, 100);