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

Board = new Board()
module.exports = Board

