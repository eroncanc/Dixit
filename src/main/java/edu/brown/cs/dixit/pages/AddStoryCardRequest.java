package edu.brown.cs.dixit.pages;

import edu.brown.cs.dixit.Main;
import gamestuff.Card;
import gamestuff.Game;
import gamestuff.Player;

import java.util.Map;

import spark.ModelAndView;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.TemplateViewRoute;

import com.google.common.collect.ImmutableMap;

public class AddStoryCardRequest implements TemplateViewRoute {

  @Override
  public ModelAndView handle(
      Request req,
      Response res) {
    QueryParamsMap qm = req.queryMap();
    String gameName = qm.value("gameName");
    String playerId = qm.value("playerId");
    String cardId = qm.value("cardId");
    String clue = qm.value("clue");

    Game game = Main.getGame(gameName);
    Player player = game.getPlayerWithId(playerId);
    if (!player.isStoryteller()) {
      Map<String, Object> variables = ImmutableMap.of("response", "false");
      return new ModelAndView(variables, "response.ftl");
    }
    Card card = game.getCardWithId(cardId);
    game.submitStory(clue, card);

    Map<String, Object> variables = ImmutableMap.of("response", "true");
    return new ModelAndView(variables, "response.ftl");
  }
}
