package gamestuff;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Stack;

public class Game {
  private int MAX_CARDS;
  private int numPlayers;
  private Collection<Player> players;
  private String story;
  private Phase phase;
  private Chat chat = new Chat();
  private Stack<Card> deck;
  private List<Card> trash;
  private List<Card> tableCards;
  private int handSize;

  public Game(int numPlayers, int maxCards, int handSize, Collection<Player> players) {
    this.numPlayers = numPlayers;
    this.MAX_CARDS = maxCards;
    this.players = players;
    this.handSize = handSize;
    this.deck = new Stack<Card>();
    this.trash = new Stack<Card>();
    this.tableCards = new ArrayList<Card>();
  }
  
  /**
   * sets up game board
   * deck is filled w/ all possible cards
   * trash is empty
   * all players given x cards depending on custom hand size
   */
  public void initiate() {
    //fill deck lines here ******
    //CardShuffler shuffle deck
    for(int i = 0; i < this.handSize; i++) {
      for(Player p: this.players) {
        p.draw(this.deck.pop());
      }
    }
    updatePhase(Phase.WAITINGFORFIRSTSTORY);
  }
  
  /**
   * When first player volunteers to share story,
   * Player is set to storyteller
   * Story is stored
   * 
   * phase to NONSTORYCARDS and continues as normal
   * 
   * @param player   Player who submitted first story
   * @param s        Story submitted
   */
  public void firstStory(Player player, String s, Card c) {
    for (Player p: this.players) {
      if (player.equals(p)) {
        p.setIsStoryteller(true);
      } else {
        p.setIsStoryteller(false);
      }
    }
    this.story = s;
    addCardToTable(player, c);
    updatePhase(Phase.NONSTORYCARDS);
  }
  
  /**
   * again is it selected Card we pass from front end or the ID?
   * 
   * @param p
   * @param c
   */
  public void addCardToTable(Player p, Card c) {
    this.tableCards.add(p.playCard(c));
    if (this.tableCards.size() == this.players.size()) {
      votingPhase();
    }
  }
  
  public Card drawFromDeck() {
    if (!deck.isEmpty()) {
      return this.deck.pop();
    } else {
      this.refillDeck();
      return this.deck.pop();
    }
  }
  
  public void refillDeck() {
    this.deck.addAll(this.trash);
    //CardShuffler shuffle Deck
    this.trash.clear();
  }
  
  /**
   * updates phase in game and in all players
   */
  public void updatePhase(Phase p) {
    this.phase = p;
    for (Player player: this.players) {
      player.setPhase(p);
    }
  }
}
