/**
 * Created by godfr on 2016/10/10.
 */
$( document ).ready(function() {
    var turn = 1;
    $('.square').on('click', function(e) {
        e.preventDefault();
        var square = $(this);
        var col = square.attr('col');
        var row = square.attr('row');
        if (turn == 1){
            $('#notify').text('Player 2\'s Turn');
        }else{
            $('#notify').text('Player 1\'s Turn');
        }
        turn *= -1;
    });
});