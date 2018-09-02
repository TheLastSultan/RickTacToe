class Board{

    constructor(){
        this.grid = [   [null, null, null], 
                        [null, null, null],
                        [null, null ,null]];
                // [    [[0,0], [0,1], [0,2], 
                //      [[1,0], [1,1], [1,2],
                //      [[2,0], [2,1], [2,2]]

    }

    p(pos,mark){  // p([0,0],"X") or p([0,0],"O")
        let a = pos[0]
        let b = pos[1]
        this.grid[a][b] = mark;
    } // UNTESTED !!!!                   
    
    isEmpty(){
      for (var i = 0 ; i < this.grid.length ; i++){
        for (var j = 0 ; j < this.grid.length; j ++){
            if(this.grid[i][j] === null){
              return true; 
            };
        };
      };
      return false;
    } //tested

    transposeArray(array){
      let arrayLength = this.grid.length
      var newArray = [];
      for(var i = 0; i < array.length; i++){
          newArray.push([]);
      };

      for(var i = 0; i < array.length; i++){
          for(var j = 0; j < arrayLength; j++){
              newArray[j].push(array[i][j]);
          };
      };

      return newArray;
    } //tested

    winnerHorizontal(mark){
      for(var i =0; i < this.grid.length; i++){
            if(this.grid[i].every((el)=> el == mark)){
              return true;
            }; 
        };
      return false; 
    } // tested

    winnerVertical(mark){
      let grid = this.transposeArray(this.grid)
      for(var i =0; i < this.grid.length; i++){
            if(grid[i].every((el)=> el == mark)){
              return true;
            }; 
        };
      return false; 
    } //tested

  winnerDiagonalLeft(mark){
    for (var i = 0 ; i < this.grid.length ; i++){
      if (this.grid[i][i] != mark) return false
    }
    return true 
  } //tested 

  winnerDiagonalRight(mark){
    if (this.grid[0][2] != mark){
      return false
    }else if (this.grid[1][1] != mark){
      return false
    }else if (this.grid[2][0] != mark){
      return false}
    return true
  } //tested

  anyWinner(mark){
    if (this.winnerDiagonalLeft(mark) ==true){ 
      console.log("Left Diagonal Win for " +mark)
      return true;
    }else if (this.winnerDiagonalRight(mark)==true){
      console.log("Right Diagonal Win for " + mark)
      return true;
    }else if (this.winnerHorizontal(mark)==true){
      console.log("Horizontal win " +mark) 
      return true;
    }else if (this.winnerVertical(mark)==true){
      console.log("Vertical Win for " +mark)
      return true;
    };
    return false 
  } //tested 

  isOver(){
    if (this.anyWinner("X")){
      return true;
    }else if (this.anyWinner("O")){
      return true;
    }else if (this.isEmpty() === false){
      return true;
    }
    return false;
  } //UNTESTED !!!!! 

}


class ComputerPlayer{

    constructor(){
        this.name = "ComputerPlayer";
        this.mark = "X";
        this.opponentMark = "O";
        this.mode = 3 // Difficulty Level 3..see notes below
        this.board =    [   [null, null, null], 
                            [null, null, null],
                            [null, null, null]];
    }
   

    getMove(){
        
        //  Difficulty Levels:
        
        // 3..Hardest: Prioritizes: 1) Wins , 2) Defense, 3) Corners ,   
        if (this.mode == 3){
            if (this.checkWin() != false){
                return this.checkWin(); 
            } 
            else if (this.checkDefense() != false){
                return this.checkDefense(); 
            }  
            else{
                return this.checkCornersThanRandom();     
            }
        };

        // 2..Medium: Prioritizes: 1) Wins, 2) Defense
        if (this.mode == 2){
            if (this.checkWin() != false){
                return this.checkWin(); 
            } 
            else if (this.checkDefense() != false){
                return this.checkDefense(); 
            }  
            else{
                return this.moveRandom();     
            }
        };
        // 1..Easy: Prioritizes: 1) Defense , 2) Random
        if (this.mode == 1){
            if (this.checkDefense() != false){
                return this.checkDefense(); 
            }  
            else{
                return this.moveRandom();     
            }
        };

    }

    display(imported_board){
        this.board = imported_board
        
        // console.log(this.board[0])
        // console.log(this.board[1])
        // console.log(this.board[2])
    }

    checkWin(){
        let availablePositions = this.getAllMoves()
        for (var i = 0 ; i < availablePositions.length ; i++){
            let checkBoard = this.checkMove(availablePositions[i]);
            if (this.anyWinner(this.mark,checkBoard) == true){
                return availablePositions[i]
            }
        }
        return false
    } // TESTED


    checkMove(pos){
        let newBoard = this.board.map(a => Object.assign([], a));
        let a = pos[0];
        let b = pos[1];
        newBoard[a][b] = this.mark;
        return newBoard; 
    } // TESTED

    checkOpponentMove(pos){
        let newBoard = this.board.map(a => Object.assign([], a));
        let a = pos[0];
        let b = pos[1];
        newBoard[a][b] = this.opponentMark;
        return newBoard; 
    } // TESTED

    getAllMoves(){
        let availablePositions = []
        let board = this.board
        for (var i = 0 ; i < 3; i++){
            for (var j = 0 ; j < 3; j++){
                if (this.board[i][j] == null){
                    availablePositions.push([i,j])
                }
            }
        }
        return availablePositions
    } // TESTED

    checkDefense(){
        let availablePositions = this.getAllMoves()
       
        for (var i = 0 ; i < availablePositions.length ; i++){
            let checkBoard = this.checkOpponentMove(availablePositions[i]);
            if (this.anyWinner(this.opponentMark,checkBoard) == true){
                return availablePositions[i]
            }
        }
        return false
    } // TESTED

    checkCornersThanRandom(){
        let available_moves = this.getAllMoves()
              const corners = [[0,0],[2,2],[0,2],[2,0]];
              for (var i = 0 ; i < available_moves.length ; i++){
                for (var j = 0 ; j < available_moves.length; j ++){
                    if(corners[i][0] == available_moves[j][0] && corners[i][1] == available_moves[j][1]){
                    return [corners[i][0], corners[i][1]]; 
                    }
                }
              }
        return this.moveRandom()
    } // TESTED
   
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } //TESTED
      
      
    moveRandom(){
        let availableMoves = this.getAllMoves()
        let number = this.getRandomInt(0,availableMoves.length-1)
        return [availableMoves[number][0], availableMoves[number][1]]
    } // TESTED
      
      
    anyWinner(mark,grid){
      if (this.winnerDiagonalLeft(mark, grid) ==true){ 
        console.log("Left Diagonal Win for " +mark)
        return true;
      }else if (this.winnerDiagonalRight(mark, grid)==true){
        console.log("Right Diagonal Win for " + mark)
        return true;
      }else if (this.winnerHorizontal(mark, grid)==true){
        console.log("Horizontal win " +mark) 
        return true;
      }else if (this.winnerVertical(mark, grid)==true){
        console.log("Vertical Win for " +mark)
        return true;
      };
      return false 
    } //tested 

    transposeArray(array){
        let arrayLength = array.length
        var newArray = [];
        for(var i = 0; i < array.length; i++){
            newArray.push([]);
        };
  
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < arrayLength; j++){
                newArray[j].push(array[i][j]);
            };
        };
  
        return newArray;
      } //tested
  
    winnerHorizontal(mark,grid){
        for(var i =0; i < grid.length; i++){
                if(grid[i].every((el)=> el == mark)){
                return true;
                }; 
            };
        return false; 
    } // tested

    winnerVertical(mark,grid){
    let transposedGrid = this.transposeArray(grid)
    for(var i =0; i < grid.length; i++){
            if(transposedGrid[i].every((el)=> el == mark)){
            return true;
            }; 
        };
    return false; 
    } //tested
  
    winnerDiagonalLeft(mark,grid){
      for (var i = 0 ; i < grid.length ; i++){
        if (grid[i][i] != mark) return false
      }
      return true 
    } //tested 
  
    winnerDiagonalRight(mark,grid){
      if (grid[0][2] != mark){
        return false
      }else if (grid[1][1] != mark){
        return false
      }else if (grid[2][0] != mark){
        return false}
      return true
    } //tested
  
}
class HumanPlayer{

    constructor(){
        this.name = "HumanPlayer";
        this.mark = "O";
        this.board =    [   [null, null, null], 
                            [null, null, null],
                            [null, null, null]];
    }

    p(pos,mark){  // p([0,0],"X") or p([0,0],"O")
        let a = pos[0]
        let b = pos[1]
        this.board[a][b] = mark;
    }

    display(imported_board){
        this.board = imported_board

        // console.log(this.board[0])
        // console.log(this.board[1])
        // console.log(this.board[2])
    }

    getAllMoves(){
        let availablePositions = []
        for (var i = 0 ; i < 3; i++){
            for (var j = 0 ; j < 3; j++){
                if (this.board[i][j] == null){
                    availablePositions.push([i,j])
                }
            }
        }
        return availablePositions
    }

    moveRandom(){
        let availableMoves = this.getAllMoves()
        let number = this.getRandomInt(0,availableMoves.length-1)
        return [availableMoves[number][0], availableMoves[number][1]]
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } //TESTED

    getMove(){
        let testinput = false

        if (testinput === false){
            return this.moveRandom()
        }
        
    }
}

class Game{

    constructor(){
        this.player1 = Computerplayer;
        this.player2 = Humanplayer;
        this.p1Mark = "X";
        this.p2Mark = "O";
        this.currentPlayer = Computerplayer;
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
        if (this.currentPlayer === Computerplayer){
            this.currentPlayer = Humanplayer;
        } else{
            this.currentPlayer = Computerplayer;
        };
    }

}



var Grid = new Board ()
var Computerplayer = new ComputerPlayer()
var Humanplayer = new HumanPlayer()

var test = new Game()
test.play()





