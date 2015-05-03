var isWaitingForUpdateRequest = false;
var chat;
var board;

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
// var game;
/*
 * var game = new Game(1, { numCards : 6 });
 */

function processUpdates(responseObject) {
  isWaitingForUpdateRequest = false
  for (var i = 0; i < responseObject.length; i++) {
    var tempUpdate = responseObject[i];
    var tempUpdateName = tempUpdate[0];
    var tempUpdateValue = tempUpdate[1];
    switch (tempUpdateName) {
    case "chat":
      chat.addMsg(tempUpdateValue.message, game
          .getPlayer(tempUpdateValue.playerId));
      break;
    case "added player":
      game.addPlayer(tempUpdateValue);
      break;
    case "game":
      console.log('game changed');
      console.log(responseObject);
      if ((game.currPhase === -1 || game.currPhase === game.phases['Pregame'])
          && tempUpdateValue.phase === game.phases['StoryTeller']) {
        console.log("STARTING NEW GAME.");
        game.doPhase(game.phases['StoryTeller']);
      } else {
        game.currClue = tempUpdateValue.story;
        if (game.currPhase != tempUpdateValue.phase) {
          game.doPhase(tempUpdateValue.phase);
        }
      }
      break;
    case "tablecards":
      board.tableCardsUpdate(tempUpdateValue);
      break;
    case "player":
      var tempPlayer = game.players[tempUpdateValue.id];
      if (tempUpdateValue.isStoryTeller) {
        game.setStoryTeller(tempPlayer);
      } else {
        tempPlayer.isStoryTeller = false;
      }

      game.updateScore(tempUpdateValue.id, tempUpdateValue.score);
      tempPlayer.hasVoted = tempUpdateValue.hasVoted;
      break;
    case "hand":
      board.clientPlayer.hand = [];
      board.clientPlayer.setHandFromAjax(tempUpdateValue);
      board.clientPlayer.refresh(board.canvas);
      console.log(game.players[sessionStorage.playerId]);
      break;
    case "votes":
      board.doVotes(tempUpdateValue);
    }
  }
}

function sendUpdateRequestIfReady() {
  if (!isWaitingForUpdateRequest) {
    isWaitingForUpdateRequest = true;
    getUpdateRequest(processUpdates);
  }
}

function retreiveGame(responseObject) {
  if (!responseObject) {
    window.location = '/';
  }
  console.log(responseObject);
  game = new Game(responseObject.name, {
    numCards : responseObject.handsize
  });
  //fix clue modal's empty cards if cards are less
  //than 6.
  for(var i =0;i<(6 - game.rules.numCards); i++){
	  $('#item' + (5-i)).remove();
  }
  game.addPlayers(responseObject.players);
  board = new Board({
    game : game,
    canvasId : "board",
  })
  board.addListeners();
  game.board = board;
  // start chat
  chat = new Chat();
  var chatLines = responseObject.chat;
  // add all the existing chat lines
  for (var i = 0; i < chatLines.length; i++) {
    chat.addMsg(chatLines[i].message, game.getPlayer(chatLines[i].playerId));
  }
  if (responseObject.story) {
    game.currClue = responseObject.story;
  }
  if (responseObject.tablecards) {
    board.tableCardsUpdate(responseObject.tablecards);
  }
  if (responseObject.votes) {
    board.doVotes(responseObject.votes);
  }

  board.clientPlayer.refresh(board.canvas);
  game.doPhase(responseObject.phase);
  board.draw();

  // var board = new Board(game, "board", sessionStorage.playerId);
  // game.board = board;

  setInterval(sendUpdateRequestIfReady, 500);
}
/*
 * var player1 = new Player("1", "Esteban", "blue", false, game); var player2 =
 * new Player("2", "Zach", "blue", false, game); var player3 = new Player("3",
 * "Abe", "blue", false, game); var player4 = new Player("4", "Jack", "blue",
 * false, game); var player5 = new Player("4", "Jack", "blue", false, game); var
 * player6 = new Player("4", "Jack", "blue", false, game);
 * 
 * var players = [ player1, player2, player3, player4, player5, player6 ];
 * game.addPlayers(players); function makeTestHand() { var hand = [
 * "/images/cards/dixit_card_01_001.jpg", "/images/cards/dixit_card_01_002.jpg",
 * "/images/cards/dixit_card_01_003.jpg", "/images/cards/dixit_card_01_004.jpg",
 * "/images/cards/dixit_card_01_005.jpg" ]; return makeHandArray(hand); }
 * 
 * function makeHandArray(handUrls) { var hand = []; for (var i = 0; i <
 * handUrls.length; i++) { hand.push(new Card({ id : i, img : handUrls[i], x : i *
 * (board.canvas.width / 9) + (board.canvas.width / 4), y : board.canvas.height -
 * (board.canvas.height / 5), canvas : board.canvas, inHand : true })); } return
 * hand; }
 */
window.onload = function() {
  if (typeof (Storage) !== "undefined") {
    var gameName = $("#gameName").val();
    var playerId = $("#playerId").val();
    if (gameName.length > 0 && playerId.length > 0) {
      sessionStorage.gameName = gameName;
      sessionStorage.playerId = playerId;
    }
  } else {
    alert("ERROR: This browser doesn't support HTML5 local storage."
        + "The game cannot be played properly.");
  }
  // alert(sessionStorage.gameName + " " + sessionStorage.playerId);
  if (sessionStorage.gameName === undefined
      || sessionStorage.playerId === undefined) {
    alert("ERROR: you have not joined a game!");
    window.location = '/';
  } else {
    getGameRequest(retreiveGame);
  }
  if (window.location.pathname != "/board") {
    window.location = '/board';
  }
  // game.setStoryTeller(player2);
  /*
   * player1.addHand(makeTestHand());
   * 
   * board.addListeners();
   * 
   * board.addCard(new Card({ img : "/images/cards/dixit_card_01_012.jpg",
   * canvas : board.canvas, inHand : false })) board.addCard(new Card({ img :
   * "/images/cards/dixit_card_01_013.jpg", canvas : board.canvas, inHand :
   * false })) board.addCard(new Card({ img :
   * "/images/cards/dixit_card_01_014.jpg", canvas : board.canvas, inHand :
   * false })) board.addCard(new Card({ img :
   * "/images/cards/dixit_card_01_015.jpg", canvas : board.canvas, inHand :
   * false })) board.addCard(new Card({ img :
   * "/images/cards/dixit_card_01_016.jpg", canvas : board.canvas, inHand :
   * false })) board.addCard(new Card({ img :
   * "/images/cards/dixit_card_01_017.jpg", canvas : board.canvas, inHand :
   * false }))
   * 
   * game.nextPhase(); board.draw(); var chat = new Chat(player1);
   */
}
