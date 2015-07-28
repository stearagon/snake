#!/usr/bin/env node

var Snake = require("./js");

var game = new Snake.Board();
game.snake.move();
game.render();
game.snake.turn([0, -1]);
game.snake.move();
game.render();
game.snake.turn([0, 1]);
game.snake.move();
game.render();
