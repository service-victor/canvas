let chosenTileType = "plain";

function setTileType(type) {
    
  chosenTileType = type;
  console.log(chosenTileType);
}

let city_canvas = document.getElementById("canvas");
let city_canvas_context = city_canvas.getContext("2d");

city_canvas.addEventListener("click", function (e) {
  console.log(tile_finder(e.offsetX, e.offsetY));
  let clickedTile = tile_finder(e.offsetX, e.offsetY);
  if (clickedTile.type === "plain" || chosenTileType === "demolish") {
    clickedTile.type = chosenTileType;
  }

  
});

function tile_finder(x_position, y_position) {
  for (let i = 0; i < board.blocks.length; i++) {
    if (
      board.blocks[i].x < x_position &&
      board.blocks[i].x + board.width > x_position &&
      board.blocks[i].y < y_position &&
      board.blocks[i].y + board.height > y_position
    ) {
      return board.blocks[i];
    }
  }
}

class Tile {
  constructor(x, y, height, width, type) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.type = type;
    // this.image = new Image();
    // this.image.src = imageSrc;
    
  }

  draw() {
    switch (this.type) {
        case "water":
          this.color = "blue";
          this.isDemolishable = false
          this.cost = 10
          break;
        case "road":
          this.color = "gray";
          this.isDemolishable = true
          this.cost = 10
          break;
        case "residential":
          this.color = "lightgreen";
          this.isDemolishable = false
          this.cost = 10
          break;
        case "commercial":
          this.color = "lightblue";
          this.isDemolishable = false
          this.cost = 10
          break;
        case "industrial":
          this.color = "yellow";
          this.isDemolishable = false
          this.cost = 10
          break;
        default:
          this.type = "plain"
          this.color = "green";
          this.cost = 10

      }
    
    city_canvas_context.lineWidth = 1;
    city_canvas_context.fillStyle = this.color;
    city_canvas_context.strokeStyle = "black";
    city_canvas_context.fillRect(this.x, this.y, this.width, this.height);
    city_canvas_context.strokeRect(this.x, this.y, this.width, this.height);
  }
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.blocks = [];
    
    for (let i = 0; this.y < city_canvas.height; i++) {
      for (let i = 0; this.x < city_canvas.width; i++) {
        let block;
        if (Math.random() < 0.91) {
          block = new Tile(this.x, this.y, this.height, this.width, "plain");
        } else {
          block = new Tile(this.x, this.y, this.height, this.width, "water");
        }
        this.blocks.push(block);
        this.x += this.width;
      }
      this.y += this.height;
      this.x = 0;
    }
  }
  draw() {
    for (let b = 0; b < this.blocks.length; b++) {
      this.blocks[b].draw();
    }
  }
    
}

let board = new Grid(70, 70);

window.setInterval(function () {
  board.draw();
}, 140);


console.log(board.blocks)




function btnClick(){
  var timesClicked = 0;
const type = ["plain", "water", "road", "residential", "commercial", "industrial"]
for (let i = 0; i < type.length; i++) {
    let count = board.blocks.filter((obj) => obj.type === type[i]).length;
    console.log(count)
    let total_count = 0
    total_count = total_count + count
    
}

  timesClicked = board.blocks.cost * total_count
  console.log(timesClicked)
  document.getElementById('timesClicked').innerHTML = timesClicked;
  return true
}

