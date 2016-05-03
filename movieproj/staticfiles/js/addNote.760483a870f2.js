$(document).ready(function() {
	$("#add-note").click(function(){
		var textbox  = $("#note-text");
		var notetext = textbox.text();

		console.log("Existing text: " + notetext);

		var editableNote = $('<textarea id="note-textarea" rows=10 cols=70></textarea>').val(notetext);

		textbox.replaceWith(editableNote);

		$(".note-buttons").empty();
		$(".note-buttons").append("<button type='button' class='btn btn-default' id='save-note'>Save note</button>");
	});

	// The save-button is dynamic so event binding needs to be done to the parent element
	$(".note-buttons").on('click', '#save-note', function(){
		var data = {
			"id": $("input[name='id']").val(),
			"note": $("#note-textarea").val(),
			csrfmiddlewaretoken: Cookies.get('csrftoken')
		}

		 $.ajax({
            url: '/movies/addNote',
            data: data,
            method: 'POST'
        }).done(function(response) {
            if(response['status']) {
            	// TODO: Change textbox back to uneditable
            } else {
            	$(".error-placeholder").append(response["error-msg"]);
            }
        });
	});
});