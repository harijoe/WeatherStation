/**
 * Created by Julien on 25/02/2015.
 */
var socket = io();
var pseudo = "";

// ====== Initialization ======

$(document).ready(function() {
    populateTable();
});

// Fill table with data
function populateTable() {
    $.getJSON( '/chat/get-messages', function( data ) {
        $.each(data, function(id, d){
            newMessage('right', d.pseudo, d.message, d.date)
        });
    });
};

// ====== Events ======

// Button clicked event
$('#btn-chat').click(function () {
    socket.emit('chat message', $('#btn-input').val());
    $('#btn-input').val('');
    return false;
});

// New message incoming event
socket.on('append message', function (data) {
    // Decide if incoming message is current user message
    if (pseudo == data.pseudo)
        rightOrLeft = "left";
    else
        rightOrLeft = "right";
    newMessage(rightOrLeft, data.pseudo, data.message);
});

// Pseudo accepted event
socket.on('pseudo accepted', function (data) {
    $('#btn-input').attr('placeholder', 'Type your message here...');
    $('#chat-pseudo-wrapper span').text(data.pseudo);
    $('#chat-pseudo-wrapper').fadeIn("slow");
    pseudo = data.pseudo;
});


// ====== Functions ======
// Press enter key
function enterPressAlert(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        $('#btn-chat').click();
    }
}

function newMessage(rol, pseudo, msg, date) {
    date = (typeof date === "undefined") ? Date.now() : new Date(date).getTime();
    var htmlBlock = "";
    htmlBlock += "<li class=\"" + rol + " clearfix\">";
    htmlBlock += "<div class=\"chat-body clearfix\">";
    htmlBlock += "<div class=\"header\">";
    htmlBlock += "<strong class=\"primary-font\">" + pseudo + "<\/strong>";
    htmlBlock += "<small class=\"pull-right text-muted\">";
    htmlBlock += "<i class=\"fa fa-clock-o fa-fw\"><\/i> <abbr data-livestamp=\"" + date / 1000 + "\"></abbr>";
    htmlBlock += "<\/small>";
    htmlBlock += "<\/div>";
    htmlBlock += "<p>";
    htmlBlock += msg;
    htmlBlock += "<\/p>";
    htmlBlock += "<\/div>";
    htmlBlock += "<\/li>";
    $("#chat-list").append(htmlBlock);
}

