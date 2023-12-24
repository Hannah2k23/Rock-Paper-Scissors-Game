let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};



updateScoreElement();

let isAutoPlaying = false;
let IntervalId;

function autoplay(){
    if(!isAutoPlaying){
        IntervalId = setInterval(() => { //arrow func: pass func into another func
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

    } else{
        clearInterval(IntervalId); //func used to stop the setInterval() func
        isAutoPlaying = false;
    }
}

function playGame(playerMove){
    const compMove = pickComputerMove();

    let result = '';

    if(playerMove === 'scissors'){
        if(compMove === 'rock')
        result = 'You lose.';
        else if(compMove === 'paper')
        result = 'You win.';
        else if(compMove === 'scissors')
        result = 'Tie.';
        }

    else if(playerMove === 'paper'){
    
        if(compMove === 'rock')
        result = 'You win.';
        else if(compMove === 'paper')
        result = 'Tie.';
        else if(compMove === 'scissors')
        result = 'You lose.';
        }

    else if(playerMove === 'rock'){

        if(compMove === 'rock')
        result = 'Tie.';
        else if(compMove === 'paper')
        result = 'You lose.';
        else if(compMove === 'scissors')
        result = 'You win.';
    }

    if((result === 'You win.')){
        score.wins++;
    }
    else if(result === 'You lose.'){
        score.losses++;
    }
    else if(result === 'Tie.'){
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score)); //saved into local storage when code is run
                                //to convert score object as string 

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${compMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement(){
    document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins},     Losses: ${score.losses},     Ties: ${score.ties}`;
}

function pickComputerMove(){
    const rand = Math.random(); 
    let compMove = '';

    
    if(rand >= 0 && rand < 1/3){
        compMove = 'rock';
    }
    else if(rand >= 1/3 && rand < 2/3){
        compMove = 'paper';
    }
    else if(rand >= 2/3 && rand < 1){
        compMove = 'scissors';
    }

    return compMove;
}