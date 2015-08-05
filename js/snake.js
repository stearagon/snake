(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Coord = SnakeGame.Coord = function (coord, dir) {
    this.posX = coord[0];
    this.posY = coord[1];
    this.dir = dir
  }

  Coord.prototype.plus = function(dir) {
    this.posX += dir[0];
    this.posY += dir[1];
  }

  Coord.prototype.equals = function(otherCoord) {
    return ((this.posX === otherCoord.posX) && (this.posY === otherCoord.posY))
  }

  Coord.prototype.isOpposite = function(otherDir){
    return ((-this.dir[0]===otherDir[0]) && (-this.dir[1]===otherDir[1]))
  }

  var Snake = SnakeGame.Snake = function (dir) {
    this.dir = dir;
    this.segments = [new Coord([6,4],this.dir),new Coord([5,4],this.dir),new Coord([4,4],this.dir)];
    this.over = false;
  }

  Snake.prototype.move = function() {
    var dir = this.dir;
    var newPosX = this.segments[0].posX + this.dir[1];
    var newPosY = this.segments[0].posY + this.dir[0];

    this.checkBoard([newPosX, newPosY]);

    var newHead = this.segments.pop();
    newHead.dir = this.dir;
    newHead.posX = newPosX;
    newHead.posY = newPosY;
    this.segments.unshift(newHead);
  }

  Snake.prototype.checkBoard = function (head){
    if (head[0] > 9 || head[1] > 9 || head[1] < 0 || head[0] < 0){

      {$(".main").append("<h1 class=\"gameover\">Game Over!</h1>")}
      this.over = true;
    } else {
      this.segments.slice(1).forEach(function(seg){
        if (this.segments[0].posX === seg.posX && this.segments[0].posY === seg.posY){
          debugger
          this.over = true;
          {$(".main").append("<h1 class=\"gameover\">Game Over!</h1>")}
        }
      }.bind(this))
    }
  }

  Snake.prototype.turn = function (newDir) {
    if (this.segments[0].isOpposite(newDir)){

    } else {
      this.dir = newDir;
      this.segments[0].dir = newDir;
    }
  }



  Board = SnakeGame.Board = function (snake) {
    this.apples = [];
    this.snake = snake;
    var newGrid = [];

    for (i = 0; i < Board.DIM_X; i++){
      newGrid[i] = new Array();
      for (j = 0; j < Board.DIM_Y; j++){
        newGrid[i][j] = "."
      };
    }

    this.grid = newGrid;
  }

  Board.DIM_X = 10;
  Board.DIM_Y = 10;

  Board.prototype.randomApple = function () {
    var grid = this.grid;
    var snake = this.snake;
    var apples = this.apples;
    var newApple = null;

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    if (this.apples.length === 0) {
      var bool = false;
      while (bool === false){
        bool = true;
        appPosX = Math.floor(getRandomArbitrary(0,Board.DIM_X));
        appPosY = Math.floor(getRandomArbitrary(0,Board.DIM_Y));
        newApple = new Coord([appPosX, appPosY], [0,0]);
        for(var x = 0; x < snake.segments.length; x++){
          if ((appPosX === snake.segments[x].posX) && (appPosY === snake.segments[x].posY)) {
            bool = false
          }
        }
      }
    apples.push(newApple)
    }
  }

  Board.prototype.appleCheck = function() {
    var snake = this.snake;
    if (this.apples.length > 0){
      if ((this.snake.segments[0].posX === this.apples[0].posX) && (this.snake.segments[0].posY === this.apples[0].posY)){
        this.apples.shift();
        var lastSeg = snake.segments[snake.segments.length - 1];
        this.snake.segments.push(new Coord([lastSeg.posX,lastSeg.posY],this.snake.dir));
      }
    }
  }

  Board.prototype.render = function() {
    var grid = this.grid;
    var snake = this.snake;
    var board = this;
    for(var x = 0; x < Board.DIM_X; x++) {
      for(var y = 0; y < Board.DIM_Y; y++) {
        grid[x][y] = "<li></li>"
        if (board.apples.length > 0){
          for(var appNum = 0; appNum < board.apples.length; appNum++){
            if ((x === board.apples[appNum].posX) && (y === board.apples[appNum].posY)) {
              grid[x][y] = "<li class=\"apple\"></li>";
            };
          };
        }
      for(var segNum = 0; segNum < this.snake.segments.length; segNum++){
        if ((x === snake.segments[segNum].posX) && (y === snake.segments[segNum].posY)) {
          grid[x][y] = "<li class=\"snake\"></li>";
        };
      }
      };
    };

    var text = "";

    grid.forEach(function(el){
      var rowText = "<ul class=\"group\">";
      while (el.length > 0) {
        rowText += el.shift();
      }
      rowText += "</ul>";
      text += rowText;
    })

    return text;
  }


})();
