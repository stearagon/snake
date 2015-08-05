(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }


  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board( new SnakeGame.Snake([0,1]));
    var view = this;

    this.$el.html(this.board.render());

    $("html").keydown(function(event){
      var w = 87; s = 83; a = 65; d = 68;
      if (event.keyCode === w){
        view.board.snake.turn([0,-1]);
      } else if (event.keyCode === s) {
        view.board.snake.turn([0,1]);
      } else if (event.keyCode === a) {
        view.board.snake.turn([-1,0]);
      } else if (event.keyCode === d) {
        view.board.snake.turn([1,0]);
      }
    });

    this.stepInterval = window.setInterval(this.step.bind(this), 100);
  };

  View.prototype.step = function () {
    this.board.randomApple();
    this.board.appleCheck();
    this.board.snake.move();
    if (this.board.snake.over === true) {
      clearInterval(this.stepInterval);
      return
    }
    this.$el.html(this.board.render());

  }



})();
