//utility function return the position of stone which make danger on specific square
//I may repeate my self here and do the same logic in move stone but although it is similer here they are different

const stoneMap = {
    pawn: 3,
    rook: 4,
    knight: 5,
    bishop: 6,
    queen: 7,
    king: 8,
};

/*
    return 
    0: empty
    1: friend
    3: pawn
    4: rook
    5: knight
    6: bishop
    7 : queen
    8 : king
*/
const squareState = (sq, color) => {
    if (sq.stone)
        if (sq.stone.color === color) return 1;
        else return stoneMap[sq.stone.type];
    else return 0;
};
function inRange(i, j) {
    return i >= 0 && j >= 0 && i < 8 && j < 8;
}
/**
 *
 * @typedef {{id:String,color:Boolean,stone?:{id:Number,color:Boolean,type:String}}} square
 * @param {Array<square[]>} board
 * @param {Number} y - repreest the y-axis of stone
 * @param {*} x
 * @returns
 */
//return true of false
export default function dangerOnStone(board, y, x) {
    var colorOfStone;
    if (board[y][x].stone) colorOfStone = board[y][x].stone.color;
    else return false;
    //scan vertically ----------
    for (let i = y - 1; i >= 0; i--) {
        if (!inRange(i, x)) break;
        const sT = squareState(board[i][x], colorOfStone);
        if (sT === 7 || sT === 4 || (sT === 8 && i === y - 1)) return true;
        else if (sT !== 0) break; //every thing out of king,rook,queen will not make any danger
    }
    for (let i = y + 1; i < 8; i++) {
        if (!inRange(i, x)) break;
        const sT = squareState(board[i][x], colorOfStone);
        if (sT === 7 || sT === 4 || (sT === 8 && i === y + 1)) return true;
        else if (sT !== 0) break;
    }
    //-------------------------
    //scan Horizantlly------------
    for (let j = x - 1; j >= 0; j--) {
        if (!inRange(y, j)) break;
        const sT = squareState(board[y][j], colorOfStone);
        if (sT === 7 || sT === 4 || (sT === 8 && j === x - 1)) return true;
        else if (sT !== 0) break;
    }
    for (let j = x + 1; j < 8; j++) {
        if (!inRange(y, j)) break;
        const sT = squareState(board[y][j], colorOfStone);
        if (sT === 7 || sT === 4 || (sT === 8 && j === x + 1)) return true;
        else if (sT !== 0) break;
    }
    //--------------
    //scan Digonally
    for (let i = y + 1, j = x + 1; i < 8 && j < 8; i++, j++) {
        if (!inRange(i, j)) break;
        const sT = squareState(board[i][j], colorOfStone);
        if (sT === 7 || sT === 6 || (sT === 8 && i === y + 1 && j === x + 1))
            return true;
        else if (sT !== 0) break;
    }
    for (let i = y - 1, j = x - 1; i >= 0 && j >= 0; i--, j--) {
        if (!inRange(i, j)) break;
        const sT = squareState(board[i][j], colorOfStone);
        if (sT === 7 || sT === 6 || (sT === 8 && i === y - 1 && j === x - 1))
            return true;
        else if (sT !== 0) break;
    }
    //-----------
    //scan AntiDignasally
    for (let i = y - 1, j = x + 1; i >= 0 && j < 8; i--, j++) {
        if (!inRange(i, j)) break;
        const sT = squareState(board[i][j], colorOfStone);
        if (sT === 7 || sT === 6 || (sT === 8 && i === y - 1 && j === x + 1))
            return true;
        else if (sT !== 0) break;
    }
    for (let i = y + 1, j = x - 1; i < 8 && j >= 0; i++, j--) {
        if (!inRange(i, j)) break;
        const sT = squareState(board[i][j], colorOfStone);
        if (sT === 7 || sT === 6 || (sT === 8 && i === y + 1 && j === x - 1))
            return true;
        else if (sT !== 0) break;
    }
    //----------------------
    //scan for L ( kinght move)
    const knightJump = [
        [-2, -1],
        [-2, 1],
        [2, -1],
        [2, 1],
    ];
    for (let index = 0; index < knightJump.length; index++) {
        const [i, j] = knightJump[index];
        if (
            inRange(i + y, j + x) &&
            squareState(board[i + y][j + x], colorOfStone) === 5
        )
            return true;
    }

    //---------------
    //scan for pawn
    if (
        inRange(y - 1, x - 1) &&
        squareState(board[y - 1][x - 1], colorOfStone) === 3
    )
        return true;
    if (
        inRange(y - 1, x + 1) &&
        squareState(board[y - 1][x + 1], colorOfStone) === 3
    )
        return true;
    //------------
    return false;
}
