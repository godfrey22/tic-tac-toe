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
            square.css("background-image", "url(assets/images/cross.png)");
        }else{
            $('#notify').text('Player 1\'s Turn');
            square.css("background-image", "url(assets/images/circle.png)");

        }
        turn *= -1;
    });



    $('#new-btn').click(function() {
        if (confirm('Do you want to start a new game (current progress will be lost)?')){
            location.reload();
        }
    });
    $('#exit-btn').click(function() {
        if (confirm('Do you want to exit game (current progress will be lost)?')){
            window.close();
        }
    });
});