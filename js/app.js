const numberOfEnemies = Math.floor(Math.random()*3);
const playerImages =['char-boy','char-cat-girl','char-horn-girl','char-pink-girl','char-princess-girl'];
const rowSize=83;
const colSize=101;
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y+55;
    this.step = colSize;
    this.boundary= this.step*4;
    this.resetPosition = -this.step;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x<this.boundary){
   		this.x= this.x+ 200*dt;
   	}else{
   		this.x=this.resetPosition;
   	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Players{
	constructor(image){
		this.lose=false; //to check whether player lose or not
		this.rowMove =rowSize;
		this.colMove =colSize;
		this.startX=this.colMove*2;
		this.startY=this.rowMove*5 -18 ;
		this.x = this.startX;
		this.y = this.startY;
		this.score =0;
		this.sprite = 'images/'+image+'.png';
	}

	//draw player on current x and y co ordinate
	render(){

		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	//move player in x and Y coordinate
	handleInput(input){
		//if player collide or player reach river stop movement
		if(this.lose===false || this.y===-18){
			switch(input){
				case 'left':
					if(this.x>0){
				 		this.x= this.x- this.colMove;
				 	}
				 	break;
				case 'up':
					if(this.y>0){
						this.y= this.y- this.rowMove;
						this.score=this.score+1;
					}
					break;
				case 'right':
					if(this.x<this.colMove*4){
						this.x = this.x+ this.colMove;
					}
					break;
				case 'down':
					if(this.y<this.rowMove*4){
						this.y = this.y+ this.rowMove;
						this.score=this.score-1;
					}
					break;
			}
		}
	}

	update(){
		var temp =this;
		if(this.y===-18){
			setTimeout(function(){ temp.reset();}, 500);
			createEnemy(numberOfEnemies+1);
			resetGem();
			
		}
	}

	reset(){

		this.x = this.startX;
		this.y = this.startY;
		this.lose=false;
	}
}

//creating gems
const gemsArray =['Gem Blue','Gem Green','Gem Orange'];
class gems{
	constructor(x,y,image){
		this.intialX=x;
		this.x=x;
		this.y=y;
		this.sprite='images/'+image+'.png';
		this.present=true;
	}

	render(){

		ctx.drawImage(Resources.get(this.sprite), this.x, this.y,70,100);
	}

	delete(){
		this.x= colSize*5;
		this.present=false;
	}

	reset(){
		this.x=this.intialX;
		this.present=true;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies=[];
createEnemy(numberOfEnemies);

//creating enemy 
function createEnemy(numOfEnemies){
	allEnemies=[];
	for(var i =0;i<=numOfEnemies;i++){
		var enemy = new Enemy(-(i%4)*colSize,((i%3)*rowSize));
		allEnemies.push(enemy);
	}
}

//create gems
var blueGem = new gems(rowSize*3-18,colSize*3-25,gemsArray[0]);
var greenGem= new gems (rowSize*2-50,colSize*2,gemsArray[1]);
var orangeGem = new gems(rowSize*4-18,colSize,gemsArray[2]);

function resetGem(){
	blueGem.reset();
	greenGem.reset();
	orangeGem.reset();
}


// Place the player object in a variable called player
var playerImg = Math.floor(Math.random()*5);
var player = new Players(playerImages[playerImg]);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
