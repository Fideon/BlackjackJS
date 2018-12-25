/// BlackJack

//Cards
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
              'Ten', 'Nine', 'Eight', 'Seven',
              'Six', 'Five', 'Four', 'Three', 'Two',];

//DOM Variables
let textArea = document.getElementById('txtArea'),
    btnNewGame = document.getElementById('btnNewGame'),
    btnHit = document.getElementById('btnHit'),
    btnStay = document.getElementById('btnStay');
    
//Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

btnHit.style.display = 'none';
btnStay.style.display = 'none';
showStatus();

btnNewGame.addEventListener('click', function() 
{
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  
  
  btnNewGame.style.display = 'none';
  btnHit.style.display = 'inline';
  btnStay.style.display = 'inline';
  showStatus();
});

btnHit.addEventListener('click', function() 
{
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

btnStay.addEventListener('click', function() 
{
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck()
{
  let deck = [];
  for(let suit = 0; suit < suits.length; suit++)
  {
    for(let value = 0; value < values.length; value++)
    {
      let card = {
        suit: suits[suit],
        value: values[value]
      };
      
      deck.push(card);
    }
  }
  
  return deck;
}

function getCardNumericValue(card)
{
  switch(card.value)
  {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray)
{
  let score = 0,
      hasAce = false;
      for (let i = 0; i < cardArray.length; i++)
      {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if(card.value === "Ace")
          hasAce = true;
      }
      if(hasAce && score + 10 <= 21)
        return score + 10;
      
      return score;
}

function shuffleDeck(deck)
{
  for(let i = 0; i < deck.length; i++)
  {
    let swap = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swap];
    deck[swap] = deck[i];
    deck[i] = tmp;
  }
}

function getNextCard()
{
  return deck.shift();
}

function getCardString(card)
{
  return card.value + " of " + card.suit;
}

function updateScores()
{
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame()
{
  updateScores();
  
  if(gameOver)
  {
    while(dealerScore < playerScore && playerScore <= 21 
          && dealerScore <= 21) 
    {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if (playerScore > 21)
  {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21)
  {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver)
  {
    if(playerScore > dealerScore)
      playerWon = true;
    else
      playerWon = false;
  }
}

function showStatus()
{
  if (!gameStarted)
  {
    textArea.innerText = "Welcome to Blackjack!";
    return;
  }
  
  let dealerCardString = "";
  for (let i = 0; i < dealerCards.length; i++)
  {
    dealerCardString += getCardString(dealerCards[i]) + "\n";
  }
  
  let playerCardString = "";
  for (let i = 0; i < playerCards.length; i++)
  {
    playerCardString += getCardString(playerCards[i]) + "\n";
  }
  
  updateScores();
  
  textArea.innerText =
  "Dealer has:\n" +
  dealerCardString +
  "(score: " + dealerScore + ")\n\n" +
  
  "Player has:\n" +
  playerCardString +
  "(score: " + playerScore + ")\n\n";
  
  if(gameOver)
  {
    if(playerWon)
      textArea.innerText += "YOU WON!";
    else
      textArea.innerText += "Dealer wins!";
      
    btnNewGame.style.display = 'inline';
    btnHit.style.display = 'none';
    btnStay.style.display = 'none';
  }
}
