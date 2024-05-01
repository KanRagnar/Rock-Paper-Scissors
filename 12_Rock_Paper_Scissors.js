let playerChoice;
let pcChoice;

function pcMove(){
let randomNum= Math.random();
if(randomNum<1/3){
  pcChoice='Rock';
}else if(randomNum<2/3){
  pcChoice='Paper';
}
else
  pcChoice='Scissors';
return pcChoice;
}

let Score=JSON.parse(localStorage.getItem('Score')) ||{
Wins: 0,
Loses: 0,
Ties: 0
};
updateScoreElement();


function Result(){
//Checks for a tie
let result='';
if(playerChoice===pcChoice){
  Score.Ties++;
  result='It\'s a tie';          
}
//Checks when player picks Rock
if(playerChoice==='Rock' && pcChoice==='Paper'){
  Score.Loses++;
  result='You lose.';
}
if(playerChoice==='Rock' && pcChoice==='Scissors'){
  Score.Wins++;
  result='You win';
}

//Checks when player picks Paper
if(playerChoice==='Paper' && pcChoice==='Scissors'){
  Score.Loses++;
  result='You lose.';
}
if(playerChoice==='Paper' && pcChoice==='Rock'){
  Score.Wins++;
  result='You win';
}

//Checks when player picks Scissors
if(playerChoice==='Scissors' && pcChoice==='Rock'){
  Score.Loses++;
  result='You lose.';
}
if(playerChoice==='Scissors' && pcChoice==='Paper'){
  Score.Wins++;
  result='You win'
}
localStorage.setItem('Score', JSON.stringify(Score));
document.querySelector('.js-moves')
  .innerHTML=`You <img src="RockPaperScissorsImgs/${playerChoice}-emoji.png"> <img src="RockPaperScissorsImgs/${pcChoice}-emoji.png"> Computer`;

document.querySelector('.js-result').innerHTML=result;
updateScoreElement();
}


function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML=`Wins:${Score.Wins} Losses:${Score.Loses} Ties: ${Score.Ties}`;
}

function ResetScore(){
  Score.Loses=0;
  Score.Wins=0;
  Score.Ties=0;
  localStorage.removeItem('Score');
  updateScoreElement();
}

let isAutoPlaying= false;
let intervalId;

function autoplay(){
  if(!isAutoPlaying){
    intervalId =setInterval( () =>{
      playerChoice= pcMove();
      const playerMove = pcMove();
      Result();
      isAutoPlaying= true;
    }, 1000)
  } else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
}