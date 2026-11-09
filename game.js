


let board;
const columncount = 19;
const rowcount = 21;
const tilesize=32;
let moves=[];
const boardwidth=columncount * tilesize;
const boardheight=rowcount * tilesize;
let context;

let sethimage;
let wallimage;
let burgerimage;
let collisionsound;
let collectsound;
let scorenum = 0;

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
    "X  X     Sb    X  X",
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

function blink(){
    setTimeout(() => { seth.visible = 0; }, 100);
        setTimeout(() => { seth.visible = 1; }, 200);
        
        setTimeout(() => { seth.visible = 0; }, 300);
        setTimeout(() => { seth.visible = 1; }, 400);
        
        setTimeout(() => { seth.visible = 0; }, 500);
        setTimeout(() => { seth.visible = 1; }, 600);
        
        setTimeout(() => { seth.visible = 0; }, 700);
        setTimeout(() => { seth.visible = 1; }, 800);
}
function opacitychange(b){
        setTimeout(() => { b.opacity=0.8; }, 100);
        setTimeout(() => { b.opacity=0.6; }, 200);
        
        setTimeout(() => { b.opacity=0.4; }, 300);
        setTimeout(() => { b.opacity=0.2; }, 400);
        
        setTimeout(() => { b.opacity=0.0; }, 500);
        
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

    collisionsound = new Audio();
    collisionsound.src = "./collision.mp3";

    collectsound = new Audio();
    collectsound.src = "./eating.mp3";

}
function update(){
    
    draw();
    setTimeout(update,50)
}
function draw(){
   context.clearRect(0, 0, board.width, board.height);
   for(let b of burgers.values()){
       context.save();
       context.globalAlpha = b.opacity;
        context.drawImage(b.image,b.x,b.y,b.width,b.height);
       context.restore();
    }
     for(let w of walls.values()){
        context.drawImage(w.image,w.x,w.y,w.width,w.height);
    }
    if(seth.visible){
        context.drawImage(seth.image,seth.x,seth.y,seth.width,seth.height);
    }
    let score=document.getElementById("score");
    score.textContent="Score: "+scorenum;
}
class block {
    constructor(image,x,y,width,height){
        this.image=image;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.visible = true;
        this.opacity=1.0;

        this.startx=x;
        this.starty=y;
    }
}
function playcollisionsound(){
    let soundclone = collisionsound.cloneNode(true);
    soundclone.play();
}
function playcollectsound(){
    let soundclone = collectsound.cloneNode(true);
    soundclone.play();
}
function checkdir(str){
    if(str.startsWith("moveleft(") && str.endsWith(")") && /^\d+$/.test(str.replace("moveleft(","").replace(")",""))) return {dir: 'L',val: Number(str.replace("moveleft(","").replace(")",""))};
    else if(str.startsWith("moveright(") && str.endsWith(")") && /^\d+$/.test(str.replace("moveright(","").replace(")",""))) return {dir: 'R',val: Number(str.replace("moveright(","").replace(")",""))};
    else if(str.startsWith("moveup(") && str.endsWith(")") && /^\d+$/.test(str.replace("moveup(","").replace(")",""))) return {dir: 'U',val: Number(str.replace("moveup(","").replace(")",""))};
    else if(str.startsWith("movedown(") && str.endsWith(")") && /^\d+$/.test(str.replace("movedown(","").replace(")",""))) return {dir: 'D',val: Number(str.replace("movedown(","").replace(")",""))};
    else return 0;
}
function error(arr){
    moves=[];
        for(let i = 0; i < arr.length;i++){
            if(!checkdir(arr[i].trim())){
                return true;
            }
            else moves.push({dir: checkdir(arr[i].trim()).dir, value: checkdir(arr[i].trim()).val});
        }
        return false;
        
}
let cd = false;
async function RunCode() {
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
    setTimeout(() => { cd=false; }, 5000);
    if(cd) return;
    cd=true;
    runbutton.textContent  ="Code ran successfully!";
        setTimeout(() => {
        runbutton.textContent="Run";
        }, 1500);
    
        for(let i = 0; i < moves.length;i++){
              console.log(moves[i].dir+" "+moves[i].value);
              await movedirection(moves[i].dir,moves[i].value);
        }
        loadmap();
    
}
function collision(dir){
       let row = Math.floor(seth.y / tilesize);
       let col = Math.floor(seth.x / tilesize);
       playcollisionsound();
        if(dir=='R'){
                seth.x+=tilesize;
                blink();
                setTimeout(() => { seth.x-=tilesize; }, 850);
        }
        else if(dir=='L'){
                seth.x-=tilesize;
                blink();
                setTimeout(() => { seth.x+=tilesize; }, 850);
            }
        else if(dir=='U'){
                seth.y-=tilesize;
                blink();
                setTimeout(() => { seth.y+=tilesize; }, 850);
            }
        else if(dir=='D'){
                seth.y+=tilesize;
                blink();
                setTimeout(() => { seth.y-=tilesize; }, 850);
        }
}
function burgercollect(r, c){
    for(let b of burgers.values()) {
        if(b.x === c * tilesize && b.y === r * tilesize){
            opacitychange(b);
            setTimeout(() => {  burgers.delete(b); }, 950);
            
        }
    }
}
function movedirection(dir,value){
    let row = Math.floor(seth.y / tilesize);
    let col = Math.floor(seth.x / tilesize);
    let steps=0;

    return new Promise((resolve) => {
        let moveInterval = setInterval(() => {

            if (steps >= value) {
                clearInterval(moveInterval);
                resolve();
                return;
            }


            let nextRow = row;
            let nextCol = col;

            if (dir == 'R') nextCol++;
            else if (dir == 'L') nextCol--;
            else if (dir == 'U') nextRow--;
            else if (dir == 'D') nextRow++;
            else {
                clearInterval(moveInterval);
                resolve();
                return;
            }
            if (tilemap[nextRow][nextCol] == 'X') {
                collision(dir);
                steps++;
                
                if (steps >= value) {
                    clearInterval(moveInterval);
                    resolve();
                }
                return;
            }


            if (tilemap[nextRow][nextCol] == 'b') {
                scorenum++;
                playcollectsound();
                burgercollect(nextRow, nextCol);
            }

            row = nextRow;
            col = nextCol;
            if (dir == 'R') seth.x += tilesize;
            if (dir == 'L') seth.x -= tilesize;
            if (dir == 'U') seth.y -= tilesize;
            if (dir == 'D') seth.y += tilesize;

            steps++;

        }, 1000);
    }); 
}