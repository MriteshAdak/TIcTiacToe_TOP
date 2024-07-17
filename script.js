// scripting logic goes here

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

const board = (function () 
{
    let gameBoard = [];
    const addValue = (value) => {
        gameBoard.push(value);
    };
    const clear = () => {
        gameBoard = [];
    };
    const getLen = () => 
        gameBoard.length;
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

function checkWinner()
{
    const p1Marks = p1.getChoices();
    const p2Marks = p2.getChoices();
    for(combo in winCombos)
    {    
        const checkWin = winCombos[combo];
        const checkP1 = p1Marks.filter((item) => checkWin.includes(item)).sort();
        const checkP2 = p2Marks.filter((item) => checkWin.includes(item)).sort();        
        // console.log(`checkp1:${checkP1}, checkp2:${checkP2}`);
        if(checkP1.join('') === checkWin.join(''))
            return "p1";
        else if(checkP2.join('') === checkWin.join(''))
            return "p2";
    }
    return false;
}

// const moves = [1,0,5,3,7,8,6,2,4];

// function play()
// {
//     for(let i = 0; i < moves.length; i++)
//     {
//         if(i % 2)
//             p2.addChoice(moves[i]);
//         else
//             p1.addChoice(moves[i]);

//         let pc1 = p1.getChoices();
//         let pc2 = p2.getChoices();
//         console.log(`p1:${pc1} p2:${pc2}`);
//         board.addValue(moves[i]);
        
//         let winner;
//         if(i > 4)
//         {
//             if(winner = checkWinner())
//                 return winner;
//         }
//     }
//     return "no one";
// }

// const gamer = play();
// console.log("the winner is: " + gamer);

for(let i = 0; i < 9; i++)
{
    document.getElementById(`${i}`).addEventListener('click', (event) => {
        play(event);
    });
}

function play(event)
{
    const input = parseInt(event.target.id);
    console.log(input);
    console.log(typeof(input));
    // let winner;
    // if(board.getGameBoardLength() > 4)
    //     if(winner = checkWinner())
    //         return winner;
    
    // if(board.getGameBoardLength() % 2)
    //     p2.addChoice(move);
    // else
    //     p1.addChoice(move);

    // board.addToGameBoard(move);
}
