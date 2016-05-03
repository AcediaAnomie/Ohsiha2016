$(document).ready(function() {
    $("#addButton").click(function(){
        console.log("Adding movie");
        console.log("Title: " + $("input[name='title']").val());
        
        // JS Cookie library
        var csrftoken = Cookies.get('csrftoken');

        var data = {
            title: $("input[name='title']").val(),
            note: $("#note").val(),
            csrfmiddlewaretoken: csrftoken
        }

        $.ajax({
            url: '/movies/addMovie',
            data: data,
            method: 'POST'
        }).done(function(response) {
            console.log("Response: " + response['status'] + " " + response['added']);

            if(response['added']) {
                $("#add-movie").empty();
                $("#add-movie").text("Movie added to the list");
            }
        });
    });
});