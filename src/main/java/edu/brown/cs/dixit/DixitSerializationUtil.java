package edu.brown.cs.dixit;

import gamestuff.Card;
import gamestuff.Chat;
import gamestuff.ChatLine;
import gamestuff.Game;
import gamestuff.Phase;
import gamestuff.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import com.google.gson.JsonElement;

/**
 * Serializes various classes into strings. Deep serialization means that nested
 * objects are recursively serialized.
 */
public class DixitSerializationUtil {

  private final static Gson GSON = new Gson();

  public JsonElement serializeCard(
      Card card) {
    Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
        .put("id", card.getId()).put("image", card.getImage())
        .put("isStoryTeller", card.getStoryteller()).build();
    return GSON.toJsonTree(variables);
  }

  public JsonElement serializeHand(
      List<Card> hand) {
    ImmutableList.Builder<JsonElement> tempBuilder = new ImmutableList.Builder<JsonElement>();
    int index = 0;
    while (index < hand.size()) {
      Card tempCard = hand.get(index);
      tempBuilder.add(serializeCard(tempCard));
      index += 1;
    }
    return GSON.toJsonTree(tempBuilder.build());
  }

  public JsonElement serializePlayer(
      Player player,
      Player currentPlayer) {
    Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
        .put("score", player.getScore()).put("chatName", player.getChatName())
        .put("isStoryTeller", player.isStoryteller()).put("id", player.getId())
        .build();
    return GSON.toJsonTree(variables);
  }

  public JsonElement deepSerializePlayer(
      Player player,
      Player currentPlayer) {
    ImmutableMap.Builder<String, Object> tempBuilder = new ImmutableMap.Builder<String, Object>()
        .put("score", player.getScore()).put("chatName", player.getChatName())
        .put("isStoryTeller", player.isStoryteller()).put("id", player.getId());
    if (currentPlayer == player) {
      tempBuilder.put("hand", serializeHand(player.getHand()));
    }
    return GSON.toJsonTree(tempBuilder.build());
  }

  public JsonElement serializePhase(
      Phase phase) {
    String tempValue = "none";
    if (phase == Phase.STORYTELLER) {
      tempValue = "STORYTELLER";
    } else if (phase == Phase.NONSTORYCARDS) {
      tempValue = "NONSTORYCARDS";
    } else if (phase == Phase.VOTING) {
      tempValue = "VOTING";
    } else if (phase == Phase.SCORING) {
      tempValue = "SCORING";
    } else if (phase == Phase.CLEANUP) {
      tempValue = "CLEANUP";
    }
    return GSON.toJsonTree(tempValue);
  }

  public JsonElement serializeGame(
      Game game,
      Player currentPlayer) {
    Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
        .put("name", game.getName())
        .put("phase", serializePhase(game.getPhase()))
        .put("story", game.getStory()).build();
    return GSON.toJsonTree(variables);
  }

  public JsonElement deepSerializeGame(
      Game game,
      Player currentPlayer) {
    List<Player> playerList = game.getPlayers();
    ImmutableList.Builder<JsonElement> tempBuilder = new ImmutableList.Builder<JsonElement>();
    int index = 0;
    while (index < playerList.size()) {
      Player tempPlayer = playerList.get(index);
      tempBuilder.add(deepSerializePlayer(tempPlayer, currentPlayer));
      index += 1;
    }
    JsonElement playerJsonList = GSON.toJsonTree(tempBuilder.build());
    Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
        .put("name", game.getName())
        .put("phase", serializePhase(game.getPhase()))
        .put("story", game.getStory()).put("players", playerJsonList)
        .put("chat", serializeChat(game.getChat())).build();
    return GSON.toJsonTree(variables);
  }

  public JsonElement serializeChatLine(
      ChatLine chatLine) {
    return GSON.toJsonTree(chatLine.getMessage());
  }

  public JsonElement serializeChat(
      Chat chat) {
    List<ChatLine> chatLineList = chat.getLines();
    ImmutableList.Builder<JsonElement> tempBuilder = new ImmutableList.Builder<JsonElement>();
    int index = 0;
    while (index < chatLineList.size()) {
      ChatLine tempChatLine = chatLineList.get(index);
      tempBuilder.add(serializeChatLine(tempChatLine));
      index += 1;
    }
    return GSON.toJsonTree(tempBuilder.build());
  }

  public JsonElement serializeUpdate(
      String updateName,
      JsonElement json) {
    List<JsonElement> tempList = new ArrayList<JsonElement>();
    tempList.add(GSON.toJsonTree(updateName));
    tempList.add(json);
    return GSON.toJsonTree(tempList);
  }

}
