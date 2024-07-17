// scripting logic goes here

const board = (function () 
{
    let gameBoard = [];
    const addValue = (value) => {
        gameBoard.push(value);
    };
    const clear = () => {
        gameBoard = [];
    };
    const getLen = () => {
        const lenght = gameBoard.length;
        return lenght;
    }
    return {addValue, clear, getLen};
})();

function players()
{    
    let playerChoices = [];
    const addChoice = (value) => {
        playerChoices.push(value);
    };
    const getChoices = () => {
        const currentValues = playerChoices;
        return currentValues;
    };
    const clearChoices = () => {
        playerChoices = [];
    };
    return {addChoice, getChoices, clearChoices};
}

const p1 = players();
const p2 = players();

for(let i = 0; i < 9; i++)
{
    document.getElementById(`${i}`).addEventListener('click', (event) => {
        play(event);
    });
}

function play(event)
{
    const input = parseInt(event.target.id);
    const len = board.getLen();
    let winner;

    if(len % 2)
        p2.addChoice(input);
    else
        p1.addChoice(input);

    board.addValue(input);
    replace(event, len);

    if(len > 3 && (winner = checkWinner())) //default return of checkWinner is false
    {
        end(winner);
        return;
    }   
    else if(len == 8)
    {
        end(winner);
        return;
    }
}

function replace(event, len)
{
    const index = event.target;
    index.disabled = true;
    index.style.backgroundSize = '200px';
    if(len % 2)
        index.style.backgroundImage = 'url("assets/letter-o_9150573.png")';
    else
        index.style.backgroundImage = 'url("assets/cross_391116.png")';
}

function checkWinner()
{
    const winCombos = {
        cond1: [0, 3, 6],
        cond2: [0, 1, 2],
        cond3: [0, 4, 8],
        cond4: [2, 5, 8],
        cond5: [2, 4, 6],
        cond6: [6, 7, 8],
        cond7: [3, 4, 5],
        cond8: [1, 4, 7]
    };
    const p1Marks = p1.getChoices();
    const p2Marks = p2.getChoices();
    for(combo in winCombos)
    {    
        const checkWin = winCombos[combo];
        const checkP1 = p1Marks.filter((item) => checkWin.includes(item)).sort();
        const checkP2 = p2Marks.filter((item) => checkWin.includes(item)).sort();        
        // console.log(`checkp1:${checkP1}, checkp2:${checkP2}`);
        if(checkP1.join('') === checkWin.join(''))
            return 'p1';
        else if(checkP2.join('') === checkWin.join(''))
            return 'p2';
    }
    return false;
}

function end(winner)
{
    const dialog = document.querySelector('dialog');
    const image = document.querySelector('#winner');
    const declare = document.querySelector('#declare');
    if(winner === 'p1')
    {
        image.setAttribute('src', 'assets/cross_391116.png');
        declare.textContent = "The G.O.A.T\nLEEEOO MESSSSIIII!!!";
    }
    else if(winner === 'p2')
    {
        image.setAttribute('src', 'assets/letter-o_9150573.png');
        declare.textContent = "Good job!\nif only he did this good in WCs. :o";
    }
    else
    {
        image.setAttribute('hidden', true);
        declare.textContent = "Its a TIE!! and the tie breaker is the WC count so the GOAT wins obviously. hehe!";
    }
    dialog.showModal();
}