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


HumanPlayer = new HumanPlayer()
module.exports = HumanPlayer



