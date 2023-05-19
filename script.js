let chosenTileType = "plain";
let tileCost = 0;

function setTileType(type) {
  chosenTileType = type;
  switch (chosenTileType) {
    case "demolish":
      tileCost = 30;
      break;
    case "road":
      tileCost = 40;
      break;
    case "residential":
      tileCost = 400;
      break;
    case "commercial":
      tileCost = 500;
      break;
    case "industrial":
      tileCost = 1000;
      break;
    case "eps":
      tileCost = 1100;
      break;
    default:
      break;
  }
  console.log(chosenTileType);
}

let city_canvas = document.getElementById("canvas");
let city_canvas_context = city_canvas.getContext("2d");

city_canvas.addEventListener("click", function (e) {
  console.log(tile_finder(e.offsetX, e.offsetY));
  let clickedTile = tile_finder(e.offsetX, e.offsetY);
  if (clickedTile.isDemolishable === true) {
    if (clickedTile.type === "plain" || chosenTileType === "demolish") {
      if (money >= tileCost) {
        clickedTile.type = chosenTileType;
        moneyFunction(-tileCost);
      }
    }
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
  }

  draw() {
    switch (this.type) {
      case "water":
        this.color = "blue";
        this.isDemolishable = false;
        break;
      case "road":
        this.color = "gray";
        this.isDemolishable = true;
        break;
      case "residential":
        this.color = "lightgreen";
        this.isDemolishable = true;
        break;
      case "commercial":
        this.color = "lightblue";
        this.isDemolishable = true;
        break;
      case "industrial":
        this.color = "yellow";
        this.isDemolishable = true;
        break;
      case "eps":
        this.color = "orange";
        this.isDemolishable = true;
        break;
      default:
        this.type = "plain";
        this.color = "green";
        this.isDemolishable = true;
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

console.log(board.blocks);

let money = 7000;

function moneyFunction(buy) {
  money = money + buy;
  document.getElementById("money").innerHTML = money;
  if (money < 0) {
    document.getElementById("game status").innerHTML =
      "GAME OVER! Reload page to restart";
  }
}

function intervalCost() {
  const type = [
    { name: "plain", expense: 1, income: 0, powerUsage: 0 },
    { name: "water", expense: 1, income: 0, powerUsage: 0 },
    { name: "road", expense: 10, income: 0, powerUsage: 10 },
    { name: "residential", expense: 80, income: 100, powerUsage: 90 },
    { name: "commercial", expense: 150, income: 190, powerUsage: 100 },
    { name: "industrial", expense: 200, income: 290, powerUsage: 200 },
    { name: "eps", expense: 210, income: 0, powerUsage: 0 },
  ];
  let round_cost = 0;
  let round_income = 0;
  let round_expense = 0;
  let totalPowerUsage = 0;
  let epsCount = board.blocks.filter((obj) => obj.type === "eps").length;
  totalPower = epsCount * 1000;

  for (let i = 0; i < type.length; i++) {
    let count = board.blocks.filter((obj) => obj.type === type[i].name).length;
    console.log(count);
    round_expense = round_expense + count * type[i].expense;
    round_income = round_income + count * type[i].income;
    totalPowerUsage = totalPowerUsage + count * type[i].powerUsage;
  }
  if (totalPowerUsage > totalPower) {
    round_income = round_income * 0.5;
  }
  round_cost = round_cost + round_income - round_expense;

  console.log(round_cost);
  moneyFunction(round_cost);
  document.getElementById("moneyPerRound").innerHTML = round_cost;
  document.getElementById("power").innerHTML = totalPowerUsage;
  document.getElementById("poweer").innerHTML = totalPower;

  return true;
}

setInterval(intervalCost, 15000);

var timeInSecs;
var ticker;

function startTimer(secs) {
  timeInSecs = parseInt(secs);
  ticker = setInterval("tick()", 1000);
}

function tick() {
  var secs = timeInSecs;
  if (secs > 0) {
    timeInSecs--;
  } else {
    clearInterval(ticker);
    startTimer(14);
  }

  var days = Math.floor(secs / 86400);
  secs %= 86400;
  var hours = Math.floor(secs / 3600);
  secs %= 3600;
  var mins = Math.floor(secs / 60);
  secs %= 60;
  var pretty =
    (days < 10 ? "0" : "") +
    days +
    ":" +
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (mins < 10 ? "0" : "") +
    mins +
    ":" +
    (secs < 10 ? "0" : "") +
    secs;

  document.getElementById("countdown").innerHTML = pretty;
}

startTimer(14);
