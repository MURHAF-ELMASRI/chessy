import dangerOnKing from './DangerOnKing';

// this function have the whole buisness of moving the stones

//utilities
function range(i, j) {
    return i >= 0 && j >= 0 && i < 8 && j < 8;
}

/**
 * if function return:
 * 1- means it is not inside the range
 * 2- it inside the range but the square is not empty
 * 3- the square where it will go is friend
 * 4- the square where it will go is opponent
 * return the state of the square
 */

//take board:board state,stoneColor:stone color, i: y axis of stone , j : x axis of stone.

function checkToGo(board, stoneColor, i, j) {
    if (!range(i, j)) return 1;
    if (!board[i][j].stone) return 2;
    if (board[i][j].stone.color === stoneColor) return 3;
    return 4;
}
//Note : there is better approch to make it less coupling but I thought this will be faster,
// instead of passing the val we could return array and then adding the returned value to the array which may take more operation
function addVertical(board, stoneColor, val, i, j) {
    for (let k = i + 1; k < 8; k++) {
        const pass = checkToGo(board, stoneColor, k, j);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, k, j)
        )
            break;
        val.push(board[k][j].id);
        if (pass === options['opponent']) break;
    }
    for (let k = i - 1; k >= 0; k--) {
        const pass = checkToGo(board, stoneColor, k, j);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, k, j)
        )
            break;
        val.push(board[k][j].id);
        if (pass === options['opponent']) break;
    }
}

function addHorizontal(board, stoneColor, val, i, j) {
    for (let k = j + 1; k < 8; k++) {
        const pass = checkToGo(board, stoneColor, i, k);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, i, k)
        )
            break;
        val.push(board[i][k].id);
        if (pass === options['opponent']) break;
    }
    for (let k = j - 1; k >= 0; k--) {
        const pass = checkToGo(board, stoneColor, i, k);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, i, k)
        )
            break;
        val.push(board[i][k].id);
        if (pass === options['opponent']) break;
    }
}

function addDiagonal(board, stoneColor, val, i, j) {
    for (let a = i + 1, b = j + 1; a < 8 && b < 8; a++, b++) {
        const pass = checkToGo(board, stoneColor, a, b);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, a, b)
        )
            break;
        val.push(board[a][b].id);
        if (pass === options['opponent']) break;
    }
    for (let a = i - 1, b = j - 1; a >= 0 && b >= 0; a--, b--) {
        const pass = checkToGo(board, stoneColor, a, b);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, a, b)
        )
            break;
        val.push(board[a][b].id);
        if (pass === options['opponent']) break;
    }
}
function addAntiDiagonal(board, stoneColor, val, i, j) {
    for (let a = i - 1, b = j + 1; a >= 0 && b < 8; a--, b++) {
        const pass = checkToGo(board, stoneColor, a, b);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, a, b)
        )
            break;
        val.push(board[a][b].id);
        if (pass === options['opponent']) break;
    }
    for (let a = i + 1, b = j - 1; a < 8 && b >= 0; a++, b--) {
        const pass = checkToGo(board, stoneColor, a, b);
        if (
            pass === options['friend'] ||
            pass === options['outOfRange'] ||
            dangerOnKing(board, i, j, a, b)
        )
            break;
        val.push(board[a][b].id);
        if (pass === options['opponent']) break;
    }
}
//this object work with check to go function in order to specifiy why function has been violated
const options = {
    outOfRange: 1,
    empty: 2,
    friend: 3,
    opponent: 4,
};
/*------------object of functions for every stone------------------ */
//take position of stone and
//return list of square Where stone can go

export const move = {
    king: (board, stoneColor, i, j) => {
        const val = [];
        //special case for king
        //TODO : allow it if the king in the first move
        if (
            (stoneColor && i === 7 && j === 4) ||
            (!stoneColor && i === 7 && j === 3)
        ) {
            let control = true;
            //right flip
            if (
                checkToGo(board, stoneColor, 7, 7) === 3 &&
                board[7][7].stone.type === 'rook'
            ) {
                for (let k = j + 1; k < 6; k++)
                    if (board[i][k].stone) {
                        control = false;
                        break;
                    }
                if (control && !dangerOnKing(board, i, j, i, 6))
                    val.push(board[i][6].id);
            }

            //left flip
            control = true;
            if (
                checkToGo(board, stoneColor, 7, 0) === 3 &&
                board[7][0].stone.type === 'rook'
            ) {
                for (let k = j - 1; k >= 1; k--)
                    if (board[i][k].stone) {
                        control = false;
                        break;
                    }
                if (control && !dangerOnKing(board, i, j, i, 1))
                    val.push(board[i][1].id);
            }
        }

        [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
        ].forEach((e) => {
            const [iTarget, jTarget] = e;
            const pass = checkToGo(board, stoneColor, i + iTarget, j + jTarget);

            if (
                (pass === options['empty'] || pass === options['opponent']) &&
                !dangerOnKing(board, i, j, i + iTarget, j + jTarget)
            )
                val.push(board[i + iTarget][j + jTarget].id);
        });
        return val;
    },
    queen: (board, stoneColor, i, j) => {
        const val = [];
        addVertical(board, stoneColor, val, i, j);
        addHorizontal(board, stoneColor, val, i, j);
        addDiagonal(board, stoneColor, val, i, j);
        addAntiDiagonal(board, stoneColor, val, i, j);
        return val;
    },
    rook: (board, stoneColor, i, j) => {
        const val = [];
        addVertical(board, stoneColor, val, i, j);
        addHorizontal(board, stoneColor, val, i, j);
        return val;
    },
    bishop: (board, stoneColor, i, j) => {
        const val = [];
        addDiagonal(board, stoneColor, val, i, j);
        addAntiDiagonal(board, stoneColor, val, i, j);
        return val;
    },
    /**
     *
     * @param {Array(Array)} board
     * @param {Number} i
     * @param {Number} j
     * @param {boolean} stoneColor
     */
    knight: (board, stoneColor, i, j) => {
        const val = [];
        [
            [-2, -1],
            [-2, 1],
            [2, -1],
            [2, 1],
        ].forEach((e) => {
            //it is not just for pos it is 8 but we could reverse i and j to get the other one
            const [iTarget, jTarget] = e;
            let pass = checkToGo(board, stoneColor, i + iTarget, j + jTarget);

            if (
                (pass === options['empty'] || pass === options['opponent']) &&
                !dangerOnKing(board, i, j, i + iTarget, j + jTarget) &&
                range(i + iTarget, j + jTarget)
            )
                val.push(board[i + iTarget][j + jTarget].id);
            pass = checkToGo(board, stoneColor, i + jTarget, j + iTarget);

            if (
                (pass === options['empty'] || pass === options['opponent']) &&
                !dangerOnKing(board, i, j, i + jTarget, j + iTarget) &&
                range(i + jTarget, j + iTarget)
            )
                val.push(board[i + jTarget][j + iTarget].id);
        });
        return val;
    },
    //as pawn moves is affected by stone player color we have to handle this use
    pawn: (board, stoneColor, i, j) => {
        if (!board[i][j].stone) return [];
        const val = [];
        const pawnMove = stoneColor ? 1 : -1;
        //check if stone could eat the oppoenet in the upper right
        if (
            checkToGo(board, stoneColor, i - 1, j - 1) ===
                options['opponent'] &&
            !dangerOnKing(board, i, j, i - 1, j - 1)
        )
            val.push(board[i - 1][j - 1].id);
        //if stone could eat the oppoent in the upper left
        if (
            checkToGo(board, stoneColor, i - 1, j + 1) ===
                options['opponent'] &&
            !dangerOnKing(board, i, j, i - 1, j + 1)
        )
            val.push(board[i - 1][j + 1].id);

        //two jump of one jump for pawn
        if (
            checkToGo(board, stoneColor, i - 1, j) === options['empty'] &&
            !dangerOnKing(board, i, j, i - 1, j)
        ) {
            val.push(board[i - 1][j].id);
            if (
                Number(i) === 6 &&
                checkToGo(board, stoneColor, i - 2, j) === options['empty'] &&
                !dangerOnKing(board, i, j, i - 2, j)
            )
                val.push(board[i - 2][j].id);
        }

        return val;
    },
    //just the pawn pace's moves have constraints with color note that this constraints are just for pawn
};
