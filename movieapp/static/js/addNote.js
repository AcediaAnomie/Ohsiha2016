$(document).ready(function() {
	$(".save-button").hide();

	$(".add-note").click(function(){
		var parentCol = $(this).closest('.col-md-8');
		var textbox = parentCol.find('.note-text');
		var notetext = textbox.text();

		var editableNote = $('<textarea id="note-textarea" rows=10 cols=70></textarea>').val(notetext);

		textbox.html(editableNote);

		parentCol.find(".note-buttons").hide();
		textbox.siblings(".save-button").show();
	});

	// The save-button is dynamic so event binding needs to be done to the parent element
	$(".save-button").on('click', '#save-note', function(){
		var parentCol = $(this).closest('.col-md-8');
		var notetext = parentCol.find("#note-textarea").val();

		var line = $(this).closest('.accordion');
        var movieId = line.attr('data-id');
		//console.log("Movie id: " + movieId);

		var data = {
			"id": movieId,
			"note": notetext,
			csrfmiddlewaretoken: Cookies.get('csrftoken')
		}

		$.ajax({
            url: '/movies/addNote',
            data: data,
            method: 'POST'
        }).done(function(response) {
        	
            if(response['success']) {
            	parentCol.find(".note-text").text(notetext);
            	parentCol.find(".note-buttons").show();
            	parentCol.find(".save-button").hide();
            } else {
            	parentCol.find(".error").append(response["error-msg"]);
            }
        });
	});
});