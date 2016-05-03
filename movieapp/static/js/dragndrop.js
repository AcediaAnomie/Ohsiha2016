// http://www.w3schools.com/html/html5_draganddrop.asp

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var movieElement = document.getElementById(data);
    ev.target.appendChild(movieElement);

    var movieId = $(movieElement).attr("data-id");
    var isWatched = false;

    if(ev.target.id == "watch-list") {
    	isWatched = false;
    } else if(ev.target.id == "have-watched-list") {
    	isWatched = true;
    } else {
    	// Should not go here
    	console.log("Something went wrong");
    	return;
    }
    
    var data = {
		"id": movieId,
		"isWatched": isWatched,
		csrfmiddlewaretoken: Cookies.get('csrftoken')
	}

	$.ajax({
        url: '/movies/updateWatchStatus',
        data: data,
        method: 'POST'
    }).done(function(response) {
    	console.log("Success: " + response['success']);
    });
}
