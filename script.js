'use strict';

window.onload = function() {
    initHandlers();    
}

/**
 * Initialize needed event handlers
 */
function initHandlers() {
    $('#transcript-form').submit(handleSubmit);
}

/**
 * Send gpa information to the python program on the server
 * @param {event} e 
 */
function handleSubmit(e) {
    e.preventDefault();

    var content = $('#transcript-input').val();

    $.ajax({
        asnyc: true,
        url: "/~riherund/cgi-bin/gpacalc/flask.cgi/calculate",
        type: "POST",
        data: {
            "content": content
        },
        dataType: "json",
        success: handleResponse,
        error: ajaxError
    });
}

/**
 * Recieve the result from the server
 * @param {*} data - Data returned from the server
 * @param {*} textStatus 
 * @param {*} request 
 */
function handleResponse(data, textStatus, request) {
    $('#gpa-box').val(data["result"]);
}

// Ajaxista tulevat virheet
function ajaxError(xhr, status, error) {
	console.log("Error: " + error );
	console.log("Error: " + error );
	console.log( xhr );
}