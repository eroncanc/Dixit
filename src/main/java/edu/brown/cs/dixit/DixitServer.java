package edu.brown.cs.dixit;

import spark.Spark;
import spark.template.freemarker.FreeMarkerEngine;
import edu.brown.cs.dixit.pages.AddChatRequest;
import edu.brown.cs.dixit.pages.AddNonStoryCardRequest;
import edu.brown.cs.dixit.pages.AddStoryCardRequest;
import edu.brown.cs.dixit.pages.CreateGameRequest;
import edu.brown.cs.dixit.pages.DixitHomePage;
import edu.brown.cs.dixit.pages.DixitJoinGamePage;
import edu.brown.cs.dixit.pages.DixitJoinOptionsPage;
import edu.brown.cs.dixit.pages.DixitMainPage;
import edu.brown.cs.dixit.pages.DixitNewGamePage;
import edu.brown.cs.dixit.pages.SeeCurrentGamesRequest;
import edu.brown.cs.dixit.pages.GetGameRequest;
import edu.brown.cs.dixit.pages.GetUpdateRequest;
import edu.brown.cs.dixit.pages.AddPlayerRequest;
import edu.brown.cs.dixit.pages.RemoveNonStoryCardRequest;
import edu.brown.cs.dixit.pages.RemoveVoteForCardRequest;
import edu.brown.cs.dixit.pages.VoteForCardRequest;

public class DixitServer {
  private static final int DEFAULT_PORT = 2345;

  public static void runSparkSever(Integer port) {
    port = port != null ? port : DEFAULT_PORT;
    Spark.setPort(port);
    Spark.externalStaticFileLocation("src/main/resources/static");
    Spark.get("/board", new DixitMainPage(), new FreeMarkerEngine());
    Spark.post("/createGame", new CreateGameRequest(), new FreeMarkerEngine());
    Spark.get("/seeCurrentGames", new SeeCurrentGamesRequest());
    Spark.post("/addPlayer", new AddPlayerRequest(), new FreeMarkerEngine());
    Spark.get("/getGame", new GetGameRequest(), new FreeMarkerEngine());
    Spark.get("/getUpdate", new GetUpdateRequest(), new FreeMarkerEngine());
    Spark.get("/addStoryCard", new AddStoryCardRequest(),
        new FreeMarkerEngine());
    Spark.get("/addNonStoryCard", new AddNonStoryCardRequest(),
        new FreeMarkerEngine());
    Spark.get("/removeNonStoryCard", new RemoveNonStoryCardRequest(),
        new FreeMarkerEngine());
    Spark.get("/voteForCard", new VoteForCardRequest(), new FreeMarkerEngine());
    Spark.get("/removeVoteForCard", new RemoveVoteForCardRequest(),
        new FreeMarkerEngine());
    Spark.post("/addChat", new AddChatRequest(), new FreeMarkerEngine());
    Spark.get("/joinOptions/:gameName", new DixitJoinOptionsPage(), new FreeMarkerEngine());
    Spark.get("/", new DixitHomePage(), new FreeMarkerEngine());
    Spark.get("/newGamePage", new DixitNewGamePage(), new FreeMarkerEngine());
    Spark.get("/joinGamePage", new DixitJoinGamePage(), new FreeMarkerEngine());

  }

}
