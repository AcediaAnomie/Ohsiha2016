$(document).ready(function() {
    $(".remove-button").click(function(){
        console.log("Removing movie");

        var line = $(this).closest('.accordion');
        var movieId = line.attr('data-id');
        //console.log("Movie Id: "+ movieId);
        
        // JS Cookie library
        var csrftoken = Cookies.get('csrftoken');

        var data = {
            id: movieId,
            csrfmiddlewaretoken: csrftoken
        }

        $.ajax({
            url: '/movies/removeMovie',
            data: data,
            method: 'POST'
        }).done(function(response) {
            console.log("Response: " + response['status']);

            if(response['status'] == 'OK') {
                line.remove();
            } 
            else {
                $(".error").text(response['error_msg']);
            }
        });
    });
});