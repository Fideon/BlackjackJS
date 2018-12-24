/// BlackJack

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
              'Ten', 'Nine', 'Eight', 'Seven',
              'Six', 'Five', 'Four', 'Three', 'Two',];

let textArea = document.getElementById('txtArea');
let btnNewGame = document.getElementById('btnNewGame');
let btnHit = document.getElementById('btnHit');
let btnStay = document.getElementById('btnStay');

btnHit.style.display = 'none';
btnStay.style.display = 'none';

btnNewGame.addEventListener('click', function() 
{
  textArea.innerText = 'Started...';
  btnNewGame.style.display = 'none';
  btnHit.style.display = 'inline';
  btnStay.style.display = 'inline';
})

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

function getNextCard()
{
  return deck.shift();
}

let deck = createDeck();

function getCardString(card)
{
  return card.value + " of " + card.suit;
}

//let card1 = "Ace of Spades",
//    card2 = "Ten of Hearts";

let playerCards = [getNextCard(), getNextCard()];
    
console.log("Welcome to Blackjack!");
console.log("You are dealt: ");
console.log(" " + getCardString(playerCards[0]));
console.log(" " + getCardString(playerCards[1]));
