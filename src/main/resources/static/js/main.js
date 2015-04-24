(function() {
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and
  // Tino Zijdel
  // MIT license

  var lastTime = 0;
  var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
        || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
// TODO: get these from the server
var game = new Game(1, {
  numCards : 5
});

var player1 = new Player("1", "Esteban", "blue", false, game);
var player2 = new Player("2", "Zach", "blue", true, game);
var player3 = new Player("3", "Abe", "blue", false, game);
var player4 = new Player("4", "Jack", "blue", false, game);
var players = [ player1, player2, player3, player4 ];
game.currPhase = 1; // make it nonstorycards so cards can move
game.addPlayers(players);
function makeTestHand() {
  var hand = [ "/images/cards/dixit_card_01_001.jpg",
      "/images/cards/dixit_card_01_002.jpg",
      "/images/cards/dixit_card_01_003.jpg",
      "/images/cards/dixit_card_01_004.jpg",
      "/images/cards/dixit_card_01_005.jpg" ];
  return makeHandArray(hand);
}

function makeHandArray(handUrls) {
  var hand = [];
  for (var i = 0; i < handUrls.length; i++) {
    hand.push(new Card({
      id : i,
      img : handUrls[i],
      x : i * (board.canvas.width / 9) + (board.canvas.width / 4),
      y : board.canvas.height - (board.canvas.height / 5),
      canvas : board.canvas,
      inHand : true
    }));
  }
  return hand;
}

window.onload = function() {
  var board = new Board(game, "board", player1.id);
  player1.addHand(makeTestHand());
  board.addListeners();
  board.addCard(new Card({
    img : "/images/cards/dixit_card_01_012.jpg",
    canvas : board.canvas,
    inHand : false
  }))

  board.draw();
  var chat = new Chat(game);
}
