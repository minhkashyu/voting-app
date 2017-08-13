$(document).ready(function() {
    $('.loading-container').css('display', 'none');

    $('.hidden-container').fadeIn(1000, function(){
        $(this).css('display', 'block');
    });

    $(document).on('click', '.navbar-collapse.in', function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });
});