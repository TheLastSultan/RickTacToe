var Board = require("./board");
var ComputerPlayer = require("./computer");
var HumanPlayer = require("./human");

// import Board from "./board";
// import ComputerPlayer from "./computer"
// import HumanPlayer from "./human"

class Game{

    constructor(){
        this.player1 = ComputerPlayer;
        this.player2 = HumanPlayer;
        this.p1Mark = "X";
        this.p2Mark = "O";
        this.currentPlayer = ComputerPlayer;
        this.board = Board;
    }

    play(){
        
        this.currentPlayer.display(this.board.grid);
        console.log("stop1")
       
        let isItOver = false

        while (isItOver === false){
            this.playTurn();
            isItOver = this.board.isOver();
        };

        if( this.board.anyWinner(this.p1Mark)){
            console.log("Player 1 wins");
        }else if (this.board.anyWinner(this.P2Mark)){
            console.log("Player 2 wins");
        }else{
            console.log("Cat's Game!");
        };

    }

    playTurn(){
        this.currentPlayer.display(this.board.grid)
        let move = this.currentPlayer.getMove()
        let mark = this.currentPlayer.mark
        this.board.p(move,mark)
        this.display()
        this.switchPlayers();
    }

    display(){
        console.log(this.board.grid[0])
        console.log(this.board.grid[1])
        console.log(this.board.grid[2])
        console.log( "/n")
    }
    
    switchPlayers(){
        if (this.currentPlayer === ComputerPlayer){
            this.currentPlayer = HumanPlayer;
        } else{
            this.currentPlayer = ComputerPlayer;
        };
    }

}



let test = new Game()
test.play()
