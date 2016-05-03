$(document).ready(function() {
	$("#save-button").hide();

	$("#add-note").click(function(){
		console.log("Adding note");

		var textbox  = $("#note-text");
		var notetext = textbox.text();

		var editableNote = $('<textarea id="note-textarea" rows=10 cols=70></textarea>').val(notetext);

		textbox.html(editableNote);

		$(".note-buttons").hide();
		$("#save-button").show();
	});

	// The save-button is dynamic so event binding needs to be done to the parent element
	$("#save-button").on('click', '#save-note', function(){
		var notetext = $("#note-textarea").val();

		var data = {
			"id": $("input[name='id']").val(),
			"note": notetext,
			csrfmiddlewaretoken: Cookies.get('csrftoken')
		}

		$.ajax({
            url: '/movies/addNote',
            data: data,
            method: 'POST'
        }).done(function(response) {
            if(response['success']) {
            	$("#note-text").text(notetext);
            	$(".note-buttons").show();
            	$("#save-button").hide();
            } else {
            	$(".error").append(response["error-msg"]);
            }
        });
	});
});