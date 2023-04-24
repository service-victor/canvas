
//  let money = get.ElementById(money)

// money = 100

// function ett(){

//   console.log( money +1)
//   money = money +1 
// }
// setInterval(ett, 5000); 









window.addEventListener('DOMContentLoaded', (event) =>{

    let city_canvas = document.getElementById("canvas");
    let city_canvas_context = city_canvas.getContext('2d');

   


    class Tile {
        constructor(x, y, height, width, type) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.type = type
            switch(this.type) {
                case "water":
                this.color = "blue"
                break
                case "rock":
                this.color = "gray"
                break
                default:
                this.color = "green"
                
              }
            
        }
        draw(){
            city_canvas_context.lineWidth = 1
            city_canvas_context.fillStyle = this.color
            city_canvas_context.strokeStyle = "black"
            city_canvas_context.fillRect(this.x, this.y, this.width, this.height)
            city_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        
    }
    

    class Grid{
        constructor(width, height){
            this.width = width
            this.height = height
            this.x = 0
            this.y = 0
            this.blocks = []
            for(let i = 0; this.y<city_canvas.height; i++){
                for(let i = 0; this.x<city_canvas.width; i++){
                    let block
                    if(Math.random() < .91){
                       block = new Tile(this.x, this.y, this.height, this.width, "grass")
                    // }else if (Math.random() < .3){
                    //     block = new Tile(this.x, this.y, this.height, this.width, "rock")
                    }else{
                     block = new Tile(this.x, this.y, this.height, this.width, "water")
                    }
                    this.blocks.push(block)
                    this.x+=this.width
                }
                this.y+=this.height
                this.x = 0
            }

        }
        draw(){
            for(let b = 0; b<this.blocks.length; b++){
                this.blocks[b].draw()
            }
        }
    }

    
    let board = new Grid(70,70)
   
    window.setInterval(function(){ 

        board.draw()
        
    }, 140) 

    console.log(board.blocks)
})

let coordinate_x = 20
let coordinate_y = 40

for (let i = 0; i < city_canvas.height; i++) {
    for (let i = 0; i < city.canvas.width; i++) {
        console.log(coordinate_x, coordinate_y)
    }
}
