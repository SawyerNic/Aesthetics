const main = document.querySelector("#main");

let strokeWidth = 1;
let canvasHeight = 500;
let canvasWidth = 500;
let strokeColor = "black";
let fillColor = "none";
let resultStr = ``;

const createSVG = (width, height) => {

    strokeColor = 'gold'
    for(let i = 0; i < 500; i++){
        
        resultStr += drawLine(0, i, 500, i);
    }

    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 15; j++){
            strokeColor = 'black'
        resultStr += kite(i*30,54*j,30);
        resultStr += kite(i*30+15,54*j+27,30);
        }
    }
    
    console.log(`
    <svg width="${width}" height="${height}">
        ${resultStr}
    </svg>
  `)
    return `
    <svg width="${width}" height="${height}">
        ${resultStr}
    </svg>
  `;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const kite = (x,y,s) => {

    let kx = x;
    let ky = y;
    let size = s;

    strokeColor = 'black'
    strokeWidth = 2;


    let result = ``;
    result += drawLine(kx, ky, kx+size/2, ky-size/3);
    let mid0 = new point(kx+size/4, ky-size/6);
    result += drawLine(kx+size/2, ky-size/3, kx+size, ky);
    let mid1 = new point(kx+size*(3/4), ky-size/6);
    result += drawLine(kx+size, ky, kx+size, ky+size*(5/9));
    let mid3 = new point(kx+size, ky+size*(3/10));
    //result += drawLine(kx+size, ky+size*(5/9), kx+size/2, ky+size*(8/9));
    let mid4 = new point(kx+size*(3/4), ky+size*(13/18));
    //result += drawLine(kx+size/2, ky+size*(8/9), kx, ky+size*(5/9));
    let mid5 = new point(kx+size/4, ky+size*(13/18));
    //result += drawLine(kx, ky+size*(5/9), kx, ky);
    let mid6 = new point(kx, ky+size*(3/10));

    let arr = [mid0, mid1, mid3, mid4, mid5, mid6];
    shuffleArray(arr);

    let pattern;
    strokeWidth = 1.5

    for(let i = 0; i < arr.length; i++){
        strokeColor = 'red'
        pattern = Math.floor(Math.random() * 3) + 1;
        result += drawLine(arr[i].x, arr[i].y, arr[(i+1)%pattern].x, arr[(i+1)%pattern].y);
    }
    strokeColor = 'black'
    return `<g>${result}</g>`;
}

class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const drawLine = (startX, startY, endX, endY) => {
    let result = ``;
    result += `
    <polyline
        stroke-width="${strokeWidth}"
        stroke="${strokeColor}"
        fill="${fillColor}"
        points="
        ${startX} ${startY},
        ${endX} ${endY}"
    />`
    return result;
}

document.querySelector('#download').addEventListener('click', function() {
    let svg = document.querySelector('svg'); // Select the SVG element
    let serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    let url = URL.createObjectURL(new Blob([source], {type: "image/svg+xml"}));

    let link = document.createElement("a");
    link.href = url;
    link.download = "download.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

main.outerHTML = createSVG(canvasWidth, canvasHeight);