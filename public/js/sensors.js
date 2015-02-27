/**
 * Created by Julien on 27/02/2015.
 */
var socket = io();
socket.on('dataSending', function (sensorsData) {
    $('.sensors .fa-spinner').hide(); // hide spinners

    // Update sensors value
    $('.sensors-temperature em').text("Temperature : " + sensorsData.t + "°C");
    $('.sensors-luminance em').text("Luminance : " + sensorsData.lumi);
    $('.sensors-humidity em').text("Humidity : " + sensorsData.h + "%");

    clearAlert();
});

// <abbr data-livestamp=\"" + date / 1000 + "\"></abbr>

jQuery(document).ready(function () {
    delayedAlert();
});

// Timer on connection status
var timeoutID;
var lastConnTime = Date.now();

function delayedAlert() {
    timeoutID = window.setTimeout(connectionError, 4000);
}

function clearAlert() {
    window.clearTimeout(timeoutID);
    lastConnTime = Date.now();
    connectionSuccess();
    delayedAlert();
}

function connectionError() {
    $('.sensors-connection-status').removeClass('panel-success');
    $('.sensors-connection-status').removeClass('panel-green');
    $('.sensors-connection-status').addClass('panel-red');
    $('.sensors-connection-status .panel-heading').html("Connection has been lost for <abbr class=\"timer-on\"></abbr>");
    counter(lastConnTime);
}

function connectionSuccess() {
    $('.sensors-connection-status').removeClass('panel-success');
    $('.sensors-connection-status').removeClass('panel-red');
    $('.sensors-connection-status').addClass('panel-green');
    $('.sensors-connection-status .panel-heading').html("Connection established");
}

function counter(timestamp) {
    var calcNewYear = setInterval(function () {
        date_past = new Date(timestamp);
        date_now = new Date();

        seconds = Math.floor((date_now - date_past) / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        var result = seconds + " second ";
        if(seconds > 1)
            result = seconds + " seconds ";

        if (minutes == 1)
            result = minutes + " minute " + result;
        else if(minutes > 1)
            result = minutes + " minutes " + result;

        if (hours == 1)
            result = minutes + " hour " + result;
        else if(hours > 1)
            result = minutes + " hours " + result;

        $(".timer-on").text(result);
    }, 100);
}