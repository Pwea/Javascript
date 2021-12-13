//Constants
const NUMBER_OF_VERTICES = 4;
const PADDING            = 30;
const HUMAN_PLAYER       = "Human"
const COMPUTER_PLAYER    = "Computer"
const DRAW               = "Draw"

//GLOBALS
var ctx;
var width, height;

var currentPlayer = HUMAN_PLAYER;

var statusDiv, currPlyrDiv, resultDiv;

var vertices = new Array();
var edges    = new Array();

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

    width = theCanvas.width;
    height = theCanvas.height;

    statusDiv = document.getElementById("status");
    currPlyrDiv = document.getElementById("currPlyr");
    resultDiv = document.getElementById("result");

    //Initialize the Vertices
    let x = PADDING;
    let y = PADDING;
    let iX = (width - (PADDING*2)) / (NUMBER_OF_VERTICES-1);
    let iY = (height - (PADDING*2)) / (NUMBER_OF_VERTICES-1);
    for(let i=0; i<NUMBER_OF_VERTICES; i++) {
        vertices[i] = new Array();
        for(let j=0; j<NUMBER_OF_VERTICES; j++) {
            let aVertex = new Vertex(x, y);
            vertices[i][j] = aVertex;

            x += iX;
        }
        x = PADDING;
        y += iY;
    }

    //Initialize the Edges
    for(let i=0; i<vertices.length; i++) {
        for(let j=0; j<vertices[i].length; j++) {
            let vert = vertices[i][j];
            let rightVert = undefined;
            if( i+1 < vertices.length ) {
                rightVert = vertices[i+1][j];
            }
            let bottomVert = undefined;
            if( j+1 < vertices[i].length ) {
                bottomVert = vertices[i][j+1];
            }

            let x1 = vert.x;
            let y1 = vert.y;
 
            if( rightVert !== undefined ) {
                let x2 = rightVert.x;
                let y2 = rightVert.y;
                let edge1 = new Edge(x1, y1, x2, y2);
                edges.push(edge1);
            }
 
            if( bottomVert !== undefined ) {
                x2 = bottomVert.x;
                y2 = bottomVert.y;
                let edge2 = new Edge(x1, y1, x2, y2);
                edges.push(edge2);
            }
        }
    }

    let fontSize = parseInt(iX / 5);
    fontSize = fontSize < 12 ? 12 : fontSize;
    ctx.font = fontSize + "px sans-Serif";

    updateStatus("Playing", currentPlayer, "");

    render();
});

function resetBoard() {
    currentPlayer = HUMAN_PLAYER;
    for(let i=0; i<boxes.length; i++) {
        for(let j=0; j<boxes[i].length; j++) {
            boxes[i][j].reset();
        }
    }

    updateStatus("Playing", currentPlayer, "");
    render();
}

function doComputerMove() {
    if( currentPlayer == HUMAN_PLAYER ) {
        return;
    }

    updateStatus("Playing", currentPlayer, "");
}

function render() {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
 
    ctx.fillStyle = "#550000";
    for(let i=0; i<vertices.length; i++) {
        for(let j=0; j<vertices[i].length; j++) {
            let aVertex = vertices[i][j];
            aVertex.render(ctx);
        }
    }

    ctx.fillStyle = "#AA5555";
    for(let i=0; i<edges.length; i++) {
        let anEdge = edges[i];
        anEdge.render(ctx);
    }
}

function updateStatus(status, currPlayer, whoWon) {
    statusDiv.innerHTML = status;
    currPlyrDiv.innerHTML = currPlayer;
    resultDiv.innerHTML = whoWon;
}
