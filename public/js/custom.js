$(document).ready(function() {
    $('.loading-container').css('display', 'none');

    $('.hidden-container').fadeIn(1000, function(){
        $(this).css('display', 'block');
    });

    $('div.alert').not('.alert-important, .alert-danger').delay(3000).slideUp(500);
});