$(function () {

    $.getJSON('/sensors/get-sensors-data', function (d) {
        //data = JSON.parse('{"d":"' + d +'"}'); // Need to reformat to respect JSON format
        /*        $.each(data, function(id, d) {
         newMessage('right', d.pseudo, d.message, d.date)
         }

         console.log(d);
         data = JSON.parse('{"d":"' + d +'"}');
         console.log(data.d.length);
         data.r = data.d.oneOutOf(10);
         console.log(data.r.length);
         console.log(data.d.length);
         */
        /**/
        Morris.Area({
            element: 'morris-area-chart',
            data: d,
            xkey: 'date',
            ykeys: ['t', 'h', 'lumi'],
            labels: ['t', 'h', 'lumi'],
            pointSize: 2,
            hideHover: 'auto',
            resize: true
        });
    });
});
