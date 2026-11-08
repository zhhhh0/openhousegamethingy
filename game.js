


let board;
const columncount = 19;
const rowcount = 21;
const tilesize=32;

const boardwidth=columncount * tilesize;
const boardheight=rowcount * tilesize;
let context;

let sethimage;
let wallimage;
let burgerimage;

const walls = new Set();
let seth;
const burgers = new Set();
const tilemap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X   b       b     X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O b               O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X b      X",
    "X XX XXX X XXX XX X",
    "X  X     S     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X  b           b  X",
    "XXXXXXXXXXXXXXXXXXX" 
];
window.onload = function(){
	board= document.getElementById("board");


	board.height=boardheight;
	board.width=boardwidth;
    
   
	context=board.getContext("2d");

    loadimages();
    loadmap();
    update();
   
    
}
function startGame() {
    let menu=document.getElementById("main-menu");
    menu.style.opacity="0"
    setTimeout(() => {
        menu.remove();
    }, 1500);
}
function loadmap(){
    walls.clear();
    for(let i = 0; i < rowcount; i++){
        for(let j = 0; j < columncount; j++){
            let tilemapchar= tilemap[i][j];

            const x = j*tilesize;
            const y = i*tilesize;

            if(tilemapchar=="X"){
                const wall = new block(wallimage,x,y,tilesize,tilesize);
                walls.add(wall);
            }
       else if(tilemapchar=="S"){
           seth = new block(sethimage,x,y,tilesize,tilesize);
           
       }
       else if(tilemapchar=="b"){
           burger=new block(burgerimage,x,y,tilesize,tilesize);
           burgers.add(burger);
       }
        }
    }
}
function loadimages(){
	sethimage = new Image();
	sethimage.src = "./seth.png";

	wallimage = new Image();
	wallimage.src = "./wall.png";

	burgerimage = new Image();
	burgerimage.src="./burger.png";
}
function update(){
    draw();
    setTimeout(update,50)
}
function draw(){
    context.drawImage(seth.image,seth.x,seth.y,seth.width,seth.height);
     for(let w of walls.values()){
        context.drawImage(w.image,w.x,w.y,w.width,w.height);
    }
    for(let b of burgers.values()){
        context.drawImage(b.image,b.x,b.y,b.width,b.height);
    }

}
class block {
    constructor(image,x,y,width,height){
        this.image=image;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.startx=x;
        this.starty=y;
    }
}
function checkdir(str){
    if(str.startsWith("moveleft(") && str.endsWith(")") && /^\d+$/.test(str.replace("moveleft(","").replace(")",""))) return 'L';
    else if(str.startsWith("moveright(") && str.endsWith(")") && /^\d+$/.test(str.replace("moveright(","").replace(")",""))) return 'R';
    else if(str.startsWith("moveup(") && str.endsWith(")") && /^\d+$/.test(str.replace("moveup(","").replace(")",""))) return 'U';
    else if(str.startsWith("movedown(") && str.endsWith(")") && /^\d+$/.test(str.replace("movedown(","").replace(")",""))) return 'D';
    else return 0;
}
function error(arr){
        for(let i = 0; i < arr.length;i++){
            if(!checkdir(arr[i].trim())){
                return true;
            }
        }
        return false;
        
}
function RunCode() {
    let compiler=document.getElementById("compiler");
    let lines = compiler.value.split(/\r?\n/);
    let runbutton=document.getElementById("runbutton");
    if(error(lines)){
        runbutton.textContent  ="Error in code!";
        setTimeout(() => {
        runbutton.textContent="Run";
        }, 1500);
        return;
    }
    else{
        console.log("Code ran successfully!");
        runbutton.textContent  ="Code ran successfully!";
        setTimeout(() => {
        runbutton.textContent="Run";
        }, 1500);
    }
    
    
    
}