//utitliy function to do the logic of moving a stone from one place to another
// stone jump from src to dest
export default function moveStone(board, src_i, src_j, dest_i, dest_j) {
    //delete stone from src
    const { stone, ...withOutStone } = board[src_i][src_j];
    board[src_i][src_j] = withOutStone;
    board[dest_i][dest_j] = { ...board[dest_i][dest_j], stone };
}
