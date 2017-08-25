console.log("Ghost2.js is connected");

var Ghost2 = (function() {
  return {
    $gameOverText: null,
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    checkGhost: function() {
      // if position of the pacman and the ghost are the same, alert the user that they have lost and remove the pacman from the board
      if (Pacman.pacmanPosition === Ghost2.ghostPosition) {
        // Pause the ghost from moving
        Ghost.pause();
        Ghost2.pause();
        Ghost3.pause();
        Ghost4.pause();
        Pacman.$pacman.remove();
        Game.spacebarCount = 1;
        $gameOverText = $("<p id='game-over'>GAME OVER</p>");
        $('#user-text').attr('style', 'position: absolute; transform: translateY(5%);');
        $('#vertical').attr('style', 'position: relative;');
        $('#user-text').append($gameOverText);
        // show the text animation for 3 seconds before removing it and restarting the game
        setTimeout(function() {
          $('#game-over').remove();
          Game.newGame();
        }, 3000);
      }
    },
    moveGhost: function() {
      $('#start-text').remove();
      Game.setStartText('pause');
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        // remove current ghost, set the square that the ghost will be appended to with position relative
        Ghost2.$ghost.remove();
        Ghost2.$ghostSquare = $(`#${Ghost2.ghostPosition}`).attr('style', 'position: relative;');;

        // change position of ghost based on the position of the pac-man
        // get to the same column
        if ((Board.locations[Pacman.pacmanPosition].column) < Board.locations[Ghost2.ghostPosition].column) {
          Ghost2.ghostPosition --;
        }
        else if (Board.locations[Pacman.pacmanPosition].column > Board.locations[Ghost2.ghostPosition].column) {
          Ghost2.ghostPosition ++;
        }
        else {
          // get to the same row
          if (Board.locations[Pacman.pacmanPosition].row < Board.locations[Ghost2.ghostPosition].row) {
            Ghost2.ghostPosition -= 20;
          }
          else if (Board.locations[Pacman.pacmanPosition].row > Board.locations[Ghost2.ghostPosition].row) {
            Ghost2.ghostPosition += 20;
          }
        }
        // move the ghost with postion absolute to the new square/location by appending "on top" of the current square
        Ghost2.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index = 10000');
        Ghost2.$ghost.append('<img src=gifs/ghost2.gif alt=ghost id=ghost-image>');
        Ghost2.$ghostSquare.prepend(Ghost2.$ghost);
        Ghost2.checkGhost();
      }, Levels.setSpeed());
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
