var snake = new Snake([0,-1]);
var board = new Board(snake);
snake.segments.push(new Coord([5,5],snake.dir));
snake.segments.push(new Coord([5,6],snake.dir));
snake.segments.push(new Coord([5,7],snake.dir));
