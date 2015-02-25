/**
 * Created by Julien on 25/02/2015.
 */
var socket = io();
var pseudo = "";

$('#btn-chat').click(function(){
    socket.emit('chat message', $('#btn-input').val());
    $('#btn-input').val('');
    return false;
});

// Press enter key
function enterPressAlert(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) {
        $('#btn-chat').click();
    }
}

socket.on('append message', function (data) {
    // Decide if incoming message is current user message
    if(pseudo == data.pseudo)
        rightOrLeft = "left";
    else
        rightOrLeft = "right";

    var htmlBlock="";
    htmlBlock += "<li class=\""+ rightOrLeft +" clearfix\">";
    htmlBlock += "<div class=\"chat-body clearfix\">";
    htmlBlock += "<div class=\"header\">";
    htmlBlock += "<strong class=\"primary-font\">"+data.pseudo+"<\/strong>";
    htmlBlock += "<small class=\"pull-right text-muted\">";
    htmlBlock += "<i class=\"fa fa-clock-o fa-fw\"><\/i> <abbr data-livestamp=\""+Date.now()/1000+"\"></abbr>";
    htmlBlock += "<\/small>";
    htmlBlock += "<\/div>";
    htmlBlock += "<p>";
    htmlBlock += data.message;
    htmlBlock += "<\/p>";
    htmlBlock += "<\/div>";
    htmlBlock += "<\/li>";


    $("#chat-list").append(
        htmlBlock
    );
});

socket.on('pseudo accepted', function (data) {
    $('#btn-input').attr('placeholder', 'Type your message here...');
    $('#chat-pseudo-wrapper span').text(data.pseudo);
    $('#chat-pseudo-wrapper').show("slow" );
    pseudo = data.pseudo;
});