/**
 * Created by godfr on 2016/10/10.
 */
$( document ).ready(function() {
    var turn = 1;
    var board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    var count = 0;

    var handler = function(){
        var square = $(this);
        var col = square.attr('col')-1;
        var row = square.attr('row')-1;
        if (board[row][col] == 0){
            if (turn == 1){
                square.css("background-image", "url(assets/images/cross.png)");
                $('#notify').text('Player 2\'s Turn');

            }else{
                square.css("background-image", "url(assets/images/circle.png)");
                $('#notify').text('Player 1\'s Turn');
            }
            board[row][col] = turn;
            turn *= -1;
            count++;

            var status = checkWin(row, col, board, count);
            if(status==1){
                $('#notify').text('Player 1 Win the game.');
                $('.square').unbind('click', handler);

            }else if(status==-1){
                $('#notify').text('Player 2 Win the game.');
                $('.square').unbind('click', handler);
            }else if(status==2){
                $('#notify').text('It\'s a draw game');
                $('.square').unbind('click', handler);
            }
        }
    };

    $('.square').bind('click', handler);

    $('#new-btn').click(function() {
        if (confirm('Do you want to start a new game (current progress will be lost)?')){
            location.reload();
        }
    });

    $('#load-btn').click(function() {
        if (confirm('Do you want to load game (current progress will be lost)? ')){
            $('.square').bind('click', handler);
            board = loadGame()[0];
            turn = loadGame()[1];
            $('#notify').text('Game Loaded!');
        }
    });

    $('#save-btn').click(function() {
        if (confirm('Do you want to save current game?')){
            saveGame(board);
            $('#notify').text('Game Saved!');
        }
    });
    $('#exit-btn').click(function() {
        if (confirm('Do you want to exit game (current progress will be lost)?')){
            window.close();
        }
    });
});

function checkWin(row, col, board, count){
    rowCheck = board[row][0] + board[row][1] + board[row][2];
    colCheck = board[0][col] + board[1][col] + board[2][col];
    diaCheck1 = board[0][0] + board[1][1] + board[2][2];
    diaCheck2 = board[0][2] + board[1][1] + board[2][0];
    if(rowCheck==3 || colCheck== 3 || diaCheck1== 3 ||  diaCheck2== 3){
        return 1;
    }else if(rowCheck==-3 || colCheck==-3 || diaCheck1== -3 ||  diaCheck2== -3){
        return -1;
    }
    if (count==9){return 2;}
    return 0;
}

function saveGame(board) {
    localStorage.setItem("game", JSON.stringify(board));
}

function loadGame() {
    var board = JSON.parse(localStorage.getItem("game"));
    var turn = 1;
    for (i = 0; i < 3; i++) {
       for (j = 0; j < 3; j++){
           var row = i+1; var col = j+1;
           var piece=$("div[row="+row+"][col="+col+"]");
           if (board[i][j]==1){
               piece.css("background-image", "url(assets/images/cross.png)");
                turn *= -1;
           }else if(board[i][j]==-1){
               piece.css("background-image", "url(assets/images/circle.png)");
               turn *= -1;
           }else{
               piece.css("background-image", "none");
           }
       }
    }
    return [board,turn];
}