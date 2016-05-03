$(document).ready(function() {
    $("#addButton").click(function(){        
        // JS Cookie library
        var csrftoken = Cookies.get('csrftoken');

        var data = {
            movie: $("input[name='movie']").val(),
            csrfmiddlewaretoken: csrftoken
        }

        $.ajax({
            url: '/movies/addMovie',
            data: data,
            method: 'POST'
        }).done(function(response) {
            console.log("Response: " + response['success']);

            if(response['success']) {
                $("#add-movie").empty();
                $("#add-movie").text("Movie added to the list");
            } else {
                var errormsg = response['error-msg'];
                $('#add-movie > .error').text(errormsg);
            }
        });
    });
});