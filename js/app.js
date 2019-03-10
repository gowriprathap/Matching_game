//javascript file
var t; //the time variable
//all the cards
var cards = ['fa-diamond', 'fa-diamond','fa-paper-plane-o', 'fa-paper-plane-o','fa-anchor', 'fa-anchor','fa-bolt', 'fa-bolt','fa-cube', 'fa-cube','fa-leaf', 'fa-leaf','fa-bicycle', 'fa-bicycle','fa-bomb', 'fa-bomb',]
function generateCard(card)
{
  return `<li class="card" data-card = "${card}"><i class="fa ${card}"></i></li>`; //generating the cards
}
function shuffle(array) //built in function to shuffle cards
{
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var win = 0; //variable to keep track of matched cards
var seconds = 0; //seconds for timer
var minutes = 0; //minutes for timer
var hours = 0; // hours for timer
var stars = 3; //star rating
function initGame()
 {
   var deck = document.querySelector('.deck'); //accessing deck from index1.html
   var cardHTML = shuffle(cards).map(function(card) //calling the shuffle function
   {
     return generateCard(card);
   });
   deck.innerHTML = cardHTML.join('');
 }
initGame();
var allCards = document.querySelectorAll('.card');
var openCards = []; //the array to store selected cards
var moves = 0; //each card selected increases the moves by one
allCards.forEach(function(card) //for each card
{
  card.addEventListener('click', function(e) //adding event listener fo each click
  {
    if (moves == 0){
    timer1(); //start the timer the first move
  }
  if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) //if the cards are closed
    {
      moves++; //incrementing the move
      document.getElementById('moves1').innerHTML = moves + " moves"; //displaying the number of moves
      openCards.push(card); //pushing card to array
      card.classList.add('open', 'show'); //opening and showing the card
      if (openCards.length == 2) //if two cards are selected
      {
        if(openCards[0].dataset.card == openCards[1].dataset.card) //if both cards are the same
          {
            openCards[0].classList.add('match');
            openCards[0].classList.add('show');
            openCards[0].classList.add('open');
            openCards[1].classList.add('match');
            openCards[1].classList.add('show');
            openCards[1].classList.add('open'); //adding match, show and open to the matching cards
            win++; //the cards matched
            openCards = []; //emptying array for adding new set of cards
          }
         else //if cards are not matching
          {
            setTimeout(function() //setting time for cards to disappear
              {
                 openCards.forEach(function(card)
                   {
                      card.classList.remove('open', 'show'); //hide cards again
                   });
                 openCards = [];
              }, 1000); //hide cards after 1000 milliseconds
          }
         if (win == 8) //if all cards are matched
           {
              gameOver(); //game has been won
           }
         if (moves == 20) //if 20 moves have been used one star disappears
           {
              var x = document.getElementById('stars1'); //the last star
              if (x.style.display === "none")
                {
                  x.style.display = "block";
                }
              else
                {
                  x.style.display = "none";
                }
                stars--; //star rating becomes 2
           }
        if (moves == 40) //after 40 moves one more star disappears
           {
             var x = document.getElementById('stars2'); //the second last star
             if (x.style.display === "none")
              {
                x.style.display = "block";
              }
             else
              {
                x.style.display = "none";
              }
              stars--; //star rating become 1
           }
        if (moves == 60) //after 60 moves one more star disappears
           {
             var x = document.getElementById('stars3'); //the first star
             if (x.style.display === "none")
              {
                 x.style.display = "block";
              }
             else
              {
                 x.style.display = "none";
              }
              stars--; //star rating becomes 0
           }
      }
    }
  });
});
function gameOver() //after all cards match
{
  clearTimeout(t);
  var modal = document.getElementById('finalModal'); //modal is displayed
  document.getElementById("insert").innerHTML = "Congratulations. You have finished the game in " + minutes + " minutes and " + seconds + " seconds and in " + moves + " moves, with a " + stars + " star rating. Do you want to play again?";
  var span = document.getElementsByClassName("close")[0]; //closing modal
  modal.style.display = "block";
  span.onclick = function() //close modal on clicking close button
  {
    modal.style.display = "none";
  }
  window.onclick = function(event) //close modal on clicking outside the window
  {
    if (event.target == modal)
    {
      modal.style.display = "none";
    }
  }
}
function refreshPage() //refresh page on clicking refresh button or playing again
{
   location.reload(); //reload page
}
function timer1() //stopwatch function
{
   var h3 = document.getElementsByTagName('h3')[0]; //the timer
   function add()
   {
    seconds++; //adding seconds
    if (seconds >= 60) //more than 60 seconds should be converted to minute
     {
        seconds = 0;
        minutes++;
        if (minutes >= 60) //more that 60 minutes should be converted to hours
        {
            minutes = 0;
            hours++;
        }
    }
    //incrementing time
      h3.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      timer();
    }
    function timer()
    {
      t = setTimeout(add, 1000);
    }
timer();
}
