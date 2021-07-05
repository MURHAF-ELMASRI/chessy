import moveStone from './moveStone';
import dangerOnStone from './dangerOnStone';
import cloneDeep from 'clone-deep';

//this utility function is to check if any  openent rock
//could make danger on the king
//it answer the question : Is there any danger by the oponent if a stone go from src to dest

//how : suppose the stone went the the targeted square ---> check if there is any danger of king

export default function DangerOnKing(board, src_i, src_j, dest_i, dest_j) {
    if (!inRange(dest_i, dest_j)) return false;
    //find the position of the king
    const kingColor = board[src_i][src_j].stone.color;
    const newState = cloneDeep(board);
    moveStone(newState, src_i, src_j, dest_i, dest_j);

    //I should memoize the location of the king
    const [king_i, king_j] = findKing(newState, kingColor);

    //I shouldn't adjest the original board state
    const dos = dangerOnStone(newState, king_i, king_j);

    return dos;
}

function findKing(board, kingColor) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const x = board[i][j];
            if (
                x.stone &&
                x.stone.color === kingColor &&
                x.stone.type === 'king'
            )
                return [i, j];
        }
    }
}
function inRange(i, j) {
    return i >= 0 && j >= 0 && i < 8 && j < 8;
}
/**
 * @typedef {{id:String,color:Boolean,stone?:{id:Number,color:Boolean,type:String}}} square
 * @param {Array<square[]>} board
 * @param {*} src_i
 * @param {*} src_j
 * @param {*} dest_i
 * @param {*} dest_j
 * @returns {Boolean}
 */
